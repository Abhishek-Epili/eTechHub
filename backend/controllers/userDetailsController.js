const UserDetails = require("../models/userDetailsSchema")

const createUser = async (req, res) => {
    const { username, password, contact } = req.body
    try {
        const user = await UserDetails.create({ username, password, contact })
        res.status(200).json(user)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const checkUser = async (req, res) => {
    const { username, password } = req.body
    query = {
        username: username,
        password: password
    }
    const user = await UserDetails.find(query, {})
    if (user.length!==0) {
        res.status(200).json({ msg: "User exists!" })
    }
    else {
        res.status(401).json({ msg: "User Not Found!" })
    }
}

module.exports = {
    createUser,
    checkUser
}