const { request, response } = require('express')

const Category = require('../models/category')

const getCategories = async (req = request, res = response) => {
    //url/api/categories/?name=Sergio&date=2022-01-25 -> query
    try {
      let { from = 0, lot = 5} = req.query
      from = from <= 0 || isNaN(from) ? 0 : from - 1
  
      const query = {status: true}
      const [categories, total] = await Promise.all([
         Category.find(query).skip(from).limit(lot),
         Category.countDocuments(query)
      ])
  
      req.res.status(200).json({
        total,
       categories,
       from: from + 1,
       lot: Number(lot),
      })
  
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: 'Error en el servidor',
      })
    }
  }

  const createCategory = async (req = request, res = response) => {
    //url/api/categories/ -> Body: Es el objeto en JSON
    try {
        const name = req.body.name.trim().toUpperCase()

        const categoryBD = await Category.findOne({name})
        if(categoryBD){
           return res.status(400).json({
                msg: `La categoria ${name} ya exite en la BS`
            })
        }

        const data = {
            name,
            user: req.authenticateUser,
        }
   const category = new Category(data)
  
    await category.save()

    res.status(201).json({
        category,
    })
    } catch(error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error en el servidor',
        })
    }
}

const updateCategory = async (req = request, res = response) => {
    try {
      const id = req.params.id
      const { status } = req.body
  
      const category = await Category.findByIdAndUpdate(id, data, { new: true })
  
      res.json({
        category,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: 'Error en el servidor',
      })
    }
  }
  
  module.exports = {
    getCategories,
    createCategory,
    updateCategory
  }