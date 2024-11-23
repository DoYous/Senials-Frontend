import { BrowserRouter, Routes, Route } from "react-router-dom";
import HobbyReviewGet from './pages/hobby/HobbyReviewGet';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/*취미 게시판 후기 작성*/}
      <Route path="/HobbyReviewGet" element={<HobbyReviewGet/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
