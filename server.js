import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url';
import { Edge } from 'edge.js'

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const edge = Edge.create({
    cache: process.env.NODE_ENV === 'production'
})

edge.mount(join(__dirname, './views'))

app.use('/assets', express.static(join(__dirname, '/assets')))

app.get('/', (req, res) => {
  res.send(edge.renderSync('index'))
})

app.listen(port, () => {
  console.log(`ESON app listening http://localhost:${port}`)
})