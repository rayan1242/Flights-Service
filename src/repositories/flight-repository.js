const CrudRepository = require('./crud-repository')
const { Flight,Airplane,Airport,City} = require('../models')
const { Sequelize } = require('sequelize');

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

}

module.exports = FlightRepository;