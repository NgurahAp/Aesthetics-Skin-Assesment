"use client";
import React, { useState } from "react";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: "Hello", completed: true },
    { id: 2, text: "This", completed: false },
    { id: 3, text: "Good", completed: false },
  ]);
  const [inputValue, setInputValue] = useState("Hello");

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteSelected = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="min-h-screen bg-[#E6E6E6] relative">
      {/* Background image */}
      <div
        className="absolute top-0 left-0 right-0 bg-cover bg-center bg-no-repeat"
        style={{
          height: "55vh",
          backgroundImage: "url('/Shape.png')",
        }}
      ></div>
      {/* Content container */}
      <div className="relative z-10 flex justify-center min-h-screen pt-20 pb-14">
        <div className="max-w-md w-full flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[48px] font-bold text-[#2563eb] mb-2 leading-[100%]">
              To Do
            </h1>
          </div>

          {/* Todo Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg mx-4">
            {/* Add new task section */}
            <div className="mb-6">
              <p className="text-gray-500 text-sm mb-3">Add a new task</p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-gray-700"
                  placeholder="Enter task..."
                  onKeyPress={(e) => e.key === "Enter" && addTodo()}
                />
                <button
                  onClick={addTodo}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Add Todo
                </button>
              </div>
            </div>

            {/* Todo list */}
            <div className="space-y-3 mb-6">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between py-3 border-b border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        todo.completed
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {todo.completed && (
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                    <span
                      className={`text-gray-700 ${
                        todo.completed ? "line-through opacity-60" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 w-6 h-6 rounded-full border border-red-300 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Delete selected button */}
            {todos.some((todo) => todo.completed) && (
              <button
                onClick={deleteSelected}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium"
              >
                Deleted Selected
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
