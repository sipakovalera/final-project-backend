import express from 'express';
const router = express.Router();
const controller = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const upload = require('../middlewares/upload.middleware');
const createUserSchema = require('../validation-schemas/create-user.schema');
const updateUserSchema = require('../validation-schemas/update-user.schema');

router
  .get('/', auth, controller.get )
  .get('/:id', auth, controller.getOne )
  .get('/:id/friends', auth, controller.getFriends )
  .put('/friends', auth, controller.getFriend)
  .post('/:id/friend', controller.addFriend )
  .post('/register', validate(createUserSchema), controller.add )
  .delete('/:id', auth, controller.delete)
  .delete('/:id/remove', auth, controller.deleteFriend)
  .post('/avatar/:id', upload, controller.avatar)
  .put('/:id', auth, validate(updateUserSchema), controller.update)
  .put('/:id/password', auth, validate(updateUserSchema), controller.updatePassword)
  .post('/login', controller.login);
  
 export default router;
