const handleSignup = (req, res, bcryptjs, dbaseSql) => {
    const { displayName, email, password } = req.body

    if (!displayName || !email || !password) {
        return res.status(400).json('Incorrect form submission')
    }
    const hashedPasswd = bcryptjs.hashSync(password)
    dbaseSql.transaction(trx => {
        trx('login')
            .insert({
                hash: hashedPasswd,
                email: email,
            })
            .returning('idlogin')
            .then( returnedId => {
                return trx('users')
                    .insert({
                        displayName: displayName,
                        email: email,
                        joined: new Date(),
                        idlogin: returnedId[0],
                    })
                    .returning('*')
                    .then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err =>
            res.status(400).json('Unable to register')
        )
}

module.exports = {
    handleSignup
}