import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 컴포넌트
import Layout from './layouts/Layout.js';
import Board from './pages/party/Board.js';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='party'>
                        <Route path='board' element={<Board />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
