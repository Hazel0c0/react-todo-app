# 리액트 프로젝트 시작하기

1. nodejs 설치
2. create-react-app 설치 (최초1번)
```
$ npm install -g create-react-app
```

3. react프로젝트 생성
```
$ npx create-react-app 프로젝트이름
```

4. react 프로젝트 실행
```
$ cd 프로젝트폴더
$ npm start
```
- http://localhost:3000 에서 프론트엔드 서버 실행


## git clone시 주의사항
- `$ npm install` 명령을 터미널에서 실행하여 라이브러리 설치


5. 추가 라이브러리
```
$ npm install react-icons // 아이콘
$ npm install classnames // 클래스 add/remove 편리한거
$ npm install reactstrap bootstrap 
$ npm install sass // scss 문법 사용 (위한 템플렛)
$ npm install @mui/material @emotion/react @emotion/styled
$ npm install @mui/icons-material
$ npm install react-router-dom

$ npm install react-icons classnames reactstrap bootstrap sass @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom
```

## 리액트 라우터 설정
- index.js에 BrowserRouter 컴포넌트로 App감싸기
```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

## sass
1. reset css
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css">
```

2. 변수 사용
```
$back-color : #11111;
```

