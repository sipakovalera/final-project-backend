const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../config/key');
const User = require('../models/User');


class UsersService {

  get = async() => { 
    return await User.findAll();
  }

  getOne = async(id) => { 
    return await User.findOne({where:{ id : id }});
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

  update = async (updateUser, id) => {
    updateUser = await User.update(updateUser, {
        where: {
          id: id
        }
      });
      return updateUser;
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
