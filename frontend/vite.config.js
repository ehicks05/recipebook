import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
      global: 'window',
    },
  });
};
