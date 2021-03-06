const User = require("../models/user");
const Temporal = require("../models/temporal");
const sec= require("./sec.controller");
const temporal = require("../models/temporal");
const userCtrl = {};

userCtrl.getUsers = async (req, res, next) => {
  const users = await User.find();
  res.json(req.param('a'));
};

userCtrl.createUser = async (req, res, next) => {
  const users = await User.find();

  const user = new User({
    name: req.body. name,
    phonenumber: req.body.phonenumber ,
    email: req.body.email ,
    password: req.body.password,
    strikes: req.body.strikes,
    type: req.body.type,
    status: req.body.status,
    idprocesses: req.body.idprocesses,
    idsession: req.body.idsession,
    idpublications: req.body.idpublications,
  });
  if (users.find((x)=>{if(x.email==user.email){return x}})==null){
    let a =await user.save();
    
    let temporal = new Temporal({
      name: a.name,
      email: a.email ,
      type: a.type,
      status: a.status,
      iduser:a._id
    });
    temporal= await temporal.save();
    res.json(temporal);

  }
  else{
    res.json({ status: "Correo ya en uso" });
  }

  
};

userCtrl.getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
};

userCtrl.editUser = async (req, res, next) => {
  
  const { id } = req.params;
  b= await sec.activeId(id)
  if (b==undefined){
    a= {
      code:001,
      err:"Datos o usuario inexistente"
    }
    res.json(a);
  }else{
    var user = await User.findById(b.iduser)
    user.email=req.body.email
    user.name=req.body.name
    user.phonenumber=req.body.phonenumber
    await User.findByIdAndUpdate(user._id, user, {new: true});
    res.json({ status: "User Updated" });
  }
};

userCtrl.deleteUser = async (req, res, next) => {
  await User.findByIdAndRemove(req.params.id);
  res.json({ status: "User Deleted" });
};

userCtrl.confirm = async (req, res, next) => {
  const users = await User.find();
  var us= users;

  const user = new User({
    email: req.body.email ,
    password: req.body.password,
  });
  let a= await sec.userJoin(user)

  exist=a==undefined? false:true;
  let temporal
  if(exist){
    temporal = new Temporal({
      name: a.name,
      email: a.email ,
      type: a.type,
      status: a.status,
      iduser:a._id
    });
    temporal= await temporal.save();
    temporal.iduser=undefined
  }
  else{
    temporal= {
      code:001,
      err:"Datos o usuario inexistente"
    }
  }
  res.json(temporal);
};

module.exports = userCtrl;