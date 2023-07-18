const { StatusCodes } = require('http-status-codes');
const { AirportService } = require('../services');
const { SuccessResponse,ErrorResponse } = require('../utils/common/index');
const { data } = require('../utils/common/error-response');
const airport = require('../models/airport');

/*
 POST: /airportes
 req-body {name:'IGI',code:'DEL',cityId:5}
*/

async function createAirport(req,res){
    try{
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId

        });
        SuccessResponse.data = airport;
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

async function getAirports(req,res){
    try{
        const airports = await AirportService.getAirports();
        SuccessResponse.message ='Successfully competed the request';
        SuccessResponse.data = airports;
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

async function getAirport(req,res){
    try{
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.message ='Successfully competed the request';
        SuccessResponse.data = airport;
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

async function destroyAirport(req,res){
    try{
        const response = await AirportService.destroyAirport(req.params.id);
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

async function updateAirport(req,res)
{
try{

     const airport = await AirportService.updateAirport({
        name: req.body.name,
        cityId:req.body.cityId,
        code: req.body.code
     },req.params.id);
     SuccessResponse.data = airport;
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
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}