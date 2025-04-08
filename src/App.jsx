import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", isDone: false },
    { id: 1, content: "코딩 공부하기", isDone: true },
    { id: 2, content: "잠 자기", isDone: false },
  ]);

  return (
    <main>
      <h1>Todo List</h1>
      <hr />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </main>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue, isDone: false };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [isModify, setIsModify] = useState(false);

  return (
    <li>
      {!isModify && (
        <span
          onClick={() =>
            setTodoList((prevTodos) =>
              prevTodos.map((data) => {
                if (todo.id === data.id) {
                  return { ...todo, isDone: !data.isDone };
                }
                return data;
              })
            )
          }
          className={todo.isDone ? "done" : undefined}
        >
          {todo.content}
        </span>
      )}
      {isModify && (
        <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
      )}

      <div className="buttons">
        <button
          onClick={() => {
            if (isModify) {
              setTodoList((prev) =>
                prev.map((el) => (el.id === todo.id ? { ...el, content: inputValue } : el))
              );
              setIsModify(false);
            } else {
              setIsModify(true);
            }
          }}
        >
          {isModify ? "완료" : "수정"}
        </button>
        <button
          onClick={() => {
            setTodoList((prev) => {
              return prev.filter((el) => el.id !== todo.id);
            });
          }}
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default App;
