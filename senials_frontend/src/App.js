import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuggestHobbyGet from './pages/suggest-hobby/suggest-hobby-get';

function App() {
  return (
    <BrowserRouter>
    <Routes>/* */
      <Route path="/SuggestHobbyGet" element={<SuggestHobbyGet/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
