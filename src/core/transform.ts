import MagicString from "magic-string";

const todoReg =
	// eslint-disable-next-line regexp/no-unused-capturing-group
	/^\s*\/\/\s*TODO::expires?\((\d{4}-\d{2}-\d{2})\):\s*(.*)$/gm;

interface Todo {
	expires: number;
	content: string;
	start: number;
	end: number;
}

function parseComment(match: RegExpMatchArray): Todo | undefined {
	const [comment, date, content] = match;
	if (date) {
		const offset = comment.indexOf("//");
		const expires = new Date(date).getTime();

		return {
			expires,
			content,
			start: match.index! + offset,
			end: match.index! + comment.length,
		};
	}
}

const generateDieCode = (todo: Todo) =>
	`if (Date.now() > ${todo.expires}) throw new Error("TODO expired: ${todo.content}");`;

export function transform(code: string) {
	const s = new MagicString(code);
	const matches = [...code.matchAll(todoReg)];
	const todos = matches.map(parseComment).filter(Boolean) as Todo[];

	for (const todo of todos) {
		s.overwrite(todo.start, todo.end, generateDieCode(todo));
	}

	return {
		code: s.toString(),
		map: s.generateMap({ hires: true }),
	};
}
