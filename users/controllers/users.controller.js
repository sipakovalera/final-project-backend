const { required } = require('joi');
const usersService = require('../services/users.service');
class UsersController {
  service = usersService;

  get = async ( req, res, next ) => {
    res
      .status(200)
      .json(await this.service.get())
  };

  getOne = async ( req, res, next ) => {
    res
      .status(200)
      .json(await this.service.getOne(req.params.id))
  };

  add = async ( req, res, next ) => {
    res
      .status(200)
      .json(await this.service.add(req.body))
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
