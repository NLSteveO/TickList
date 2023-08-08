import { useState } from 'react';
import Home from './pages/Home';
import './App.css';

const renderPage = (page: string) => {
  switch (page) {
    case 'home':
      return <Home />;
    default:
      return <Home />;
  }
};

function App() {
  const [page] = useState('home');

  return renderPage(page);
}

export default App;
