import React from 'react'
import {MdDelete, MdDoneOutline} from "react-icons/md";
import cn from 'classnames';

import './scss/TodoItem.scss';

const TodoItem = ({item, remove, check}) => {

  const {id, title, done} = item;
  return (
    <li className={'todo-list-item'}>
      <div
        className={cn('check-circle', {active: done})}
        {/* done이 true면 active를 붙여라*/}
        onClick={() => check(id)}>
        {done && <MdDoneOutline />}
      </div>
      <span className={cn('text', {finish: done})}>{title}</span>
      <div className={'remove'} onClick={() => remove(id)}>
        <MdDelete/>
      </div>
    </li>
  )
}

export default TodoItem