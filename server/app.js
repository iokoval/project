const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors');

//configuring database
const db = require('./db');
const productRouter = require('./router');
const product = require('./product.model');
const order = require('./order.model')

const app = express()
app.use(bodyParser.json());
app.use(cors())
app.use(express.json({ extended: true }))

app.use('/api', productRouter);
app.use(productRouter);

app.use('/', express.static(path.join(__dirname, 'src', 'front', 'client', 'src')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'front', 'client', 'public', 'index.html'))
})

const PORT = 4000;

async function start() {
  try {
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()

