
const updateFavorites = (req, res, dbaseSql) => {
    const { id, favorites } = req.body

    dbaseSql('users').where('id', id)
        .update({ 'favorites': favorites })
        .returning('favorites')
        .then(entry => {
            res.json(entry[0])
        })
        .catch(err =>
            res.status(404).json('Unable to update entries')
        )
}


module.exports = {
    updateFavorites,
}