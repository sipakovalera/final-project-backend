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
    try {
      res
      .status(200)
      .json(await this.service.getOne(req.params.id))
    } catch(e) {
      res.status(400).send({ error: e.message });
    }
  };

  getFriends = async ( req, res, next ) => {
    try {
      res
      .status(200)
      .json(await this.service.getFriends(req.params.id))
    } catch(e) {
      res.status(400).send({ error: e.message });
    }
  }

  getFriend = async ( req, res, next ) => {
    try {
      res
      .status(200)
      .json(await this.service.getFriend(req.body.friendId))
    } catch(e) {
      res.status(400).send({ error: e.message });
    }
  };

  add = async ( req, res, next ) => {
    try {
      res
      .status(200)
      .json(await this.service.add(req.body))
    } catch(e) {
      res.status(400).send({ error: e.message });
    }
  };

  addFriend = async ( req, res, next ) => {
    try {
      res
      .status(200)
      .json(await this.service.addFriend(req.params.id, req.body))
    } catch(e) {
      res.status(400).send({ error: e.message });
    }
  };

  update = async ( req, res, next ) => {
    try {
      res
      .status(200)
      .json(await this.service.update(req.body, req.params.id, req.file));
    } catch(e) {
      res.status(400).send({ error: e.message });
    }
  };

  avatar = async ( req, res, next ) => {
    try {
      res
      .status(200)
      .json(await this.service.avatar(req.body, req.params.id, req.file));
    } catch(e) {
      res.status(400).send({ error: e.message });
    }
  };

  updatePassword = async ( req, res, next ) => {
    try {
      res
      .status(200)
      .json(await this.service.updatePassword(req.body.password));
    } catch(e) {
      res.status(400).send({ error: e.message });
    }
  };

  delete = (req, res, next ) => {
    try { 
      res
      .status(200)
      .send(this.service.delete(req.params.id));
    } catch(e) {
      res.status(400).send({ error: e.message });
    }
  };

  deleteFriend = (req, res, next ) => {
    try {
      res
      .status(200)
      .send(this.service.deleteFriend(req.params.id));
    } catch(e) {
      res.status(400).send({ error: e.message });
    }
  };

  login = async (req, res, next ) => {
    try {
      res
      .status(200)
      .send(await this.service.login(req.body.login, req.body.password));
    } catch(e) {
      res.status(400).send({ error: e.message });
    }
  };
  
}

module.exports = new UsersController();
