import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './scss/App.scss';
import HomeRoute from './routes/Home';
import ConfigRoute from './routes/Config';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/config" element={<ConfigRoute />} />
        </Routes>
      </Router>
    </>
  );
}
