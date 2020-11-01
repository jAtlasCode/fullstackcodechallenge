import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import "./table.css";
const axios = require("axios");
const api = "http://localhost:3001";

export default function Table() {
  const [restaurantData, setRestaurantData] = useState("");
  const [loading, setLoading] = useState(null);

  const getRestaurantData = () => {
    setLoading(true);
    axios
      .get(`${api}/restaurants`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setRestaurantData(response.data);
        }
      })
      .then((error) => {
        if (error) {
          console.log(error);
        }
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getRestaurantData();
    console.log(restaurantData);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <table className="RestaurantTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>State</th>
              <th>Phone #</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}
