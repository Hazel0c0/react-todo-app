import React, {useState} from 'react'
import {MdAdd} from "react-icons/md";
import cn from 'classnames';
// ^ cn 이름은 내가 정할 수 있음
import './scss/TodoInput.scss'

const TodoInput = ({addTodo}) => {

  // 1. 클릭 이벤트를 통해 상태값 변경

  //입력창이 열리는 여부를 표현하는 상태값
  const [open, setOpen] = useState(false);

  // 할일 입력창에 입력한 내용을 표현하는 상태값
  const [todoText, setTodoText] = useState('');
  // + 버튼 클릭시 이벤트 처리
  const onToggle = () => {
    setOpen(!open);
    // ^ 상태값 변경 함수를 사용해서 true , false
  };

  const showForm = () => {
    if (open) {
      // open이 ture 일 때만 아래 리턴문이 리턴 되도록
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
    // 서브밋 기능을 활용 하지만 실제로 보내지면 안됨
    // 화면 전환 일어나면 안됨
    e.preventDefault(); // 태그의 기본기능 제한
    console.log('폼이 제출됨');

    /*
    const $input = document.querySelector('.insert-form input')
    console.log($input.value);
    $input.value='';
     */
    // console.log(todoText); 서브밋 할 때 todoText 값 사용
    addTodo(todoText);

    // 입력이 끝나면 입력창 비우기
    setTodoText(''); // 바로 반영 안됨
  };


  // input change 이벤트 핸들러 함수
  const todoChangeHandler = e => {
    // console.log(e.target.value);
    // e.target : input
    setTodoText(e.target.value); // 입력값 저장
  }


  return (
    <>
      {
        /* 
          showForm 함수의 if(open) 문 대신 
          open && 으로도 가능
        */
        open && (
          <div className={'form-wrapper'}>
            <form className='insert-form' onSubmit={submitHandler}>
              <input
                type={'text'}
                placeholder={'할 일을 입력 후, 엔터를 누르세여!!'}
                onChange={todoChangeHandler}
                autoFocus // 자동 커서
                value={todoText}
                  // value 값으로 todoText를 반영해주어야
                  // 입력 후 '빈문자열'로 렌더링 됨
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
        {/* 상태변수 이름과 클래스 이름이 다를 경우
        abc: open 이렇게 
        open이 true일 경우 abc 클래스가 붙음 */}
        <MdAdd/>
      </button>
    </>
  )
}

export default TodoInput