import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

const ABORT_DELAY = 10000;

export function render(params) {
  const {
    res, 
    template,
    styledStream,
  }= params;

  const helmetContext = {};

  let didError = false;
  
  const { pipe, abort } = renderToPipeableStream(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </React.StrictMode>,
    {
      onShellError() {
        res.sendStatus(500);
      },
      onAllReady() {
        res.status(didError ? 500 : 200);
        res.set({ 'Content-Type': 'text/html' });

        const { helmet } = helmetContext;

        const title = helmet.title.toString();
        const meta =  helmet.meta.toString();

        let [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);

        htmlStart = htmlStart.replace(`<!--app-head-->`, [
          title,
          meta,
        ].join(''));

        res.write(htmlStart);

        styledStream.pipe(res, { end: false });

        pipe(styledStream);

        styledStream.on('end', () => {
          res.end(htmlEnd);
        })
      },
      onError(error) {
        didError = true;
        console.error(error);
      }
    },
  );

  setTimeout(() => {
    abort();
  }, ABORT_DELAY);
}
