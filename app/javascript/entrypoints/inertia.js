import { createInertiaApp } from "@inertiajs/react";
import { createElement } from "react";
import { createRoot } from "react-dom/client";

import { ApplicationLayout } from "../layouts/Layout";
import { ApolloClientProvider } from "../lib/apollo";

createInertiaApp({
  progress: {
    // The delay after which the progress bar will appear, in milliseconds...
    delay: 250,

    // The color of the progress bar...
    color: "#29d",

    // Whether to include the default NProgress styles...
    includeCSS: true,

    // Whether the NProgress spinner will be shown...
    showSpinner: true,
  },
  // Set default page title
  // see https://inertia-rails.netlify.app/guide/title-and-meta
  //
  title: (title) => (title ? title : "Chat"),

  resolve: (name) => {
    // Import all pages, including ones in the pages/Account directory
    const pages = import.meta.glob("../pages/**/*.*", { eager: true });
    const page = pages[`../pages/${name}.tsx`] || pages[`../pages/${name}.jsx`];
    if (!page) {
      console.error(`Missing Inertia page component: '${name}.jsx'`);
    }

    page.default.layout ||= (page) =>
      createElement(ApplicationLayout, null, page);

    return page;
  },

  setup({ el, App, props }) {
    if (el) {
      // Wrap the app with ApolloClientProvider
      createRoot(el).render(
        createElement(ApolloClientProvider, null, createElement(App, props)),
      );
    } else {
      console.error(
        "Missing root element.\n\n" +
          "If you see this error, it probably means you are not loading the right assets at the right time.\n",
      );
    }
  },
});
