const Gadget = require('../models/gadgetSchema')
const mongoose = require('mongoose')

const getGadgets = async (req,res) => {
    try{
        const gadgets = await Gadget.find({}).sort({"gadgetReviews.rating": -1})
        res.status(200).json(gadgets)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const getGadget = async(req,res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such gadget'})
  }

  const gadget = await Gadget.findById(id)

  if(!gadget){
    return res.status(404).json({error: 'No such gadget'})
  }

  return res.status(200).json(gadget)
}

const createGadget = async (req, res) => {
    const { gadgetType, gadgetBrand, gadgetName, gadgetId, gadgetImage, gadgetPrice, gadgetSpecs, gadgetReviews  } = req.body
  
    try {
      const gadget = await Gadget.create({  gadgetType, gadgetBrand, gadgetName, gadgetImage, gadgetId, gadgetPrice, gadgetSpecs, gadgetReviews  })
      res.status(200).json(gadget)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }



module.exports = {
    getGadgets,
    getGadget,
    createGadget
}