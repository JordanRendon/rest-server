const {request, response} = require ('express')
const User = require('../models/users')

const getUsers = (req = request, res = response) => {
  //url/api/users/?name=Sergio&date=2022-01-25 -> query
    const { name, date} = req.query
    req.res.status(200).json({
     msg:'Get - controller',
     name,
     date,
   })
 }

 const getUsersById = (req = request, res = response)=>{
  //ur/api/users/25 -> Segmento: El 25 entra en el id
  const id = req.params.id
  res.json({
    msg: 'get UserById',
    id,
  })
 }

 const createUsers = async (req = request, res = response) => {
    //url/api/users/ -> Body: Es el objeto en JSON
    const body = req.body
    const user = new User(body)
    await user.save()

    res.status(201).json({
      msg: 'post API - controller',
      user,
    })
  }

  const updateUsers = (req = request, res = response) => {
    const body = req.body
    const user = new User(body)
    res.json({
      msg: 'put API - controller',
      user,
    })
  }

  const deleteUsers = (req = request, res = response) => {
    const id = req.params.id
    res.json({
      msg: 'delete API - controller',
      id,
    })
  }

 module.exports = { getUsers, createUsers,updateUsers,deleteUsers, getUsersById}