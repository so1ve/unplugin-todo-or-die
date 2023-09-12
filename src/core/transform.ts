import type { ParseResult } from "@babel/parser";
import traverse from "@babel/traverse";
import type { Comment, CommentLine, File } from "@babel/types";
import type MagicString from "magic-string";

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

export function transform(parsed: ParseResult<File>, s: MagicString) {
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
