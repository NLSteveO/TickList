import { useState } from 'react';
import Home from './pages/Home/Home';

const PAGE_INDEX = 4;

const pageComponents: Record<string, React.ComponentType> = {
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
