import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'docs-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/docs' && req.method === 'GET') {
            try {
              const docsDir = path.resolve(process.cwd(), 'docs')
              if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir)
              
              const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'))
              const data = files.map(f => ({
                id: f.replace('.md', ''),
                name: f,
                title: f.replace('.md', '').split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
                content: fs.readFileSync(path.join(docsDir, f), 'utf-8'),
                isReadOnly: f === 'README.md'
              }))
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(data))
            } catch (err) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: err.message }))
            }
          } else if (req.url === '/api/docs' && req.method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', () => {
              try {
                const { name, content } = JSON.parse(body)
                if (name === 'README.md') {
                  res.statusCode = 403
                  res.end('Cannot edit README.md')
                  return
                }
                const docsDir = path.resolve(process.cwd(), 'docs')
                fs.writeFileSync(path.join(docsDir, name), content)
                res.end('Saved')
              } catch (err) {
                res.statusCode = 500
                res.end(err.message)
              }
            })
          } else {
            next()
          }
        })
      }
    }
  ],
})
