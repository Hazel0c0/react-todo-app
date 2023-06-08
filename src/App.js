import logo from './logo.svg';
import './App.css';
import TodoTemplate from "./comoponent/todo/TodoTemplate";
import {Header} from "./comoponent/layout/Header";
import Footer from "./comoponent/layout/Footer";
import Join from "./comoponent/user/Join";
import Login from "./comoponent/user/Login";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
      <Header/>

      {/*<TodoTemplate/>*/}
      {/*<Join />*/}
      {/*<Login />*/}

      {/* Route 하나당 if문 하나
        <switch -이건 옛날꺼 */}
      <Routes>
        {/*실제 페이지 전환 되는건 아님*/}
        <Route path={'/'} element={<TodoTemplate/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/join'} element={<Join/>}/>
      </Routes>

      <Footer/>
    </>
  );
}

export default App;
