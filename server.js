const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const { Edge } = require('edge.js')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')


const app = express()
const port = 3000

const adapter = new FileSync('db.json')
const db = low(adapter)


const edge = new Edge({ cache: false })
edge.mount(path.join(__dirname, './views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/assets', express.static(path.join(__dirname, '/assets')))

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.get('/', (req, res) => {
  const steps = db.get('steps').value()
  res.send(edge.renderSync('index', { steps }))
})

app.post('/api/steps', (req, res) => {
  db.get('steps').push({
    id: db.get('steps').size().value() + 1,
    title: req.body.title
  }).write()
  res.redirect('back')
})

app.delete('/api/steps/:id', (req, res) => {
  db.get('steps').remove({ id: req.params.id }).write()
  res.redirect("back")
})

app.get('/api/send', (req, res) => {
  const msg = edge.renderSync('wa_message', req.query)
  // res.send(req.query)
  res.redirect(msg)
})

app.listen(port, () => {
  console.log(`ESON app listening http://localhost:${port}`)
})
