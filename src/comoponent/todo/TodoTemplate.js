import React, {useEffect, useState} from 'react'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoInput from './TodoInput'
import {useNavigate} from 'react-router-dom'
import {Spinner} from 'reactstrap';

import './scss/TodoTemplate.scss';

import {API_BASE_URL as BASE, TODO, USER} from '../../config/host-config';
import {getLoginUserInfo, setLoginUserInfo} from '../../util/login-util'

const TodoTemplate = () => {

  const redirection = useNavigate();

  // 로딩 상태값 관리
  // 로그인 인증토큰 얻어오기
  const [token, setToken] = useState(getLoginUserInfo().token);
  const [loading, setLoading] = useState(true);


  // 요청 헤더 설정
  const requestHeader = {
    'content-type': 'application/json',
    'Authorization': 'Bearer ' + token
  };


  // 서버에 할일 목록(json)을 요청해서 받아와야 함
  const API_BASE_URL = BASE + TODO;
  const API_USER_URL = BASE + USER;


  // 리엑트에서는 상태변수가 아닌 경우 (지역변수..) 데이터가 유지되지 않는다
  // const todos -> 지역변수 (X)
  // todos배열을 상태관리
  const [todos, setTodos] = useState([]);

  // id값 시퀀스 생성 함수
  const makeNewId = () => {
    if (todos.length === 0) return 1; // 없을경우 - 1 리턴
    // 아래 조건은 todos에 값이 하나라도 있어야 성립
    return todos[todos.length - 1].id + 1;
  }

  // TodoInput에게 todoText를 받아오는 함수
  // 1. 하위 컴포넌트에서 가져오기 위해서 함수를 만듦
  const addTodo = todoText => {
    // 2. 매개변수로 하위컴포넌트에서 가져올것을 지정
    // 3. 이 함수를 TodoInput 에게 보내준다
    console.log('할일 정보 in TodoTemplate: ', todoText);

    const newTodo = {
      id: makeNewId,
      title: todoText,
      done: false
    };

    todos.push(newTodo);
    // 이렇게 푸쉬해도 안먹힘
    // 상태값의 변경은 꼭! set~을 이용해서
    useEffect(() => {
      console.log(todos);
    }[todos]
  );

    // 리액트의 상태변수는 무조건 setter를 통해서만
    // 상태값을 변경해야 렌더링에 적용된다.
    // 다만 상태변수가 불변성(immutable)을 가지기 때문에
    // 기존의 상태에서 변경이 불가능하고
    // 새로운 상태를 만들어서 변경해야 한다.
    /*
    immutable - 자바 배열에서 처음 배움
    처음 4개짜리 배열이 있다면 1개가 추가하는게 아니라
    5개 짜리 배열을 다시 만들어서 아예 갈아 끼우는 것
     */
    /*
    const copyTodos = todos.slice();
    copyTodos.push(newTodo);
    setTodos(copyTodos);
    */
    //  이걸 쉽게
    // setTodos(todos.concat([newTodo]));
    setTodos([... todos, newTodo]);
    // concat : 배열 2개를 연결 (복사본 생성)

    fetch(API_BASE_URL, {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify(newTodo)
    })
        .then(res => {
          if (res.status === 200) return res.json();
          else if (res.status === 401) {
            alert('일반회원은 일정 등록이 5개로 제한됩니다 ㅠㅠ');
          }
        })
        .then(json => {
          json && setTodos(json.todos);
        });
  };


  // 할 일 삭제 처리 함수
  const removeTodo = id => {
    // 이걸 todoMain 에게 내려 보냄
    console.log(`삭제대상 id: ${id}`);

    /*
    삭제할 대상을 찾으려면 for문 이용해서 찾아야함
     */
    // 불변성 떄문에 카피본을 만들어줌
    const copyTodos = [...todos];
    // 카피본에서 삭제 진행
    copyTodys.splice(idx,1);
    setTodos(copyTodos);

    // -->
    setTodos(todos.filter(todo => todo.id !== id));
    // todo.id가 id와 다른것만 필터(=남긴다)


    fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: requestHeader
    })
        .then(res => res.json())
        .then(json => {
          setTodos(json.todos);
        });
  };

  // 할 일 체크 처리 함수
  const checkTodo = (id, done) => {

    fetch(API_BASE_URL, {
      method: 'PUT',
      headers: requestHeader,
      body: JSON.stringify({
        done: !done,
        id: id
      })
    })
        .then(res => res.json())
        .then(json => setTodos(json.todos));

    // console.log(`체크한 Todo id: ${id}`);

    // const copyTodos = [...todos];
    // for (const cTodo of copyTodos) {
    //   if (cTodo.id === id) {
    //     cTodo.done = !cTodo.done;
    //   }
    // }
    // setTodos(copyTodos);

    // setTodos(todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo));

  };

  // 체크가 안된 할 일의 개수 카운트하기
  const countRestTodo = () => todos.filter(todo => !todo.done).length;


  // ajax 등급승격 함수
  const fetchPromote = async () => {

    const res = await fetch(API_USER_URL + '/promote', {
      method: 'PUT',
      headers: requestHeader
    });

    if (res.status === 403) {
      alert('이미 프리미엄 회원이거나 관리자입니다.');
    } else if (res.status === 200) {
      const json = await res.json();
      // console.log(json);
      // 토큰 데이터 갱신
      setLoginUserInfo(json);
      setToken(json.token);
    }
  };


  // 프리미엄등급 승격처리
  const promote = () => {
    // console.log('등급 승격 서버요청!!');
    fetchPromote();
  };


  useEffect(() => {

    fetch(API_BASE_URL, {
      method: 'GET',
      headers: requestHeader
    })
        .then(res => {
          if (res.status === 200) return res.json();
          else if (res.status === 403) {
            alert('로그인이 필요한 서비스입니다.');
            redirection('/login');
            return;

          } else {
            alert('서버가 불안정합니다');
          }
        })
        .then(json => {
          // console.log(json.todos);

          if (!json) return;

          setTodos(json.todos);

          // 로딩 완료 처리
          setLoading(false);
        });

  }, []);

  // 로딩이 끝난 후 보여줄 컴포넌트
  const loadEndedPage = (
      <div className='TodoTemplate'>
        <TodoHeader
            count={countRestTodo}
            promote={promote}
        />
        <TodoMain
            // 할일 적는 공간
            todoList={todos}
            remove={removeTodo}
            check={checkTodo}
        />
        <TodoInput addTodo={addTodo}/>
      </div>
  );

  // 로딩중일 때 보여줄 컴포넌트
  const loadingPage = (
      <div className='loading'>
        <Spinner color='danger'>
          loading...
        </Spinner>
      </div>
  );


  return (
      <>
        {loading ? loadingPage : loadEndedPage}
      </>
  )
}

export default TodoTemplate