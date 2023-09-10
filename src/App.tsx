import { useState } from 'react';
import Home from './pages/Home';
import './App.css';

const PAGE_INDEX = 4;

const renderPage = (page: string) => {
  switch (page) {
    case 'home':
      return <Home />;
    default:
      return <Home />;
  }
};

const resetURL = () => {
  window.history.pushState({}, '', '/TickList');
  const event = new Event('popstate');
  window.dispatchEvent(event);
}

function App() {
  const splitURL = window.location.href.split('/');
  if (splitURL[PAGE_INDEX]) resetURL();

  const [page] = useState(splitURL[PAGE_INDEX]);

  return renderPage(page);
}

export default App;
