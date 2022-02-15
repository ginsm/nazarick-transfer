import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './scss/App.scss';
import { useEffect } from 'react';
import HomeRoute from './routes/Home';
import ConfigRoute from './routes/Config';
import transfer from './utility/transfer';

export default function App() {
  // Ensures that transferProcessing is false on launch.
  useEffect(() => {
    transfer.suspendTransfer();
  }, []);

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
