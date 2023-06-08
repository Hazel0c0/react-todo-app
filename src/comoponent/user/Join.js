import React, {useEffect, useState} from 'react'
import {
  Button, Container, Grid,
  TextField, Typography, Link
} from "@mui/material"

export const Join = (effect, deps) => {

  //상태 변수로 회원가입 입력값 관리
  const [userValue, setUserValue] = useState({
    // 상태변수는 불변성을 유지 해야함.
    // 객체를 통째로 갈아 껴야한다. 일부만 수정 못함
    // set 통해서
    userName: '',
    password: '',
    email: ''
  });

  // 검증 메세지에 대한 상태변수 과닐
  const [message, setMessage] = useState({
    userName: '',
    password: '',
    passwordCheck:'',
    email: ''
  });

  // 이름 입력창 체인지 이벤트 핸들러
  const nameHandler = e => {
    // 입력한 값을 상태변수에 저장 할거
    // console.log(e.target.value); -> 이 값을 userName에 저장하면 됨
    const inputVal = e.target.value;

    //정규표현식
    const nameRegex = /^[가-힣]{2,5}$/;

    //입력값 검증
    let msg; // 검증 메세지를 저장할 변수
    if (!inputVal) { // ''빈문자열은 false
      msg='유저 이름은 필수입니다.';
    } else if (!nameRegex.test(inputVal)) { // 정규표현식 대로 안쓰면
      msg='2~5글자 사이의 한글로 작성하세요!'
    } else {
      msg='사용가능한 이름입니다.'
    }

    setMessage({
      ...message,
      userName: msg
    });


    setUserValue({
      ... userValue, //기존의 값들은 복사해오고
      userName: inputVal
    })
  }

  // 이메일 입력창 체인지 이벤트 핸들러
  const emailHandler = e => {

    const inputVal = e.target.value;

    setUserValue({
      ... userValue,
      email: inputVal
    })
  }
  // 패스워드 입력창 체인지 이벤트 핸들러
  const passwordHandler = e => {

    const inputVal = e.target.value;

    setUserValue({
      ... userValue,
      password: inputVal
    })
  }

  const joinButtonClickHandler = e => {

    e.preventDefault();

    // const $nameInput = document.getElementById('username');
    // console.log($nameInput.value);
    console.log(userValue)
  }


  //렌더링이 끝난 이후 실행되는 함수
  useEffect(() => {

  }, []);

  return (
    <Container component="main" maxWidth="xs" style={{margin: "300px auto"}}>
      <form noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              계정 생성
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="유저 이름"
              autoFocus
              onChange={nameHandler}
            />
            {/*
            그냥 {msg}하면 안됨
            랜더링 할 때 쓰려면 상태변수로 써야함
            */}
            <span>{message.userName}</span>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="이메일 주소"
              name="email"
              autoComplete="email"
              onChange={emailHandler}
            />
            <span></span>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="패스워드"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordHandler}
            />
            <span></span>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password-check"
              label="패스워드 확인"
              type="password"
              id="password-check"
              autoComplete="check-password"

            />
            <span id="check-text"></span>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                background: '#38d9a9'
              }}
              onClick={joinButtonClickHandler}
            >
              계정 생성
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              이미 계정이 있습니까? 로그인 하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
export default Join;