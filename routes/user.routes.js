const { Router } = require('express')
const {check} = require('express-validator')

const {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  getUsersById,
} = require('../controllers/user.controller')
const { validateFields } = require('../middlewares/validate-fields')
const { isValidRole, emailExists, userByIdExists } = require('../helpers/db-validators')

const router = Router()

router.get('/', getUsers)

router.get('/:id', getUsersById)

router.post('/', [
  check('name','El nombre es obligatorio').not().isEmpty(),
  check('email','El email es requerido').not().isEmpty(),
  check('email', 'El correo no es valido').isEmail(),
  check('email').custom(emailExists),
check('password','La contraseña es obligatoria').not().isEmpty(),
check('password','La contraseña debe tener 6 caracteres o mas').isLength({min:6}),
// check('password','La contraseña no es fuerte').isStrongPassword()
check('role','El rol es requerido').not().isEmpty(),
check('role','El rol no es valido, debe ser ADMIN_ROLE o USER_ROLE').isIn([
  'ADMIN_ROLE','USER_ROLE'
]),
check('role').custom(isValidRole),
validateFields,
],createUsers)

router.put('/:id', [
  check('id', 'El ID no es valido').isMongoId(),
  check('id').custom(userByIdExists),
  validateFields,
],updateUsers)

router.delete('/:id', [
  check('id', 'El ID no es valido').isMongoId(),
  check('id').custom(userByIdExists),
  validateFields,
],deleteUsers)

module.exports = router
