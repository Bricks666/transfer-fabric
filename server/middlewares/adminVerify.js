const { ApiError } = require("../services")

module.exports = (req, res, next) => {
  try {
    const {user}  = req.body

    if(!user.isAdmin) {
      throw ApiError.NoAccess()
    }

    next()
  } catch (e) {
    next(e)
  }
}
