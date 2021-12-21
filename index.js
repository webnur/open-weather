const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongose = require('mongoose')


const app = express()

app.use(cors)

// app.get(express.static('public'))

app.get('/', (req, res) =>{
    res.send('<h1> Hello I am n node server Runing on port 4444</h1>')
})

const PORT = process.env.PORT || 4444
app.listen(PORT, () =>{
    console.log('App is runing on PORT' + PORT);
})