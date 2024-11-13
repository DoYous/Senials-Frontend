import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// 컴포넌트
import Layout from './layouts/Layout.js';
import BoardWrite from './pages/party/BoardWrite.js';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='party'>
                        <Route path='write' element={<BoardWrite />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
