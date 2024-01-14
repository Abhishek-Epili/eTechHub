const UserDetails = require("../models/userDetailsSchema")

const createUser = async (req, res) => {
    const { username, email, profile_url } = req.body
    try {
        const query = {
            email: email
        }
        let user = await UserDetails.find(query,{})
        if(user.length==0){
            user = await UserDetails.create({username, email, profile_url})
            res.status(200).json({msg: "New User Logged in successfully!"})
        }
        else{
            res.status(200).json({msg: "Logged in successfully!"})
        }
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