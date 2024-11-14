import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuggestHobbyPost from './pages/suggest-hobby/suggest-hobby-post';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/*맞춤형 취미 추천 결과 페이지*/}
      <Route path="/SuggestHobbyPost" element={<SuggestHobbyPost/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
