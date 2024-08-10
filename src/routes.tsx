import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import CardMosters from './components/renderCards/yugi';
import HomePage from './components/apresentacao/Home';
import CardDeail from './components/details/CardDetail';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="cards" element={<CardMosters />} />
                    <Route path="cards/:id" element={<CardDeail />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;