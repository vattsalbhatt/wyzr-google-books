// import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Handling one book data over here

export const OneBook = () => {
  const { id } = useParams(); //Getting id in params
  const [book, setBook] = useState(null); // current book state
  const [isLoading, setLoading] = useState(true); // loading until book isn't available fully

  useEffect(() => {
    getData(); // it runs whever user lands for once automatically
  }, []);

  //vattsal key --> AIzaSyB6j1H1_1Qhpg-bGxi08tAb9lYvLLWHE6c
  //photogreen key --> AIzaSyCuw9lfF2rhTB6BitDbpcZLIVUEQ3zD-0w

  //Fetching and mounting the data
  const getData = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyB6j1H1_1Qhpg-bGxi08tAb9lYvLLWHE6c`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not okay!");
        }

        return response.json();
      })
      .then((actualData) => {
        setBook(actualData);
        console.log("actual", actualData);
      })
      .catch((err) => {
        console.log("err", err.message);
        setBook(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //Conditional rendering on basis of loading status...
  return isLoading == true ? (
    <div>Loading...</div>
  ) : (
    <>
      <div>
        <h1>{book.volumeInfo.title}</h1>
        <img
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
        />
        <h5>Ratings : {book.volumeInfo.averageRating}</h5>
        <h3>Authors : </h3>
        <ol>
          {book.volumeInfo.authors.map((e) => (
            <li key={book.id}>{e}</li>
          ))}
        </ol>
        <p>{book.volumeInfo.description}</p>
      </div>
    </>
  );
};
