 const express = require('express');

 const { InfoController } = require('../../controllers');
 
 const cityRoutes = require('./city-routes')

 const airplaneRoutes = require('./airplane-routes');

 const router = express.Router();

 router.use('/airplanes',airplaneRoutes);

 router.use('/cities',cityRoutes);


 router.get('/info',InfoController.info);

 module.exports = router;



