const User = require('../models/User');

function pagination(req, res, next) {

    const page = parseInt(req.query.page) - 1;
    const limit = parseInt(req.query.limit);
  
    const offset = page ? page * limit : 0;
  
    User.findAndCountAll(
      {attributes: ['id', 'name', 'login', 'avatar'],
        order: [
          ['name', 'ASC'],
        ],
        limit: limit, offset:offset })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
              "totalUsers": data.count,
              "totalPages": totalPages,
              "limit": limit,
              "currentPageNumber": page + 1,
              "currentPageSize": data.rows.length,
              "users": data.rows
        };
        res.send(response);
      });  
    }

module.exports = pagination;
