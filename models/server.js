const express = require('express')
const cors = require('cors')
const {dbConnection} = require('../database/config.db')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      users: '/api/users'
    }
   

    //Conectar a base de datos
    this.conectarBD()

    //Middlewares
    this.middlewares()

    //Rutas de mi app
    this.routes()
  }

  conectarBD(){
    dbConnection()
  }

  middlewares() {
    //CORS
    this.app.use(cors())

    //Lectura y parseo del body
    this.app.use(express.json())

    //Directorio publico
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.paths.users, require('../routes/user.routes'))
    this.app.use(this.paths.categories, require('../routes/category.routes'))
    this.app.use(this.paths.auth, require('../routes/auth.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App escuchando en http://localhost:${this.port}`)
    })
  }
}

module.exports = Server
