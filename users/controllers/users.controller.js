const User = require('../models/User');
const usersService = require('../services/users.service');
class UsersController {
  service = usersService;

  get = async ( req, res, next ) => {
    try {
      const result = await this.service.get(req.query.page, req.query.limit, req.query.sortBy, req.query.filter)
       res.status(200).json(result)
     } catch(error) {
        res.status(500).send({
        message: "Error -> Can NOT complete a paging request!",
        error: error.message,
      });
     }
   }

  getOne = async ( req, res, next ) => {
    res
      .status(200)
      .json(await this.service.getOne(req.params.id))
  };

  getFriends = async ( req, res, next ) => {
    res
      .status(200)
      .json(await this.service.getFriends(req.params.id))
  }

  getFriend = async ( req, res, next ) => {
    res
      .status(200)
      .json(await this.service.getFriend(req.body.friendId))
  };

  add = async ( req, res, next ) => {
    res
      .status(200)
      .json(await this.service.add(req.body))
  };

  addFriend = async ( req, res, next ) => {
    res
      .status(200)
      .json(await this.service.addFriend(req.params.id, req.body))
  };

  update = async ( req, res, next ) => {
    res
      .status(200)
      .json(await this.service.update(req.body, req.params.id, req.file));
  };

  avatar = async ( req, res, next ) => {
    res
      .status(200)
      .json(await this.service.avatar(req.body, req.params.id, req.file));
  };

  delete = (req, res, next ) => {
    res
      .status(200)
      .send(this.service.delete(req.params.id));
  };

  login = async (req, res, next ) => {
    res
      .status(200)
      .send(await this.service.login(req.body.login, req.body.password));
  };
  
}

module.exports = new UsersController();
