const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const pagination = require('../middlewares/pagination.middleware');
const upload = require('../middlewares/upload.middleware');
const createUserSchema = require('../validation-schemas/create-user.schema');
const updateUserSchema = require('../validation-schemas/update-user.schema');

router
  .get('/', pagination, controller.get )
  .get('/:id', controller.getOne )
  .post('/register', validate(createUserSchema), controller.add )
  .delete('/:id', controller.delete)
  .post('/avatar/:id', upload, controller.avatar)
  .put('/:id', validate(updateUserSchema), controller.update)
  .post('/login', controller.login);
  
module.exports = router;
