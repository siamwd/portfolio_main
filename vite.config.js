import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import contactHandler from './src/api/contact.js';

function contactApiPlugin() {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res, next) => {
        const respond = {
          setHeader: (...args) => res.setHeader(...args),
          status(code) {
            res.statusCode = code;
            return this;
          },
          json(body) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(body));
            return this;
          },
        };

        const runHandler = () => {
          Promise.resolve(contactHandler(req, respond)).catch(next);
        };

        if (req.method !== 'POST') {
          runHandler();
          return;
        }

        let rawBody = '';
        let tooLarge = false;
        req.setEncoding('utf8');
        req.on('data', (chunk) => {
          rawBody += chunk;
          if (rawBody.length > 32000) tooLarge = true;
        });
        req.on('end', () => {
          if (tooLarge) {
            res.statusCode = 413;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Request is too large.' }));
            return;
          }

          try {
            req.body = rawBody ? JSON.parse(rawBody) : {};
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Invalid JSON body.' }));
            return;
          }

          runHandler();
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), contactApiPlugin()],
});
