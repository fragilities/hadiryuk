const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const RajaOngkirAPIKey = "fc1b69c4e60e304b06c53829409b2ec2";
const qs = require("querystring");

app.listen(port, () =>
    console.log(`Express server is running on port ${port}`)
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/cities", async (req, res) => {
    try {
        const { data } = await axios.get(
            "https://api.rajaongkir.com/starter/city",
            {
                headers: {
                    key: RajaOngkirAPIKey
                }
            }
        );

        const cities = data.rajaongkir.results.map((city) => {
            return {
                city_id: city.city_id,
                city_name: city.city_name
            };
        });

        res.status(200).json({ cities });
    } catch (error) {
        res.status(error.response.data.rajaongkir.status.code).json({
            message: error.response.data.rajaongkir.status.description
        });
    }
});

app.post("/cost", async (req, res) => {
    try {
        const { kotaAsalID, kotaTujuanID, berat } = req.body;

        console.log(kotaAsalID, typeof kotaTujuanID, typeof berat);
        if (!kotaAsalID || !kotaTujuanID || !berat) {
            res.status(400).json({
                message: "Bad request: All fields cannot be empty"
            });
        }

        const inputs = {
            origin: kotaAsalID,
            destination: kotaTujuanID,
            weight: +berat,
            courier: "jne"
        };

        console.log(inputs);

        const { data } = await axios({
            method: "post",
            url: "https://api.rajaongkir.com/starter/cost",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                key: RajaOngkirAPIKey
            },
            data: qs.stringify(inputs)
        });

        res.status(200).json({ cost: data.rajaongkir });
    } catch (error) {
        res.status(error.response.data.rajaongkir.status.code).json({
            message: error.response.data.rajaongkir.status.description
        });
    }
});
