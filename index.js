require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')
const routes = require('./routes/noteRoutes')
const cors = require('cors')

const app = express()

connectDB()

app.use(cors())

const PORT = process.env.PORT

app.use(express.json())
app.use('/api/notes', routes)

app.get('/', (req, res) => {
    res.send('Server en express');
})

app.listen(PORT, () => {
    console.log(`Server corriendo en http://localhost:${PORT}`);
})