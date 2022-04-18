import { Link } from "react-router-dom";
import styled from "styled-components";

//Styling handled with styled components
//Handlimg all books data and displaying

export const AllBooks = ({ title, image, id }) => {
  const ImageDiv = styled.div`
    height: 300px;
    width: 200px;
    img {
      object-fit: contain;
      width: 80%;
      height: auto;
    }
    margin-bottom: 30px;
  `;
  return (
    <div className="allBooksDiv">
      <ImageDiv>
        <img src={image} alt="{title}" />
        <p>{title}</p>
        <button>
          <Link to={`/book/${id}`}> Read More </Link>
        </button>
      </ImageDiv>
    </div>
  );
};
