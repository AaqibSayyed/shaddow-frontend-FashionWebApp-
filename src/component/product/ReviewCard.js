import React from "react";
import styled from "styled-components";
import profilePng from "../../assests/Profile.png";
import Stars from "../ratingStar/Stars";

const Reviews = styled.div`
  margin: 20px 0px;
  .review {
    width: fit-content;
    margin: 0 auto;
    border-bottom: 0.5px solid black;
    font-size: 20px;
    font-weight: 900;
  }


`;
const CustomerReviews = styled.div`
  /* border: 2px solid black; */
  display: flex;
  /* flex-direction: column; */
  padding: 20px 25px;
  gap: 25px; 
  margin-bottom: 20px;
  overflow: auto;
  .container{
    /* border: 2px solid blue; */
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.5);
    min-width: 30%;
  }

  .userDetails{
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .userProfile {
    width: 30px;
    height: 30px;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}){
    *{
        font-size: 15px;
    }
    }   
`;

function ReviewCard() {
  const reviews = [
    {
      name: "Aaqib Sayyed",
      rating:3,
      comment: "Lorem ipsum dolor sit amet consectetur, adipisicing e saepe.",
    },
    {
        name: "Abuzar Shaikh",
        rating:2,
        comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt omnis dolores perferendis doloremque in voluptatibus dignissimos laudantium illo fugiat non harum, dolorem adipisci impedit, architecto libero, eius inventore beatae error. Commodi, distinctio soluta porro velit alias qui minus voluptatem obcaecati, saepe molestias sequi, eos molestiae? Natus corporis incidunt est saepe.",
      },
      {
        name: "Kashif Sayyed",
        rating:4,
        comment: "omnis dolores perferendis doloremque in voluptatibus dignissimos ldolorem adipisci impedit, architecto libero, eius inventore beatae error. Commodi, distinctio soluta porro velit alias qui minus voluptatem obcaecati, saepe molestias sequi, eos molestiae? Natus corporis incidunt est saepe.",
      },
      {
        name: "Zeeshan Shaikh",
        rating: 0,
        comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt omnis dolores perferendis doloremque in voluptatibus dignissimos laudantium illo fugiat non harum, dolorem adipisci impedit, architecto libero, eius inventore beatae error. Commodi, distinctio soluta porro velit alias qui minus voluptatem obcaecati, saepe molestias sequi, eos molestiae? Natus corporis incidunt est saepe.",
      },
      {
        name: "Ashar",
        rating: 0.5,
        comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt omnis de? Natus corporis incidunt est saepe.",
      },
      {
        name: "Bashar",
        rating: 3,
        comment: "Lorem ipsum dolor sit amet consectetur, adipisicingndis doloremque in voluptatibus dignissimlibero, eius inventore beatae error. Commodi, distinctio soluta porro velit alias qui minus voluptatem obcaecati, saepe molestias sequi, eos molestiae? Natus corporis incidunt est saepe.",
      },
  ];
  return (
    <>
      <hr />
      <Reviews>
        <div className="review">Customer Reviews</div>
      </Reviews>

      <CustomerReviews>
        {reviews &&
          reviews.map((review, index) => {
            return (
                <div className = 'container' key={review._id}>
                <div className="userDetails">
                <img src={profilePng} alt="User" className="userProfile" />
                <p>{review.name}</p>
                </div>
                <Stars stars={review.rating} />
                <div className="reviewCardComment">{review.comment}</div>
                </div>
            );
        })}
        </CustomerReviews>
    </>
  );
}

export default ReviewCard;
