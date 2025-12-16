import { useState, useEffect } from 'react';
import { AddRoute, Home } from './pages';

const PAGE_INDEX = 4;

const pageComponents: Record<string, React.ComponentType> = {
  AddRoute: AddRoute,
  Home: Home
};

const renderPage = (page: string) => {
  const PageComponent = pageComponents[page] || Home;
  return <PageComponent />;
};

const resetURL = () => window.history.pushState({}, '', '/TickList');

function App() {
  const [page] = useState(() => {
    const splitURL = window.location.href.split('/');
    return splitURL[PAGE_INDEX] || 'Home';
  });

  useEffect(() => {
    resetURL();
  }, [page]);

  return renderPage(page);
}

export default App;
