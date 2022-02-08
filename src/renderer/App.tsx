import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './scss/App.scss';

const Hello = () => {
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
        <button className="button is-primary" type="button">
          Primary
        </button>
        <button className="button is-link" type="button">
          Link
        </button>
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
