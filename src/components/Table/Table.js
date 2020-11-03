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

  const handleStatesSearch = (event) => {
    setStatesSearchTerm(event.target.value.toUpperCase());
  };

  useEffect(() => {
    if (statesSearchTerm) {
      const results = data.filter((item) => {
        console.log(item.state);
        return item.state.toUpperCase() === statesSearchTerm;
      });

      console.log(results);
      setDisplayData(results);
    }
    if (!statesSearchTerm) {
      setDisplayData(data);
    }
  }, [statesSearchTerm]);

  const handleGenresSearch = (event) => {
    setGenresSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (genresSearchTerm) {
      const results = data.filter((item) => {
        console.log(item.state);
        return item.genre.toUpperCase().includes(genresSearchTerm);
      });
      setDisplayData(results);
      console.log(results);
    }
    if (!genresSearchTerm) {
      setDisplayData(data);
    }
  }, [genresSearchTerm]);

  // useEffect(() => {
  //   if (statesSearchTerm || genresSearchTerm === "") {
  //     setDisplayData(data);
  //   }
  //   console.log(`state term => ${statesSearchTerm}`);
  //   console.log(`genre term => ${genresSearchTerm}`);
  // }, [statesSearchTerm, genresSearchTerm]);

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
