const zomatoApi = require("../api/zomato")

class Controller {
    static nearby(req, res, next) {
        zomatoApi.get(`search?entity_id=74&entity_type=city&count=9&lat=-6.260050&lon=106.781672&radius=5000&sort=rating`)
            .then(function ({ data }) {
                res.status(200).json(data)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static search(req,res,next){

    }
}

module.exports = Controller