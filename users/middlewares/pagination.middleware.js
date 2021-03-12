const User = require('../models/User');

function pagination(req, res, next) {
  try{
    const page = parseInt(req.query.page) - 1;
    const limit = parseInt(req.query.limit);
  
    const offset = page ? page * limit : 0;
  
    User.findAndCountAll(
      {attributes: ['id', 'name', 'login', 'avatar'],
        where: {id : id}, 
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
  }catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }    
}

module.exports = pagination;
