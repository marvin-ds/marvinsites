import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://marvinsites.com.br',
  integrations: [
    tailwind(),
  ],
  output: 'static',
  vite: {
    build: {
      cssCodeSplit: false,
    },
  },
});
