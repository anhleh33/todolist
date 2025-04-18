import { useState, useEffect } from "react";
import TodoInput from "./component/TodiInput";
import TodoList from "./component/TodoList";

function App() {

  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function persisitData(newList){
    localStorage.setItem('todos', JSON.stringify({todo : newList}))
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persisitData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persisitData(newTodoList)

    setTodos(newTodoList)
  }

  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(() => {
    if(!localStorage){
      return
    }

    let localTodos = localStorage.getItem('todos')
    if(!localTodos){
      return
    }

    localTodo = JSON.parse(localTodos).todos
    setTodoValue(localTodos)
  }, [])

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <TodoList todos={todos} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo}/>
    </>
  );
}

export default App;
