import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// 컴포넌트
import Layout from './layouts/Layout.js';
import WholeSearch from './pages/search/WholeSearch.js';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='search-whole' element={<WholeSearch />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
