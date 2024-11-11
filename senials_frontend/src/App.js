import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HobbyBoardPost from './pages/hobby/hobby-board-post';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/*취미 게시판 전체 보기*/}
      <Route path="/HobbyBoardPost" element={<HobbyBoardPost/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;