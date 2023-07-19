const {StatusCodes} =  require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { DateTimeHelpers } = require('../utils/helpers.js')
const { Op } = require('sequelize');
const { param } = require('../routes');
const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        if(!DateTimeHelpers.compareTime(data.arrivalTime, data.departureTime)){
            throw new AppError('Arrival time must be greater than departure time', StatusCodes.BAD_REQUEST);
        }
        //Departure and arrival airport cannot be same
        else if(data.departureAirportId == data.arrivalAirportId){
            throw new AppError('Departure and arrival airport reference cannot be same', StatusCodes.BAD_REQUEST);
        }

      const flight = await flightRepository.create(data);
      return flight;
    } catch (error) {
        console.log(error);
      if (
        error.name == "SequelizeValidationError" ||
        error.name == "SequelizeUniqueConstraintError"
      ) {
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      } else if (error.name == "SequelizeForeignKeyConstraintError" 
                 || error.name == "SequelizeDatabaseError"
      ) {
        let explanation = [];
        explanation.push(error.parent.sqlMessage);
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      }
      throw new AppError(
        "Cannot create a new Flight object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async function getAllFlights(query){
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime =" 23:59:00";
    //trips = MUM-DEL
    if(query.trips){
        [departureAirportId,arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if(query.price){
      [minprice,maxprice] = query.price.split("-");
      customFilter.price ={ 
        [Op.between]: [minprice,((maxprice == undefined)? 30000:maxprice)] 
      }

    }
    if(query.travellers){
      customFilter.totalSeates= {
        [Op.gte]: query.travellers
      }
    }
    if(query.tripDate){
      customFilter.departureTime = {
        [Op.between]: [query.tripDate, query.tripDate+endingTripTime]
      }
    }
    if(query.sort){
      const params = query.sort.split(',');
      const sortFilters = params.map((param) => param.split('_'));
      sortFilter = sortFilters;
    }
    console.log(sortFilter);
    try{
        const airport = await flightRepository.getAllFlights(customFilter,sortFilter);
        return airport;
    } catch(error){
        throw new AppError('Cannot fetch data of all the flights',StatusCodes.INTERNAL_SERVER_ERROR);

    }
  }
  


module.exports = {
    createFlight,
    getAllFlights
}

 