const {StatusCodes} =  require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { DateTimeHelpers } = require('../utils/helpers.js/datetime-helpers')

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        if(!DateTimeHelpers.compareTime(data.arrivalTime, data.departureTime)){
            throw new AppError('Arrival time must be greater than departure time', StatusCodes.BAD_REQUEST);
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
  


module.exports = {
    createFlight
}

 