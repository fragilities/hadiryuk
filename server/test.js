const axios = require('axios')

const getCity = async() => {
    try {
        const {data} = await axios.get('https://api.rajaongkir.com/starter/city', {
            headers: {
                "key": "fc1b69c4e60e304b06c53829409b2ec2"
            }
        })
        
        const cities = data.rajaongkir.results.map(city => {
            return {
                city_id: city.city_id,
                city_name: city.city_name
            }
        })

        console.log({city0: cities[0], city1: cities[1]})
    } catch (error) {
        console.log(Object.keys(error.response.data.rajaongkir.status))
        console.log(error.response.data.rajaongkir.status.code, error.response.data.rajaongkir.status.description)
        // res.status(error.response.status).json({message: error.response.statusText})
    }
}

getCity()