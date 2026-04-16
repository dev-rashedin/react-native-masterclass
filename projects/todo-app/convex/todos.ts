import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

// get all tasks
export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query('todos').order('desc').collect();
    return todos;
  },
});

// create a todo
export const createTodo = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert('todos', {
      text: args.text,
      isCompleted: false,
    });

    return todoId;
  },
});

// toggling todo
export const toggleTodo = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get('todos', args.id);
    if (!todo) {
      throw new ConvexError('Todo not found');
    }
    await ctx.db.patch(args.id, { isCompleted: !todo.isCompleted });
  },
});

// update todo
export const updateTodo = mutation({
  args: {
    id: v.id('todos'),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      text: args.text,
    });
  },
});

// deleting todo
export const deleteTodo = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// clearing all todos

export const clearAllTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query('todos').collect();

    // Deleting all todos
    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }
    return { deleteCount: todos.length };
  },
});
