import { createInertiaApp } from "@inertiajs/react";
import { createElement } from "react";
import { createRoot } from "react-dom/client";

import { ApplicationLayout } from "../layouts/Layout";

createInertiaApp({
  progress: {
    delay: 250,
  },
  // Set default page title
  // see https://inertia-rails.netlify.app/guide/title-and-meta
  //
  title: (title) => (title ? title : "Chat"),

  // Disable progress bar
  //
  // see https://inertia-rails.netlify.app/guide/progress-indicators
  // progress: false,

  resolve: (name) => {
    const pages = import.meta.glob("../pages/**/*.jsx", {
      eager: true,
    });
    const page = pages[`../pages/${name}.jsx`];
    if (!page) {
      console.error(`Missing Inertia page component: '${name}.jsx'`);
    }

    // To use a default layout, import the Layout component
    // and use the following lines.
    // see https://inertia-rails.netlify.app/guide/pages#default-layouts
    //
    page.default.layout ||= (page) =>
      createElement(ApplicationLayout, null, page);

    return page;
  },

  setup({ el, App, props }) {
    if (el) {
      createRoot(el).render(createElement(App, props));
    } else {
      console.error(
        "Missing root element.\n\n" +
          "If you see this error, it probably means you are not loading the right assets at the right time.\n",
      );
    }
  },
});
