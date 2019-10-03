
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
        zomatoApi.get(`locations?query=${req.body.city}`)
            .then(function ({data}){
                let cityId = data.location_suggestions[0].entity_id
                return zomatoApi.get(`search?entity_id=${cityId}&entity_type=city&count=12&sort=rating&q=${req.body.food}`)
            })
            .then( ({data}) => {
                res.status(200).json(data)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }
}

module.exports = Controller