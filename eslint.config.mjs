import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Désactiver la règle pour les entités non échappées (apostrophes, guillemets, etc.)
      "react/no-unescaped-entities": "off",
      // Désactiver temporairement la règle pour les variables non utilisées pendant le développement
      "@typescript-eslint/no-unused-vars": "warn",
      // Désactiver temporairement la règle pour les types 'any'
      "@typescript-eslint/no-explicit-any": "warn",
      // Désactiver l'avertissement pour les dépendances manquantes dans useCallback/useEffect
      "react-hooks/exhaustive-deps": "warn"
    }
  }
];

export default eslintConfig;
