const Joi = require('joi');

const createUserSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
        .required(),
        
    login: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .required(),
    
    avatar: Joi.string()
})

module.exports = createUserSchema;
