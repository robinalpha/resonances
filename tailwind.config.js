/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  // Les classes de dégradé sont construites à partir de chaînes stockées dans les
  // données (ex. "from-blue-400 to-blue-600"). Elles apparaissent donc en toutes
  // lettres dans le code, mais on les met aussi en safelist par sécurité afin
  // qu'elles ne soient jamais purgées au build.
  safelist: [
    // Dégradés des éditions
    'from-yellow-400', 'to-orange-500',
    'from-blue-400', 'to-blue-600',
    'from-pink-400', 'to-pink-600',
    'from-green-400', 'to-green-600',
    'from-red-400', 'to-red-600',
    'from-purple-400', 'to-purple-600',
    'from-gray-600', 'to-gray-800',
    'from-indigo-400', 'to-indigo-600',
    'from-lime-400', 'to-cyan-500',
    'from-rose-500', 'to-pink-700',
    'from-gray-400', 'to-gray-600',
    // Dégradés du header / fond / liseré
    'from-indigo-600', 'via-violet-600', 'to-rose-500',
    'from-indigo-400', 'via-violet-400', 'to-rose-400',
    'from-indigo-50', 'via-violet-50', 'to-rose-50',
    'from-violet-100', 'to-rose-100',
    // Directions de dégradé
    'bg-gradient-to-r', 'bg-gradient-to-br',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
