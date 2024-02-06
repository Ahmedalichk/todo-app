"use client";
import React, { useState } from "react";

export default function Todo() {
  const [inputValue, setinputValue] = useState("");
  const [todo, setTodo] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const handleChange = (e) => {
    setinputValue(e.target.value);
  };
  console.log("todo text", todo);
  const handleAddTodos = () => {
    if (inputValue !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodo([...todo, newTodo]);
      setinputValue("");
    }
  };
  const handleToggleChange = (id) => {
    console.log(id);
    const updatedTodos = todo.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodo(updatedTodos);
    console.log(updatedTodos);
  };

  const handleRemoveTodo = (id) => {
    const filteredTodo = todo.filter((todo) => todo.id !== id);
    setTodo(filteredTodo);
  };
  const handleEditTodo = async (id, text) => {
    // save the edited text
    if (editing === id && editingText) {
      const todoRef = doc(db, "todo", id);
      await updateDoc(todoRef, { text: editingText });
      setEditing(null);
      setEditingText("");
    } else {
      // enabling the editing mode
      setEditing(id);
      setEditingText(text);
    }
  };
  return (
    <div className="flex items-center justify-center pt-32">
      <div className="todo-container  text-center bg-[#f8f8f8] py-12 px-20 rounded-md shadow-xl">
        <h1 className="font-bold font-serif text-4xl">Todo List</h1>
        <div className="flex mt-10">
          <input
            className="todo-inout  rounded-sm p-1 font-medium w-[1000px] mb-4"
            type="text"
            onChange={(e) => handleChange(e)}
            value={inputValue}
            placeholder="Enter a todo"
          />
          <button
            className="add-btn px-2 w-[100px] h-[30px]   rounded-sm font-medium bg-green-500 text-white cursor-pointer"
            onClick={handleAddTodos}
          >
            Add
          </button>
        </div>
        <ul className="todo-list p-0">
          {todo.map((todo) => (
            <li
              className={`todo-item flex items-center justify-between mb-2  ${
                todo.completed == true ? "Completed" : ""
              }`}
            >
              <div>
                <input
                  className="todo-checkbox mx-2  "
                  checked={todo.completed === true}
                  type="checkbox"
                  onChange={() => handleToggleChange(todo.id)}
                />
                <span
                  className={`todo-text text-lg ${
                    todo.completed == true ? "line-through && text-[#888]" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              {/* {editing === todo.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => {
                    setEditingText(e.target.value);
                  }}
                />
              ) : (
                <span className="todo-text">{todo.text}</span>
              )} */}

              {/* <button
                className={`bg-${editing === todo.id ? "green" : "blue"}-500 `}
              >
                onClick={() => handleEditTodo(todo.id, todo.text)}
                {editing === todo.id ? "Save" : "Edit"}
              </button>  */}
              <button
                className=" rounded lg px-2 mx-12 text-white bg-red-500  cursor-pointer"
                onClick={() => handleRemoveTodo(todo.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
