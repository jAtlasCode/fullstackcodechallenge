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
  const [initSortedData, setInitSortedData] = useState("");
  // const [restaurantData, setRestaurantData] = useState("");
  // stores data for table to render
  const [displayData, setDisplayData] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortedStates, setSortedStates] = useState("");
  const [sortedGenres, setSortedGenres] = useState("");
  const [statesSearchTerm, setStatesSearchTerm] = useState("");
  const [genresSearchTerm, setGenresSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

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
          setInitSortedData(data);
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
    function setPagination() {}
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

  // filter clearing event handlers
  const handleStateClear = () => {
    setStatesSearchTerm("");
  };

  const handleGenreClear = () => {
    setGenresSearchTerm("");
  };

  const handlePageChange = (event) => {
    setPageNumber(event.target.value);
  };

  // side effect to handle pagination
  // todo: seems that .splice() is mutating the initDataObject
  useEffect(() => {
    // const maxItemsPerPage = 10;
    let firstPage = [];
    let secondPage = [];
    let thirdPage = [];
    let fourthPage = [];
    if (pageNumber === "1") {
      firstPage = initSortedData.splice(0, 10);
      console.log(firstPage);
      setDisplayData(firstPage);
      setInitSortedData(data);
    }
    if (pageNumber === "2") {
      secondPage = initSortedData.splice(10, 10);
      console.log(secondPage);
      setDisplayData(secondPage);
      setInitSortedData(data);
    }
    if (pageNumber === "3") {
      thirdPage = initSortedData.splice(20, 10);
      console.log(thirdPage);
      setDisplayData(thirdPage);
      setInitSortedData(data);
    }
    if (pageNumber === "4") {
      fourthPage = initSortedData.splice(30, 10);
      console.log(fourthPage);
      setDisplayData(fourthPage);
      setInitSortedData(data);
    }
    console.log(pageNumber);
  }, [pageNumber, initSortedData, data]);

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
            <tr>
              <td className="ButtonCell">
                <button value="1" onClick={handlePageChange}>
                  1
                </button>
                <button value="2" onClick={handlePageChange}>
                  2
                </button>
                <button value="3" onClick={handlePageChange}>
                  3
                </button>
                <button value="4" onClick={handlePageChange}>
                  4
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}
