import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import "./table.css";
const axios = require("axios");
const api = "http://localhost:3001";

// TODO: Add filters for state & genre
// TODO: Add search field

export default function Table() {
  const [restaurantData, setRestaurantData] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortedStates, setSortedStates] = useState("");
  const [sortedGenres, setSortedGenres] = useState("");

  // fetches restaurant data, sorts it, and sets state var to sorted restaurants
  const getRestaurantData = () => {
    let data;
    let sortedData;
    setLoading(true);
    axios
      .get(`${api}/restaurants`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          data = response.data.data;
          // sort data alphabetically, uppercase to ensure consistency
          sortedData = data.sort((a, b) => {
            const itemA = a.name.toUpperCase();
            const itemB = b.name.toUpperCase();
            return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
          });
          console.log(sortedData);
          setRestaurantData(sortedData);
        }
      })
      .then((error) => {
        if (error) {
          console.log(error);
        }
      })
      .then(() => {
        if (data) {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    getRestaurantData();
  }, []);

  const handleStateSort = () => {
    let sorted;
    sorted = restaurantData.sort((a, b) => {
      const stateA = a.state.toUpperCase();
      const stateB = b.state.toUpperCase();
      return stateA < stateB ? -1 : stateA > stateB ? 1 : 0;
    });
    console.log(sorted);
    setSortedStates(sorted);
  };

  const handleGenreSort = () => {
    let sorted;
    sorted = restaurantData.sort((a, b) => {
      const genreA = a.genre.toUpperCase();
      const genreB = b.genre.toUpperCase();
      return genreA < genreB ? -1 : genreA > genreB ? 1 : 0;
    });
    console.log(sorted);
    setSortedGenres(sorted);
  };

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
              <th>
                State <button onClick={handleStateSort}>sort</button>
              </th>
              <th>Phone #</th>
              <th>
                Genre <button onClick={handleGenreSort}>sort</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {restaurantData.map((row, index) => (
              <tr key={row.id} index={index}>
                <td>{row.name}</td>
                <td>{row.city}</td>
                <td>{row.state}</td>
                <td>{row.telephone}</td>
                <td>{row.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
