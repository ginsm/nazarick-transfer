import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './scss/App.scss';
import useStore from './store';

const Hello = () => {
  const curseForgePath = useStore((state) => state.curseForgePath);
  const setCurseForgePath = useStore((state) => state.setCurseForgePath);
  const { setFile, setProcessing } = useStore((state) => ({
    setFile: state.setFile,
    setProcessing: state.setProcessing,
  }));

  return (
    <div
      className="has-text-centered"
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <h1 className="title">Bulma</h1>
      <p className="subtitle">
        Modern CSS framework based on{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox">
          Flexbox
        </a>
      </p>

      <div className="field">
        <div className="control">
          <input className="input" type="text" placeholder="Input" />
        </div>
      </div>

      <div className="field">
        <p className="control">
          <span className="select">
            <select>
              <option>Select dropdown</option>
            </select>
          </span>
        </p>
      </div>

      <div className="buttons is-centered">
        <button
          className="button is-primary"
          type="button"
          onClick={async () => {
            const path = await window.electron.browseForCurseForge(
              curseForgePath
            );
            setCurseForgePath(path);
          }}
        >
          Primary
        </button>
        <button
          className="button is-link"
          type="button"
          onClick={() => {
            setProcessing('browse', false);
          }}
        >
          Link
        </button>
      </div>
      <div>
        <p>CurseForgePath: {curseForgePath}</p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
