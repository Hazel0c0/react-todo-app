import React from 'react'
import TodoItem from "./TodoItem";

import './scss/TodoMain.scss';

const TodoMain = ({todoList, remove, check}) => {
  // console.log(bbb.todoList);

  return (
    <ul className={'todo-list'}>
      {

        // const todoItems =[];
        // for (const todo of todoList) {
        //   todoItems.push(<TodoItem />);
        // }
        //
        //   todoList.map(todo => <TodoItem />

        // renderTodoItem()
        todoList.map(todo => <TodoItem
                                key={todo.id}
                                item={todo}
                                remove={remove}
                                check={check}
                              />)
      }
    </ul>
  )
}

export default TodoMain