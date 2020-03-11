import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [form, setForm] = useState({});
    const [cities, setCities] = useState(null);
    const [cost, setCost] = useState(null);
    const [results, setResults] = useState(null);
    const handleInputChange = (e) => {
        console.log(e.target.id, e.target.value);
        setForm({
            ...form,
            [e.target.id]: e.target.value
        });
    };

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:3000/cities"
                );

                setCities(data.cities);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCities();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:3000/cost",
                form
            );

            const from = cities.filter((city) => {
                return city.city_id == form.kotaAsalID;
            });
            const to = cities.filter((city) => {
                return city.city_id == form.kotaTujuanID;
            });

            setResults({
                from: from[0].city_name,
                to: to[0].city_name
            });

            setCost(data.cost.results[0].costs[0].cost[0].value);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center w-screen py-4">
            <form
                className="flex flex-col w-4/12 p-4 border border-gray-500 rounded mb-4"
                onSubmit={handleSubmit}
            >
                <select
                    className="text-gray-700 py-1 mb-2"
                    onChange={handleInputChange}
                    id="kotaAsalID"
                    value={form.kotaAsalID ? form.kotaAsalID : ""}
                >
                    <option value="">Masukan kota asal</option>
                    {cities && cities.length > 0
                        ? cities.map((city) => (
                              <option value={city.city_id} key={city.city_id}>
                                  {city.city_name}
                              </option>
                          ))
                        : ""}
                </select>

                <select
                    className="text-gray-700 py-1 mb-2"
                    onChange={handleInputChange}
                    id="kotaTujuanID"
                    value={form.kotaTujuanID ? form.kotaTujuanID : ""}
                >
                    <option value="">Masukan kota tujuan</option>
                    {cities && cities.length > 0
                        ? cities.map((city) => (
                              <option value={city.city_id} key={city.city_id}>
                                  {city.city_name}
                              </option>
                          ))
                        : ""}
                </select>

                <input
                    type="text"
                    className="border-b border-gray-500 w-full mb-2 outline-none"
                    placeholder="Berat paket"
                    id="berat"
                    onChange={handleInputChange}
                />

                <input type="submit" />
            </form>
            {cost ? (
                <div className="flex flex-col w-4/12">
                    <p>Hasil (Kurir JNE)</p>
                    <p>From: {results.from}</p>
                    <p>To: {results.to}</p>
                    <p>
                        Berat:{" "}
                        {form.berat
                            ? (Number(form.berat) / 1000).toString() + "kg"
                            : ""}
                    </p>
                    <p>Price: {cost}</p>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default App;
