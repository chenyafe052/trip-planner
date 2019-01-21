const express = require('express')
const morgan = require('morgan')
const asyncWrapper = require('./controllers/async.wrapper')
const extremeCtrl = require('./controllers/extremeTrip.ctrl')
const sunBathCtrl = require('./controllers/sunBath.ctrl')
const familyCtrl = require('./controllers/familyTrip.ctrl')



const app = express()
const port = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


/*Family Trip Routes $$change ()=>{}$$*/
// app.get('/api/family/kidsAttraction',()=>{});
// app.get('/api/family/museum',()=>{});
// app.get('/api/family/amusementPark',()=>{});
// app.get('/api/family/shopping',()=>{});
// app.get('/api/family/restrount',()=>{});

app.get('/api/test',sunBathctrl.getBeaches);

/*Data Base Routes $$change ()=>{}$$*/
// app.get('/api/db/tripById',()=>{});
// app.put('/api/db/editTrip',()=>{});
// app.post('/api/db/newTrip',()=>{});
// app.delete('/api/db/deleteTrip',()=>{});

// app.all('*', (req, res, next) => {
//     res.send("")
//     next()
// })

app.listen(port, () => console.log(`Express server listening on port ${port}`))