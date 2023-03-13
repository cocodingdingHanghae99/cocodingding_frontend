import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      return produce(state, (draftState) => {
        draftState.push(action.payload);
      });
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    resetTodos: () => {
      return [];
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, editTodo, resetTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
