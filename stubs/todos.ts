/* stubs */

// @ts-ignore
import { v4 } from "https://deno.land/std/uuid/mod.ts";
// interface 
// @ts-ignore 
import Todo from '../interfaces/Todo.ts';

let todos: Todo[] = [
	{
		id: v4.generate(),
		todo: 'walk dog',
		isCompleted: true,
	},
	{
		id: v4.generate(),
		todo: 'eat food',
		isCompleted: false,
	},
];


export default todos;