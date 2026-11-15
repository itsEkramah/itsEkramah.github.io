import http from 'node:http';
import path from 'node:path';
import { readFile, stat } from 'node:fs/promises';
const root = path.resolve(process.argv[2] || 'dist');
const port = Number(process.argv[3] || 4321);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, 'http://localhost').pathname,
      );
      let file = path.resolve(root, `.${pathname}`);
      if (file !== root && !file.startsWith(root + path.sep)) {
        res.writeHead(403);
        return res.end();
      }
      if ((await stat(file).catch(() => null))?.isDirectory())
        file = path.join(file, 'index.html');
      let status = 200;
      let body = await readFile(file).catch(async () => {
        status = 404;
        file = path.join(root, '404.html');
        return readFile(file);
      });
      res.writeHead(status, {
        'Content-Type': types[path.extname(file)] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(body);
    } catch {
      res.writeHead(500);
      res.end('Preview error');
    }
  })
  .listen(port, '127.0.0.1', () =>
    console.log(`Preview: http://127.0.0.1:${port}`),
  );
