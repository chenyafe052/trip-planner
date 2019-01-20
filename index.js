const express = require('express')
const morgan = require('morgan')
const ctrl = require('./controllers/tripController')
// const asyncWrapper = require('./async.wrapper')

const app = express()
const port = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


// app.get('/games', asyncWrapper(ctrl.getAllCanceldGame))
// app.post('/game/:id', asyncWrapper(ctrl.setGameStatus))
// app.get('/game/:status&:cancellationReason', asyncWrapper(ctrl.getCancellationGameByReason))

app.all('*', (req, res, next) => {
    res.send("")
    next()
})

app.listen(port, () => console.log(`Express server listening on port ${port}`))