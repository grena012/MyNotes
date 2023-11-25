const connectToMongo = require('./db');
const express = require('express');

connectToMongo();
const app = express()
const port = 3000

app.use(express.json())

//Available routes
app.use('/api/auth', require('./routes/auth'))
// app.use('/api/notes', require('./routes/notes'))

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

//   app.get('/login', (req, res) => {
//     res.send('login')
//   })


app.listen(port, () => {
    console.log(`example of app listening on port ${port}` );
})