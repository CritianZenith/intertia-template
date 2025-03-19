import { Head } from "@inertiajs/react";
import { useState } from "react";

import inertiaSvg from "/assets/inertia.svg";
import reactSvg from "/assets/react.svg";
import viteRubySvg from "/assets/vite_ruby.svg";
import { Textarea } from "../components/textarea";

export default function InertiaExample({ name }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <Head title="Inertia + Vite Ruby + React Example" />

      <div className="max-w-7xl mx-auto p-8 text-center font-[Inter] leading-6 font-normal text-[#213547] bg-white">
        <h1 className="text-5xl leading-tight">Hello {name}!</h1>

        <div>
          <a
            href="https://inertia-rails.netlify.app"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="inline-block h-24 p-6 transition-filter duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
              src={inertiaSvg}
              alt="Inertia logo"
            />
          </a>
          <a
            href="https://vite-ruby.netlify.app"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="inline-block h-24 p-6 transition-filter duration-300 hover:drop-shadow-[0_0_2em_#e4023baa]"
              src={viteRubySvg}
              alt="Vite Ruby logo"
            />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img
              className="inline-block h-24 p-6 transition-filter duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] motion-safe:animate-[spin_20s_linear_infinite]"
              src={reactSvg}
              alt="React logo"
            />
          </a>
        </div>

        <h2 className="text-4xl leading-tight">Inertia + Vite Ruby + React</h2>

        <div className="p-8">
          <button
            className="rounded-lg border border-transparent px-5 py-2.5 text-base font-medium font-inherit bg-[#f9f9f9] cursor-pointer transition-colors duration-250 hover:border-[#646cff] focus:outline-none focus:ring-4"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
          <p>
            Edit <code>app/frontend/pages/InertiaExample.jsx</code> and save to
            test HMR
          </p>
        </div>
        <p className="text-[#888]">
          Please Click on the Inertia, Vite Ruby, and React logos to learn more
        </p>
        <Textarea
          value="Hello World!"
          placeholder="Type here..."
          onChange={() => {}}
        />
      </div>
    </>
  );
}
