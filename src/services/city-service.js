const {StatusCodes} =  require('http-status-codes');
const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error')

const cityRepository = new CityRepository();

async function createCity(data){
    try{
        const city = await cityRepository.create(data);
        return city;
    } catch(error){
        if(error.name = 'SequelizeValidationError' ){
            let explanation = [];
            error.errors.forEach((err) =>{
                explanation.push(err.message);
                console.log(error);
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new city]',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try{
        const response = await cityRepository.destroy(id);
        return response;
    } catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested to delete is not present',error.StatusCodes);
        }
        throw new AppError('Cannot fetch data of the city',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function updateCity(data,id){
    try{
        
        const airplane = await cityRepository.update(data,id);
        return airplane;
    } catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("the city does not exists",error.StatusCodes);
        }
        if(error.name = 'SequelizeValidationError' ){
            let explanation = [];
            error.errors.forEach((err) =>{
                explanation.push(err.message);
                console.log(error);
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Not able to fectch data of the city',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

module.exports = {
    createCity,
    destroyCity,
    updateCity
}