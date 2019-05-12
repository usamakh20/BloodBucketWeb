var express = require('express');
var router = express.Router();
const user = require('../model/user');
const jwt = require('jsonwebtoken');

const auth = function (req,res,next) {
  try {
    req.UserData = jwt.verify(req.headers.authorization, process.env.PWD);
    console.log(req.UserData);
    next()
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'auth failed'
    });
  }
};

router.post('/register',function (req,res) {
  new user({
    phoneNumber: req.body.phoneNumber,
    name: req.body.name,
    password: req.body.password,
    address: req.body.address,
    type:req.body.type === 'individual'
  }).save(function(err, savedUser) {
    if (err) {
      console.log(err);
      return res.status(500).send({message: 'error'});
    }
    return res.status(200).send({message: 'success'});
  });
});

router.post('/login',function (req,res) {
  user.findOne({phoneNumber:req.body.phoneNumber},function(err,user) {
    if (err)
      return res.status(500).send({message: 'server error'});

    else if(!user)
      return res.status(404).send({message:'user not found'});

    else
    // test a password with stored hash
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch) {
          const token = jwt.sign({
            Donor:user,
          },process.env.PWD,{
            expiresIn: "1h"
          });
          return res.status(200).send({message: "success",token:token});
        }

        else return res.status(401).send({message:'incorrect password'});
      });
  })
});

router.get('/donors',auth,function (req,res) {
  entrants.find({ bloodGroup: { $ne: null } },function (err,users) {
    res.status(200).send(users)
  })
});


module.exports = router;
