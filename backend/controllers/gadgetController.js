const Gadget = require('../models/gadgetSchema')
const mongoose = require('mongoose')

const getGadgets = async (req, res) => {
  const projection = { _id: 1, gadgetBrand: 1, gadgetImage: 1, gadgetType: 1, gadgetName: 1, gadgetPrice: 1, rating: 1, buy_links: 1, createdAt: 1 };
  try {
    const gadgets = await Gadget.find({},projection).sort({createdAt: 1});
    res.status(200).json(gadgets)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getGadget = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such gadget' })
  }

  const gadget = await Gadget.findById(id)

  if (!gadget) {
    return res.status(404).json({ error: 'No such gadget' })
  }

  return res.status(200).json(gadget)
}

const updateGadget = async (req, res) => {
  const { id } = req.params
  const {gadgetType, gadgetBrand, gadgetName, gadgetImage, gadgetPrice, gadgetSpecs, rating, buy_links} = req.body
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such gadget' })
  }
  
  const gadget = await Gadget.findByIdAndUpdate(id,
    {gadgetType, gadgetBrand, gadgetName, gadgetImage, gadgetPrice, gadgetSpecs, rating, buy_links},
    { new: true });

  if (!gadget) {
    return res.status(404).json({ error: 'No such gadget' })
  }

  return res.status(200).json(gadget)
}

const createGadget = async (req, res) => {
  const {gadgetType, gadgetBrand, gadgetName, gadgetImage, gadgetPrice, gadgetSpecs, rating, buy_links} = req.body

  try {
    const gadget = await Gadget.create({ gadgetType, gadgetBrand, gadgetName, gadgetImage, gadgetPrice, gadgetSpecs, rating, buy_links })
    res.status(200).json(gadget)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getGadgets,
  getGadget,
  createGadget,
  updateGadget
}