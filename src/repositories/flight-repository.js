const CrudRepository = require('./crud-repository')
const { Flight,Airplane,Airport,City} = require('../models')
const { Sequelize } = require('sequelize');
const db = require('../models');
const { addRowLockOnFlights } = require('./queries')


class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter,sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                model:Airplane,
                required:true,
                as:'airplane_detail'

                },
                
                {
                    model:Airport,
                    required:true,
                    include:{
                        model:City
                    },
                    on:{
                        col1: Sequelize.where(Sequelize.col('Flight.departureAirportId'), "=", Sequelize.col('departureAirport.code'))
                    },
                    as:'departureAirport'
                },
                {
                    model:Airport,
                    required:true,
                    include:{
                        model:City
                    },
                    on:{
                        col1: Sequelize.where(Sequelize.col('Flight.arrivalAirportId'), "=", Sequelize.col('arrivalAirport.code'))
                    },
                    as:'arrivalAirport'
                }
            ]
        });

        return response;
    }
    async updateRemainingSeats(flightId,seats,dec=true){
        db.sequelize.query(addRowLockOnFlights(flightId));
        const flight = await Flight.findByPk(flightId);
        if(parseInt(+dec)){
            await flight.decrement('totalSeates',{by:seats});
        }else{
            await flight.increment('totalSeates',{by:seats});
        }
        return flight;
    }
    
}


module.exports = FlightRepository;