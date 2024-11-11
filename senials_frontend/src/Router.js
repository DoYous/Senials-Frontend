import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 컴포넌트
import Layout from './layouts/Layout.js';
import App from './App.js';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<App/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;