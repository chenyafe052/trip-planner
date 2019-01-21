const express = require('express')
const morgan = require('morgan')
const ctrl = require('./controllers/familyTrip')
const asyncWrapper = require('./controllers/async.wrapper')
const {google} = require('googleapis')


const app = express()
const port = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

// app.get('/api/get', asyncWrapper(ctrl.getAllCanceldGame))
// app.post('/game/:id', asyncWrapper(ctrl.setGameStatus))
// app.get('/game/:status&:cancellationReason', asyncWrapper(ctrl.getCancellationGameByReason))


/*Family Trip Routes $$change ()=>{}$$*/
app.get('/api/family/kidsAttraction',()=>{});
app.get('/api/family/museum',()=>{});
app.get('/api/family/amusementPark',()=>{});
app.get('/api/family/shopping',()=>{});
app.get('/api/family/restrount',()=>{});

/*Data Base Routes $$change ()=>{}$$*/
app.get('/api/db/tripById',()=>{});
app.put('/api/db/editTrip',()=>{});
app.post('/api/db/newTrip',()=>{});
app.delete('/api/db/deleteTrip',()=>{});

app.all('*', (req, res, next) => {
    res.send("")
    next()
})

app.listen(port, () => console.log(`Express server listening on port ${port}`))