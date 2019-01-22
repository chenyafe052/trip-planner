const connection = require('./controllers/db')
const express = require('express')
const morgan = require('morgan')
const asyncWrapper = require('./controllers/async.wrapper')
//const extremeCtrl = require('./controllers/extremeTripCtrl')
const sunBathCtrl = require('./controllers/sunBathController')
const familyCtrl = require('./controllers/familyTripCtrl')


const app = express()
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


/*Family Trip Routes $$change ()=>{}$$*/
app.get('/api/family/kidsAttraction',familyCtrl.getKidsAttraction);
// app.get('/api/family/museum',()=>{});
// app.get('/api/family/amusementPark',()=>{});
// app.get('/api/family/shopping',()=>{});
// app.get('/api/family/restrount',()=>{});

/*SunBath Trip Routes $$change ()=>{}$$*/
app.get('/api/testbeach',sunBathCtrl.getBeaches);
// app.get('/api/testspa',sunBathCtrl.getSpa);
// app.get('/api/testshops',sunBathCtrl.getShops);
// app.get('/api/testbars',sunBathCtrl.getBars);
// app.get('/api/testres',sunBathCtrl.getRestaurant);

/* Extreme Trip Routes */
// app.get('/api/extreme/amusementPark',asyncWrapper(extremeCtrl.getParks))
// app.get('/api/extreme/seaSport',asyncWrapper(extremeCtrl.getSeaSport))
// app.get('/api/extreme/mount',asyncWrapper(extremeCtrl.getMount))
// app.get('/api/extreme/ski',asyncWrapper(extremeCtrl.getSki))
// app.get('/api/extreme/rv',asyncWrapper(extremeCtrl.getRv))

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