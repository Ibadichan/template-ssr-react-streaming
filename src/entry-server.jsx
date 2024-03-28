import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import MultiStream from 'multistream'
import { Readable } from 'node:stream'
import App from './App'

// small utility for "readable" streams
const readableString = string => {
  const s = new Readable();
  s.push(string);
  s.push(null);
  s._read = () => true;
  return s;
};

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
  
        const endStream = readableString(htmlEnd);

        const streams = [
          styledStream,
          endStream,
        ];

        new MultiStream(streams).pipe(res);

        pipe(styledStream);
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
