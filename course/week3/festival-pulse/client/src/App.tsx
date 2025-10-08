import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StageDetailPage from './pages/StageDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stages/:id" element={<StageDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
