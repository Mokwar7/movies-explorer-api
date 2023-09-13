const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const { getMyInfo, updateMyInfo } = require('../controllers/user');

router.get('/me', getMyInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
  }),
}), updateMyInfo);

module.exports = router;
