import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { devToolsRoutes } from './devtools/routes';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {devToolsRoutes}
        </Routes>
      </div>
    </Router>
  );
} 
