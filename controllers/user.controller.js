const {request, response} = require ('express')

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

 const createUsers = (req = request, res = response) => {
    //url/api/users/ -> Body: Es el objeto en JSON
    const {data, name,lastname,age} = req.body
    res.status(201).json({
      msg: 'post API - controller',
      data,
      name,
      lastname,
      age
    })
  }

  const updateUsers = (req = request, res = response) => {
    const id = req.params.id
    const body = req.body
    res.json({
      msg: 'put API - controller',
      id,
      body,
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