import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 컴포넌트
import Layout from './layouts/Layout.js';
import PartyDetail from './pages/party/PartyDetail.js';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='party'>
                        <Route path='party-number' element={<PartyDetail />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
