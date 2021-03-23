const Joi = require('joi');

const updateUserSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(20),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),

    login: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } }),
    
    avatar: null
});

module.exports = updateUserSchema;
