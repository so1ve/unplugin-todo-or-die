import type { ParserOptions } from "@babel/parser";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import type { Comment, CommentLine } from "@babel/types";
import MagicString from "magic-string";

const filterComments = (comment: Comment): comment is CommentLine =>
	comment.type === "CommentLine";

const todoReg =
	// eslint-disable-next-line regexp/no-super-linear-backtracking
	/TODO\((\d{4}-\d{2}-\d{2})\):\s*(.*)|TODO:\s*(.*)\s*,\s*expires:\s*(\d{4}-\d{2}-\d{2})/;

interface Todo {
	expires: number;
	content: string;
	comment: CommentLine;
}

function parseComment(comment: CommentLine): Todo | undefined {
	const match = comment.value.match(todoReg);
	if (!match) {
		return;
	}
	let [, date, content] = match;
	if (!date && !content) {
		[, , , content, date] = match;
	}
	if (match && date) {
		const expires = new Date(date).getTime();

		return {
			expires,
			content,
			comment,
		};
	}
}

const generateDieCode = (todo: Todo) =>
	`if (Date.now() > ${todo.expires}) throw new Error("TODO expired: ${todo.content}");`;

const getParseOptions = (isJsx: boolean): ParserOptions => ({
	sourceType: "module",
	allowImportExportEverywhere: true,
	allowReturnOutsideFunction: true,
	allowNewTargetOutsideFunction: true,
	allowSuperOutsideMethod: true,
	allowUndeclaredExports: true,
	errorRecovery: true,
	plugins: [
		"doExpressions",
		"exportDefaultFrom",
		"functionBind",
		"functionSent",
		"throwExpressions",
		"partialApplication",
		"decorators",
		"decimal",
		"moduleBlocks",
		"asyncDoExpressions",
		"regexpUnicodeSets",
		"destructuringPrivate",
		"decoratorAutoAccessors",
		"importReflection",
		"explicitResourceManagement",
		"decoratorAutoAccessors",
		"typescript",
		...(isJsx ? ["jsx" as const] : []),
		["importAttributes", { deprecatedAssertSyntax: true }],
	],
});

export function transform(code: string, id: string) {
	const s = new MagicString(code);
	const parsed = parse(code, getParseOptions(/(?:js|x)$/.test(id)));
	const comments: CommentLine[] = [];

	traverse(parsed, {
		enter({ node }) {
			comments.push(
				...[
					...(node.leadingComments ?? []),
					...(node.innerComments ?? []),
					...(node.trailingComments ?? []),
				].filter(filterComments),
			);
		},
	});

	const todos = comments.map(parseComment).filter(Boolean) as Todo[];

	for (const todo of todos) {
		s.overwrite(todo.comment.start!, todo.comment.end!, generateDieCode(todo));
	}

	return {
		code: s.toString(),
		map: s.generateMap({ hires: true }),
	};
}
