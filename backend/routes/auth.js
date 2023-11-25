const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');


//create a user using : POST "\api/auth"
router.post('/',[
   body('name', 'Enter a Valid Name').isLength({ min: 4 }),
   body('email', 'Enter a valid email').isEmail(),
   body('password', ' Password must contains atleast 8 latters').isLength({ min: 8})
], (req,res) => {
   // console.log(req.body);
   // const user = User(req.body);
   // user.save()
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
   User.create({
      name:req.body.name,
      password: req.body.password,
      email: req.body.email,
   }).then(user => res.json(user))
   .catch(err =>{console.log(err)
   res.json({Error : "please enter a unique value for email", message : err.message})});
})

module.exports = router