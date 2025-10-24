import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConfiguratorPage from './pages/ConfiguratorPage';
import GalleryPage from './pages/GalleryPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<ConfiguratorPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/edit/:id" element={<ConfiguratorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
