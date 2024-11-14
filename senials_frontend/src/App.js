import { BrowserRouter, Routes, Route } from "react-router-dom";
import HobbyDetailPost from './pages/hobby/hobby-detail-post';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/*취미 게시판 상세 보기*/}
      <Route path="/HobbyDetailPost" element={<HobbyDetailPost/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;