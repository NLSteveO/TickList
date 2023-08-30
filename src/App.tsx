import { useState } from 'react';
import { AddRoute, Home } from './pages';

const PAGE_INDEX = 4;

const pageComponents: Record<string, React.ComponentType> = {
  addRoute: AddRoute,
  home: Home
};

const renderPage = (page: string) => {
  const PageComponent = pageComponents[page] || Home;
  return <PageComponent />;
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
