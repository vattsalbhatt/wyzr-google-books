import { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { AllBooks } from "../Books/AllBooks";
import styled from "styled-components";
import axios from "axios";
// import { find } from "../../../../wyzr-google-backend/src/models/user.model";

export const Home = () => {
  const [user, setUser] = useState(false);
  const [booksArr, setBooksArr] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
    getData();

    createUser();
  }, []);

  const BooksDiv = styled.div`
    margin: auto;
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(3, 30%);

    .allBooksDiv {
      margin: auto;
    }
  `;

  const GDiv = styled.div`
    /* border: 1px solid brown; */

    margin: auto;
    margin-top: 10px;

    width: auto;

    .gbtn {
      width: auto;
      height: auto;
    }
  `;

  const createUser = () => {
    const userData = JSON.parse(localStorage.getItem("loginWyzrUser"));

    if (userData) {
      axios
        .post(`https://wyzr-books.herokuapp.com/users`, {
          email: userData.profileObj.email,
          firstName: userData.profileObj.givenName,
          lastName: userData.profileObj.familyName,
          googleId: userData.profileObj.googleId,
          imageUrl: userData.profileObj.imageUrl,
        })
        .then((res) => {
          console.log("response POST", res.data);
          localStorage.setItem("wzrCurUser", JSON.stringify(res.data.result));
        })
        .catch((err) => console.log(err));
    }
  };

  //Check Login Function
  const checkLogin = () => {
    //get local user Data and change login status
    const userData = JSON.parse(localStorage.getItem("loginWyzrUser")) || "";

    //if available then change set login status to true
    if (userData.accessToken) {
      setUser(true);

      // console.log("userDetails", userData);
    }
  };

  //vattsal key --> AIzaSyB6j1H1_1Qhpg-bGxi08tAb9lYvLLWHE6c
  //photogreen key --> AIzaSyCuw9lfF2rhTB6BitDbpcZLIVUEQ3zD-0w

  const getData = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=:keyes&key=AIzaSyB6j1H1_1Qhpg-bGxi08tAb9lYvLLWHE6c`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not okay!");
        }

        return response.json();
      })
      .then((actualData) => {
        setBooksArr([...actualData.items]);
        // console.log("All Books", actualData.items);
      })
      .catch((err) => {
        console.log("err", err.message);
        // setBook(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = (googleData) => {
    const loginWyzrUser = JSON.parse(localStorage.getItem("loginWyzrUser"));
    if (!loginWyzrUser) {
      localStorage.setItem("loginWyzrUser", JSON.stringify(googleData));
    }

    setUser(true);
    alert("You are logged in successfully!");
    window.location.reload();
  };

  return user === false ? (
    isLoading == true ? (
      <h2>Loading...</h2>
    ) : (
      <div>
        <GDiv>
          <GoogleLogin
            className="gbtn"
            clientId={
              "761468809590-d465fc7uc9jc3ipqmskp7m9mnp2m1bmd.apps.googleusercontent.com"
            }
            buttonText="Login with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
            // onClick={reload()}
          ></GoogleLogin>
        </GDiv>

        <br />
        <BooksDiv>
          {booksArr.map((el) => (
            <AllBooks
              title={el.volumeInfo.title}
              image={el.volumeInfo.imageLinks.smallThumbnail}
              // getOneBook={getOneBook}
              id={el.id}
              key={el.id}
            />
          ))}
        </BooksDiv>
      </div>
    )
  ) : isLoading == true ? ( //if user is there!
    <h2>Loading...</h2>
  ) : (
    <div>
      {/* {findUser()} */}
      <br />
      <BooksDiv>
        {booksArr.map((el) => (
          <AllBooks
            title={el.volumeInfo.title}
            image={el.volumeInfo.imageLinks.smallThumbnail}
            // getOneBook={getOneBook}
            id={el.id}
            key={el.id}
          />
        ))}
      </BooksDiv>
    </div>
  );
};
