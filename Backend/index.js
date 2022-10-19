require('dotenv').config()
const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
var cors = require('cors')
const app = express()

app.use(cors())
const port = process.env.REACT_APP_PORT;
app.use(express.json())
// Available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`myNotebook listening on port ${port}`)
})