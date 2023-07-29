import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <h1>NLSteveO's TickList</h1>
      <h3>This page is under construction. Hopefully I'll have something here soon.</h3>
      <iframe src="https://giphy.com/embed/q3qWgf5k4QHyAwis94" width="480" height="480" frameBorder="0" allowFullScreen />
      <p>
        <a href="https://giphy.com/gifs/work-working-workinprogress-q3qWgf5k4QHyAwis94">via GIPHY</a>
      </p>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more about the libraries being used.
      </p>
    </>
  )
}

export default App
