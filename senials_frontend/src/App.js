import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// 컴포넌트
import Layout from './layouts/Layout.js';
import MainPage from './pages/mainpage/MainPage.js';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<MainPage />} />
                    {/* <Route path='party'>
                        <Route path='party-number' element={<PartyDetail />} />
                    </Route> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
