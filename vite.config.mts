import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    RubyPlugin(),
    react(),
    {
      name: 'vite-plugin-ruby:ssr',
      config (config) {
        if (!config?.build?.ssr)
          return

        // Remove any entrypoints configured by Vite Ruby.
        delete config?.build?.rollupOptions?.input
        delete config?.build?.rollupOptions?.output

        return {
          build: {
            outDir: `${config.build.outDir}`,
            rollupOptions: {
              input: {
                ssr: 'app/javascript/ssr/ssr.jsx',
              },
            },
          },
        }
      },
    },
  ],
})
