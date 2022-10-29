const {Schema, model} = require('mongoose')

const CategorySchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    status:{
        type: Boolean,
        default: true,
    },
})

CategorySchema.methods.toJSON = function(){
    const {__v, _id,...category} = this.toObject()
    category.id = _id
    return category
}

module.exports= model('category',CategorySchema)