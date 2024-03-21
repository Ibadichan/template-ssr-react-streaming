import { useState, lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import reactLogo from './assets/react.svg'
import './App.css'

const Cards = lazy(() => import('@/components/Cards'));
const List = lazy(() => import('@/components/List'));

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Helmet>
        <title>My react app</title>
        <meta name="description" content="meta desc" />
      </Helmet>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>
      API_URL:
      {`${import.meta.env.VITE_API_URL}`}
      <br/>
      SITE_KEY:
      {`${import.meta.env.VITE_SITE_KEY}`}
      <br/>
      ANOTHER:
      {`${import.meta.env.VITE_ANOTHER}`}
      <br/>
      Prod:
      {`${import.meta.env.PROD}`}
      </p>

      <div className='index-columns'>
      <Suspense fallback={<p>loading cards</p>}>
        <Cards />
      </Suspense>

      <Suspense fallback={<p>loading list</p>}>
        <List />
      </Suspense>
      </div>
    </>
  )
}

export default App
