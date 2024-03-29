const {StatusCodes} = require('http-status-codes');
const { ErrorResponse } = require('../utils/common/index');
const AppError = require('../utils/errors/app-error');
function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber){
        ErrorResponse.message = ' Something went wrong while creating arplane ';
        ErrorResponse.error = new AppError(['Model number not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);

        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req,res,next){
    if(!req.body.modelNumber){
        ErrorResponse.message = ' Something went wrong while updating arplane ';
        ErrorResponse.error = new AppError(['Model number not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);

        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.capacity){
        ErrorResponse.message = ' Something went wrong while updating arplane ';
        ErrorResponse.error = new AppError(['capacity not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);

        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    
    next();
}


module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}