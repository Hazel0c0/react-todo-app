import React, {useState} from 'react'
import {MdAdd} from "react-icons/md";
import cn from 'classnames';
import './scss/TodoInput.scss'

const TodoInput = ({addTodo}) => {

  //입력창이 열리는 여부를 표현하는 상태값
  const [open, setOpen] = useState(false);

  // 할일 입력창에 입력한 내용을 ㅍ현하는 상태값
  const [todoText, setTodoText] = useState('');

  // + 버튼 클릭시 이벤트 처리
  const onToggle = () => {
    setOpen(!open);
    // ^ 상태값 변경 함수를 사용해서 true , false
  };

  const showForm = () => {
    if (open) {
      return (
        <div className={'form-wrapper'}>
          <form className='insert-form'>
            <input
              type={'text'}
              placeholder={'할 일을 입력 후, 엔터를 누르세여!!'}
            />
          </form>
        </div>
      );
    }
  };

  // 서브밋 이벤트 핸들러
  const submitHandler = e => {
    e.preventDefault(); // 태그의 기본기능 제한
    // console.log('폼이 제출됨');

    // const $input = document.querySelector('.insert-form input')
    // console.log($input.value);
    // $input.value='';
    // console.log(todoText);
    addTodo(todoText);

    // 입력이 끝나면 입력창 비우기
    setTodoText('');
  };


  // input change 이벤트 핸들러 함수
  const todoChangeHandler = e => {
    // console.log(e.target.value);
    //e.target : input
    setTodoText(e.target.value);
  }


  return (
    <>
      {
        open && (
          <div className={'form-wrapper'}>
            <form className='insert-form' onSubmit={submitHandler}>
              <input
                type={'text'}
                placeholder={'할 일을 입력 후, 엔터를 누르세여!!'}
                onChange={todoChangeHandler}
                autoFocus
                value={todoText}
              />
            </form>
          </div>
        )
      }
      {/* cn (항상 가지고 있을 거 , 두번째는 {조건부로 추가될것 } )

      cn() : 첫번째 파라미터는 항상 유지할 클래스
          두번째 파라미터는 논리 상태값
          => 논리 상태값이 true일 경우 해당 클래스가 추가
            false 일 경우 제거
      */}
      <button className={cn('insert-btn', {open})} onClick={onToggle}>
        <MdAdd/>
      </button>
    </>
  )
}

export default TodoInput