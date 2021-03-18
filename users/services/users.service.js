const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../config/key');
const User = require('../models/User');
const Friends = require('../models/Friends');
const { Op, where } = require('sequelize')

class UsersService {

  get = async(currentPage, currentLimit, sortBy, filter) => {
     
    const page = parseInt(currentPage) - 1;
    const limit = parseInt(currentLimit);
    const offset = page ? page * limit : 0;

    if(filter === 'avatar'){
      return await User.findAndCountAll({
        attributes: ['id', 'name', 'login', 'avatar'], 
        limit: limit, 
        offset: offset,
        where: {
          "avatar": {[Op.ne]: ""}
        }
      })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
              "totalUsers": data.count,
              "totalPages": totalPages,
              "users": data.rows
        };
        return response
      });
    }

    if(sortBy === 'name'){
      return await User.findAndCountAll({
        attributes: ['id', 'name', 'login', 'avatar'], 
        limit: limit, 
        offset: offset,
        order: [['name', 'ASC']] 
      })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
              "totalUsers": data.count,
              "totalPages": totalPages,
              "users": data.rows
        };
        return response
      });
    }

    if(sortBy === 'last'){
      return await User.findAndCountAll({
        attributes: ['id', 'name', 'login', 'avatar'], 
        limit: limit, 
        offset: offset, 
        order: [['id', 'DESC']] 
      })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
              "totalUsers": data.count,
              "totalPages": totalPages,
              "users": data.rows
        };
        return response
      });
    }

    return await User.findAndCountAll(
      {
        attributes: ['id', 'name', 'login', 'avatar'], 
        limit: limit, 
        offset: offset,
        
      })
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
        return response
      });
  }

  getOne = async(id) => { 
    return await User.findOne({where:{ id : id }});
  }

  getFriends = async(id) => {
    return await Friends.findAll({where: {userId: id}})
  }

  getFriend = async(friendId) => { 
    return await User.findAll({where:{ id : friendId }});
  }

  add = async(user) => {
    const salt = await bcrypt.genSalt(10);
    return await User.create({
      id: user.id,
      name: user.name,
      login: user.login,
      password:await bcrypt.hash(user.password, salt),
      avatar: user.avatar
    })
  }

  addFriend = async(id, friend) => {
    return await Friends.create({
      userId: friend.userId,
      friendId: friend.friendId
    }, {
      where: {
        id: id
      }
    })
  }

  update = async (updateUser, id) => {
    updateUser = await User.update(updateUser, {
        where: {
          id: id
        }
      });
      return updateUser;
    }

  updatePassword = async (password, id) => {
    const newPassword = await bcrypt.hash(password, 10);
    return await User.update(newPassword, {
      where: {
        id: id
      }
    });
  }

 avatar = async (updateUser, id, file) => {
   updateUser.avatar = file.filename;
    updateUser = await User.update(updateUser, { 
        where: {
          id: id
        }
      });
      return updateUser;
    }

  delete = async(id) => {
    return await User.destroy({
      where: {
        id: id
      }
    })
  }

  deleteFriend = async(id) => {
    return await Friends.destroy({
      where: {
        friendId: id
      }
    })
  }

  login = async (login, password) => {
    const user = await User.findOne({where:{ login : login }});
      if (!user){
        console.log(`User is not found`); 
      } else {
        const passwordByUser = await bcrypt.compare(password, user.password);
        if(passwordByUser){
          const token = jwt.sign({
            id: user.id         
          }, secret, { expiresIn: '12.5hrs' });
          console.log(token);       
            return {token, user};
        } else {
          console.log('Invalid password');
        }
      }
  }
}
module.exports = new UsersService();
