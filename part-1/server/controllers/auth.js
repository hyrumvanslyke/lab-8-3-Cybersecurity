const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      let {username, password} = req.body
        let checkUser = users.filter((user) => user.username === username)
        if(checkUser.length !== 0){
            let validPassword = bcrypt.compareSync(password, checkUser[0].hashedPass)
            if(validPassword){
                return res.status(200).send('Successfully logged in!')
            }else{
                return res.status(401).send("password incorrect.")
            }
        }else{
            res.status(401).send("No user foud by that name.")
        }
    },
    register: (req, res) => {
      let{username, password} = req.body
      let salt = bcrypt.genSaltSync(10)
      let hashedPass = bcrypt.hashSync(password, 10)
      console.log(hashedPass)
      let newUser ={
          username: username,
          hashedPass: hashedPass
      }
      username.push(newUser)
      res.status(200).send(newUser)
    }
}