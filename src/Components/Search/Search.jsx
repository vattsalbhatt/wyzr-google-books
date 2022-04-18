import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recentSearchResults } from "../../Redux/Search/action";
import { AllBooks } from "../Books/AllBooks";
import styled from "styled-components";
import { Home } from "../Home/Home";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Saving the key to DB
//Api call
//Redux // All books component Reused

export const Search = () => {
  //Styled Components
  const SearchBooksDiv = styled.div`
    margin: auto;
    margin-top: 10px;
    margin-bottom: 30px;
    display: grid;
    grid-template-columns: repeat(3, 30%);

    .allBooksDiv {
      margin: auto;
    }
  `;

  //Logics and Calls
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [key, setKey] = useState(null);
  const [user, setUser] = useState(false);

  const dispatch = useDispatch(); //Redux dispatch

  //Getting data from current redux store state
  const { searchResults } = useSelector((store) => store.searchResults);

  useEffect(() => {
    checkLogin();
  }, []);

  //checkLogin
  const checkLogin = () => {
    //get local user Data and change login status
    const userData = JSON.parse(localStorage.getItem("loginWyzrUser")) || "";

    //if available then change set login status to true
    if (!userData.accessToken) {
      alert("Please Login First");
      navigate("/"); // if user not logged in then redirected to home
    } else {
      setUser(true); // console.log("Token available");
    }
  };

  const handleChange = (e) => {
    // console.log("seach Term", e);
    setKey(e);
  };

  const saveTerm = () => {
    setLoading(true);
    const userData = JSON.parse(localStorage.getItem("loginWyzrUser"));

    if (userData) {
      axios
        .post(
          `http://wyzrgooglecrud-env-1.eba-jhvyc2cu.ap-south-1.elasticbeanstalk.com/searchterms`,
          {
            searchKey: key,
          }
        )
        .then((res) => {
          localStorage.setItem(
            "wzrCurUserKey",
            JSON.stringify(res.data.result._id)
          );
        })
        .catch((err) => console.log("err", err));
    }
  };

  //vattsal key --> AIzaSyB6j1H1_1Qhpg-bGxi08tAb9lYvLLWHE6c
  //photogreen key --> AIzaSyCuw9lfF2rhTB6BitDbpcZLIVUEQ3zD-0w
  const searchBooks = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${key}:keyes&key=AIzaSyB6j1H1_1Qhpg-bGxi08tAb9lYvLLWHE6c`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not okay!");
        }

        return response.json();
      })
      .then((actualData) => {
        dispatch(recentSearchResults(actualData.items));
        // console.log("All Books Search", actualData.items);
      })
      .catch((err) => {
        console.log("err", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div>
        <h1>Search Here</h1>

        <input
          type="text"
          id="searchTerm"
          onChange={(e) => handleChange(e.target.value)}
        />
        <button
          onClick={() => {
            saveTerm();
            searchBooks();
          }}
        >
          Search
        </button>
      </div>

      <div>
        {isLoading === true ? (
          <div>
            <h3>Loading...</h3>
          </div>
        ) : (
          <SearchBooksDiv>
            {searchResults.map((el) => (
              <AllBooks
                title={el.volumeInfo.title}
                image={el.volumeInfo.imageLinks.thumbnail}
                id={el.id}
                key={el.id}
              />
            ))}
          </SearchBooksDiv>
        )}
      </div>
    </div>
  );
};
