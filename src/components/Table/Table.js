import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import "./table.css";
const axios = require("axios");
const api = "http://localhost:3001";

// TODO: if filters return no values, indicate nothing matches search
export default function Table() {
  // stores default API response data
  const [data, setData] = useState("");
  // stores Alphabetically sorted restaurant data
  const [initSortedData, setInitSortedData] = useState("");
  // stores data for table to render
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statesSearchTerm, setStatesSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState(false);
  const [genresSearchTerm, setGenresSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState(false);
  const [pageNumber, setPageNumber] = useState("1");
  const [errorMessage, setErrorMessage] = useState(false);
  // fetches restaurant data, sorts it, and sets state var to sorted restaurants
  const getRestaurantData = async () => {
    let data;
    let sortedData;
    setLoading(true);
    await axios
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
          setInitSortedData(sortedData);
          console.log(sortedData);
          // populate table with first page
          setDisplayData(sortedData.slice(0, 10));
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

  function handlePagination() {
    if (pageNumber === "1") {
      setDisplayData(initSortedData.slice(0, 10));
    }
    if (pageNumber === "2") {
      setDisplayData(initSortedData.slice(10, 20));
    }
    if (pageNumber === "3") {
      setDisplayData(initSortedData.slice(20, 30));
    }
    if (pageNumber === "4") {
      setDisplayData(initSortedData.slice(30, 40));
    }
  }

  // side effect to handle filtering states
  useEffect(() => {
    if (stateFilter === true) {
      const results = displayData.filter((item) => {
        return item.state
          .toLowerCase()
          .includes(statesSearchTerm.toLowerCase());
      });
      // only display results if any were found, no results set error
      if (results.length >= 1) {
        setDisplayData(results);
      } else {
        setErrorMessage(true);
      }
    }
    // when filter is removed, maintain current page
    if (stateFilter === false) {
      handlePagination();
      setErrorMessage(false);
    }
  }, [stateFilter]);

  const handleGenresSearch = (event) => {
    setGenresSearchTerm(event.target.value);
  };

  // side effect for handling filtering by genres
  useEffect(() => {
    if (genreFilter === true) {
      const results = displayData.filter((item) => {
        return item.genre
          .toLowerCase()
          .includes(genresSearchTerm.toLowerCase());
      });
      // only display results if any were found, no results set error
      if (results.length >= 1) {
        setDisplayData(results);
      } else {
        setErrorMessage(true);
      }
    }
    // when filter is removed, maintain current page
    if (genreFilter === false) {
      handlePagination();
      setErrorMessage(false);
    }
  }, [genreFilter]);

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

  // set effect which handles pagination
  useEffect(() => {
    handlePagination();
  }, [pageNumber]);

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
                <input
                  type="checkbox"
                  id="stateFilter"
                  onChange={() => setStateFilter(stateFilter ? false : true)}
                />
                {/* <button onClick={handleStateClear}>x</button> */}
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
                <input
                  type="checkbox"
                  id="genreFilter"
                  onChange={() => setGenreFilter(genreFilter ? false : true)}
                />
                {/* <button onClick={handleGenreClear}>x</button> 8?} */}
              </th>
            </tr>
          </thead>
          {errorMessage ? (
            <tbody>
              <tr>
                <td colSpan="5">No results for this filter...</td>
              </tr>
            </tbody>
          ) : (
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
          )}
        </table>
      )}
    </>
  );
}
