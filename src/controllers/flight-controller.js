const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');
const { SuccessResponse,ErrorResponse } = require('../utils/common/index');
const { data } = require('../utils/common/error-response');
const airport = require('../models/airport');

/*
 POST: /flights
 req-body {
            flightNumber:'UK808',
            airplaneId:'a380',
            departureAirportId:'12'
            arrivalAirportId:'11'
            arrivalTime:'11:10:00',
            departureTime:'9:10:00',
            price:2000,
            boardingGate:'12A',
            totalSeates:120  
          }
*/

async function createFlight(req,res){
    try{
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate:req.body.boardingGate,
            totalSeates: req.body.totalSeates    
        });
        SuccessResponse.data = flight;
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

async function getAllFlights(req,res){
    try{
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
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

async function getFlight(req,res){
    try{
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.message ='Successfully competed the request';
        SuccessResponse.data = flight;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    } catch(error){
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.StatusCodes)
                .json(ErrorResponse);
    }
}



module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}