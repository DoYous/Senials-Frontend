import { BrowserRouter, Routes, Route } from "react-router-dom";
import HobbyReviewGet from './pages/hobby/HobbyReviewGet';
import HobbyReviewModify from './pages/hobby/HobbyReviewModify';




function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/*취미 게시판 후기 작성*/}
      <Route path="/HobbyReviewGet" element={<HobbyReviewGet/>}/>
      {/*취미 게시판 후기 수정 */}
      <Route path="/HobbyReviewModify" element={<HobbyReviewModify/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
