const handleSignin = (req, res, bcryptjs, dbaseSql) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json('Incorrect form submission')
    }
    dbaseSql('login').select('hash').where('email', email)
        .then(result => {
            if (bcryptjs.compareSync(password, result[0].hash)) {
                dbaseSql('users').where('email', email)
                    .then(user => {
                        return res.json(user[0])
                        
                    })
            }
            else {
                res.status(400).json('Username or password incorrect')
            }
        })
        .catch(err =>
            res.status(400).json('Username or password incorrect')
        )
}

module.exports = {
    handleSignin
}