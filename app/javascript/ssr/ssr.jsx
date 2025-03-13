import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import { Suspense } from 'react';

const pages = import.meta.glob('../pages/*.jsx')


createServer((page) => createInertiaApp({
  page,
  render: ReactDOMServer.renderToString,
  resolve: name => pages[`../pages/${name}.jsx`],
  setup: ({ App, props }) => <StrictMode><Suspense><App {...props} /></Suspense></StrictMode>,
}));
