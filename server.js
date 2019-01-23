//npm modules import
const express = require('express')
const morgan = require('morgan')

//trip-planner modules import
//const extremeCtrl = require('./controllers/extremeTripCtrl') ***Keep in Comment until remove google Maps import
const sunBathCtrl = require('./controllers/sunBathController')
const familyTripController = require('./controllers/familyTripCtrl')
const placeCtrl = require('./controllers/placeCtrl')
//const extremeController = require('./controllers/extremeTripCtrl') ***Keep in Comment until remove google Maps import
const sunBathCtrl = require('./controllers/sunBathController')
const familyTripController = require('./controllers/familyTripCtrl')
const tripCtrlr = require('./controllers/tripCtrl')
const userCtrl = require('./controllers/userCtrl')
//server app uses
const app = express()
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

/*ROUTES*/

/*  Place Routes */
app.get('/api/places', placeCtrl.getAllPlaces)
app.get('/api/:placeGoogleId', placeCtrl.getPlaceById)
app.put('/api/newPlace/:placeGoogleId', placeCtrl.saveNewPlace)
app.put('/api/update/:placeGoogleId', placeCtrl.updateAmount)

/*User Routes HEN*/

app.get('/api/addUser',userCtrl.addUser)

/*Family Trip Routes SERGEI*/
//app.get('/api/family/kidsAttraction',familyTripController.getKidsAttraction);
// app.get('/api/family/museum',()=>{});
// app.get('/api/family/amusementPark',()=>{});
// app.get('/api/family/shopping',()=>{});
// app.get('/api/family/restrount',()=>{});

/*SunBath Trip Routes HEN*/
app.get('/api/testbeach',sunBathCtrl.getBeaches);
// app.get('/api/testspa',sunBathCtrl.getSpa);
// app.get('/api/testshops',sunBathCtrl.getShops);
// app.get('/api/testbars',sunBathCtrl.getBars);
// app.get('/api/testres',sunBathCtrl.getRestaurant);


/* Extreme Trip Routes CHEN*/
// app.get('/api/extreme/amusementPark',asyncWrapper(extremeCtrl.getParks))
// app.get('/api/extreme/seaSport',asyncWrapper(extremeCtrl.getSeaSport))
// app.get('/api/extreme/mount',asyncWrapper(extremeCtrl.getMount))
// app.get('/api/extreme/ski',asyncWrapper(extremeCtrl.getSki))
// app.get('/api/extreme/rv',asyncWrapper(extremeCtrl.getRv))

/*DATA BASE ROUTES $$change ()=>{}$$*/
// app.get('/api/db/trips',);
// app.put('/api/db/editTrip',);
// app.post('/api/db/newTrip',);
// app.delete('/api/db/deleteTrip',);

app.all('*', (req, res, next) => {
    res.send({
        'appName': "trip-planner",
        'status': "running",
        'stage': "dev",
        'docUrl': "https://github.com/chenyafe052/trip-planner"
    })
})

app.listen(port, () => console.log(`Express server listening on port ${port}`))