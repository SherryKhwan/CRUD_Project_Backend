const Joi = require("joi");
const { handleValidationError } = require("../lib/utils");

class RecordValidations {
  constructor() { }

  static validateSchema(req, res, next) {
    const schema = Joi.object({
      developerName: Joi.string().required(),
      projectName: Joi.string().required(),
      unit: Joi.string().required(),
      unitType: Joi.string().required(),
      level: Joi.string().required(),
      location: Joi.string().required(),
      exposure: Joi.string().required(),
      size: Joi.string().required(),
      bedCount: Joi.number().required(),
      bathCount: Joi.number().required(),
      needParking: Joi.boolean().required(),
      needLocker: Joi.boolean().required(),
      needBalcony: Joi.boolean().required(),
    });
    const { error, value } = schema.validate(req.body);

    if (error && error.details) {
      handleValidationError(res, {
        code: 403,
        message: error,
      });
    } else {
      next();
    }
  }

  static validateSchemaToUpdate(req, res, next) {
    const schema = Joi.object({
      developerName: Joi.string().optional(),
      projectName: Joi.string().optional(),
      unit: Joi.string().optional(),
      unitType: Joi.string().optional(),
      level: Joi.string().optional(),
      location: Joi.string().optional(),
      exposure: Joi.string().optional(),
      size: Joi.string().optional(),
      bedCount: Joi.number().optional(),
      bathCount: Joi.number().optional(),
      needParking: Joi.boolean().optional(),
      needLocker: Joi.boolean().optional(),
      needBalcony: Joi.boolean().optional(),
    });
    const { error, value } = schema.validate(req.body);

    if (error && error.details) {
      handleValidationError(res, {
        code: 403,
        message: error.details[0].message,
      });
    } else {
      next();
    }
  }
}

module.exports = RecordValidations;
