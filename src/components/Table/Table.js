import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import "./table.css";
const axios = require("axios");
const api = "http://localhost:3001";

// TODO: Add filters for state & genre
// TODO: Add search field
// TODO:

export default function Table() {
  // stores default API response data
  const [data, setData] = useState("");
  const [restaurantData, setRestaurantData] = useState("");
  // stores data for table to render
  const [displayData, setDisplayData] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortedStates, setSortedStates] = useState("");
  const [sortedGenres, setSortedGenres] = useState("");
  const [statesSearchTerm, setStatesSearchTerm] = useState("");
  const [genresSearchTerm, setGenresSearchTerm] = useState("");

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
          setData(data);
          // sort data alphabetically, uppercase to ensure consistency
          sortedData = data.sort((a, b) => {
            const itemA = a.name.toUpperCase();
            const itemB = b.name.toUpperCase();
            return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
          });
          console.log(sortedData);
          setDisplayData(sortedData);
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

  const handleStatesSearch = (event) => {
    setStatesSearchTerm(event.target.value.toUpperCase());
  };

  // side effect to handle filtering states
  useEffect(() => {
    if (statesSearchTerm) {
      const results = data.filter((item) => {
        return item.state
          .toLowerCase()
          .includes(statesSearchTerm.toLowerCase());
      });

      setDisplayData(results);
    }
    if (!statesSearchTerm) {
      setDisplayData(data);
    }
  }, [statesSearchTerm]);

  const handleGenresSearch = (event) => {
    setGenresSearchTerm(event.target.value);
  };

  // side effect for handling filtering by genres
  useEffect(() => {
    if (genresSearchTerm) {
      const results = data.filter((item) => {
        return item.genre
          .toLowerCase()
          .includes(genresSearchTerm.toLowerCase());
      });
      setDisplayData(results);
    }
    if (!genresSearchTerm) {
      setDisplayData(data);
    }
  }, [genresSearchTerm]);

  const handleStateClear = () => {
    setStatesSearchTerm("");
  };

  const handleGenreClear = () => {
    setGenresSearchTerm("");
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
                State{" "}
                <input
                  type="text"
                  placeholder="Search states"
                  onChange={handleStatesSearch}
                  value={statesSearchTerm}
                />
                <button onClick={handleStateClear}>x</button>
              </th>
              <th>Phone #</th>
              <th>
                Genre{" "}
                <input
                  type="text"
                  placeholder="Search genres"
                  onChange={handleGenresSearch}
                  value={genresSearchTerm}
                />
                <button onClick={handleGenreClear}>x</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, index) => (
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
