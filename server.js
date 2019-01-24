//npm modules import
const express = require('express')
const morgan = require('morgan')

//trip-planner modules import
const extremeCtrl = require('./controllers/extremeTripCtrl')
const sunBathCtrl = require('./controllers/sunBathController')
const familyTripCtrl = require('./controllers/familyTripCtrl')
const placeCtrl = require('./controllers/placeCtrl')
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

/*User Routes */
app.put('/api/addUser',userCtrl.addUser)
app.get('/api/getuser/:email',userCtrl.getUserByEmail)

/*Family Trip Routes */
// app.get('/api/family/kidsAttraction',familyTripCtrl.getKidsAttraction);
// app.get('/api/family/museum',familyTripCtrl.getMuseum);
// app.get('/api/family/amusementPark',familyTripCtrl.getParks);
// app.get('/api/family/shopping',familyTripCtrl.getParks);
// app.get('/api/family/restrount',familyTripCtrl.getRestaurant);

/*SunBath Trip Routes */
app.get('/api/sun/beach',sunBathCtrl.getBeaches);
app.get('/api/sun/spa',sunBathCtrl.getSpa);
// app.get('/api/sun/shop',sunBathCtrl.getShops);
// app.get('/api/sun/bar',sunBathCtrl.getBars);
// app.get('/api/sun/res',sunBathCtrl.getRestaurant);

/* Extreme Trip Routes */
// app.get('/api/extreme/amusementPark',extremeCtrl.getParks)
// app.get('/api/extreme/seaSport',extremeCtrl.getSeaSport)
// app.get('/api/extreme/mount',extremeCtrl.getMount)
// app.get('/api/extreme/ski',extremeCtrl.getSki)
// app.get('/api/extreme/rv',extremeCtrl.getRv)

/*DATA BASE ROUTES */
app.get('/api/trip/all', tripCtrlr.getAllTrips);
app.get('/api/trip/getById/:id',tripCtrlr.findTripByID)
//app.put('/api/trip/editById/:id',tripCtrlr.editTripByID);
app.post('/api/trip/newTrip',tripCtrlr.createNewTrip);
app.delete('/api/trip/deleteById/:id',tripCtrlr.deleteTrip);

app.all('*', (req, res, next) => {
    res.send({
        'appName': "trip-planner",
        'status': "running",
        'stage': "prod",
        'docUrl': "https://github.com/chenyafe052/trip-planner"
    })
})

app.listen(port, () => console.log(`Express server listening on port ${port}`))