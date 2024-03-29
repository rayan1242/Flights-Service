const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { SuccessResponse,ErrorResponse } = require('../utils/common/index');
const { data } = require('../utils/common/error-response');

/*
 POST: /airplanes
 req-body {modelNumber: 'Airbus380',capacity: 200}
*/

async function createAirplane(req,res){
    try{
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity 
        });
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error){
        ErrorResponse.error = error;
        return res
                .status(error.StatusCodes)
                .json(ErrorResponse);
    }

}

async function getAirplanes(req,res){
    try{
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.message ='Successfully competed the request';
        SuccessResponse.data = airplanes;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    } catch(error){
        ErrorResponse.error = error;
        return res
                .status(error.StatusCodes)
                .json(ErrorResponse);
    }
}

async function getAirplane(req,res){
    try{
        const airplanes = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.message ='Successfully competed the request';
        SuccessResponse.data = airplanes;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    } catch(error){
        ErrorResponse.error = error;
        return res
                .status(error.StatusCodes)
                .json(ErrorResponse);
    }
}

/*
 POST: /airplanes
 req-body {modelNumber: 'Airbus380',capacity: 200}
*/

async function destroyAirplane(req,res){
    try{
        const response = await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error){
        ErrorResponse.error = error;
        return res
                .status(error.StatusCodes)
                .json(ErrorResponse);
    }

}

async function updateAirplane(req,res)
{
try{

     const airplanes = await AirplaneService.updateAirplane({
        modelNumber: req.body.modelNumber,
        capacity: req.body.capacity
     },req.params.id);
     SuccessResponse.data = airplanes;
     return res.
               status(StatusCodes.CREATED)
              .json( SuccessResponse );

}catch(error) 
{
    ErrorResponse.error = error;
    return res
              .status(error.StatusCodes)                          
              .json(ErrorResponse);
}
}


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}