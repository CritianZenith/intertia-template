import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import our custom rule
const useUIComponentsRule = await import(path.join(__dirname, "/app/javascript/lib/eslint-rules/use-ui-components.js"));

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        React: "readonly", // Add React to globals
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      // Disable the react-in-jsx-scope rule since it's not needed in React 17+
      "react/react-in-jsx-scope": "off",
      // Optional: other React rules you might want to customize
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    // Apply our custom rule only to React component files
    files: ["**/*.{jsx,tsx}"],
    rules: {
      // Add our custom rule for UI components
      "use-ui-components": "warn", // Use "warn" initially to avoid breaking builds
    },
    plugins: {
      // Add our custom plugin with the rule
      custom: {
        rules: {
          "use-ui-components": useUIComponentsRule.default,
        },
      },
    },
  },
  eslintConfigPrettier,
];
