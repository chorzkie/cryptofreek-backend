const profileGet = (req, res, dbaseSql) => {
    const { id } = req.params
    dbaseSql('users').where('id', id)
        .then(user => {
            if (user.length == 0) {
                return res.status(400).json('User not found')
            }
            else {
                console.log(user)
                return res.json(user[0])
            }
        })
        .catch(err =>
            res.status(400).json(err)
        )
}

module.exports = {
    profileGet
}