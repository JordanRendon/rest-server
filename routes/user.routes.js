const { Router } = require('express')
const {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  getUsersById,
} = require('../controllers/user.controller')

const router = Router()

router.get('/', getUsers)

router.get('/:id', getUsersById)

router.post('/', createUsers)

router.put('/:id', updateUsers)

router.delete('/:id', deleteUsers)

module.exports = router
