import React from "react";
import styled from "styled-components";
import profilePng from "../../assests/Profile.png";
import Stars from "../ratingStar/Stars";

const Reviews = styled.div`
  margin: 20px 0px;
  margin-top: 27px;
  .review {
    width: fit-content;
    margin: 0 auto;
    /* border-bottom: 0.5px solid black; */
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
  margin-bottom: 70px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 7px;
  }

  &:hover{
    overflow: auto;
    &::-webkit-scrollbar {
    width: 100%;
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* Color of the scrollbar thumb */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Color of the scrollbar track */
  }
  }

  .container {
    /* border: 2px solid blue; */
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.5);
    min-width: 30%;
    padding: 5px;
    border-radius: 5px;
  }

  .userDetails {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .userProfile {
    width: 30px;
    height: 30px;
  }


  @media (max-width: ${({ theme }) => theme.media.tab}) {
    &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  &:hover{
    &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
    * {
      font-size: 15px;
    }

    .container {
      /* border: 2px solid blue; */
      min-width: 40%;
    }
  }
}

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    * {
      font-size: 15px;
    }

    .container {
      /* border: 2px solid red; */
      min-width: 80%;
    }
  }


`;

function ReviewCard() {
  const reviews = [
    {
      name: "Aaqib Sayyed",
      rating: 3,
      comment: "Lorem ipsum dolor sit amet consectetur, adipisicing e saepe.",
    },
    {
      name: "Abuzar Shaikh",
      rating: 2,
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt omnis dolores perferendis doloremque in voluptatibus dignissimos laudantium illo fugiat non harum, dolorem adipisci impedit, architecto libero, eius inventore beatae error. Commodi, distinctio soluta porro velit alias qui minus voluptatem obcaecati, saepe molestias sequi, eos molestiae? Natus corporis incidunt est saepe.",
    },
    {
      name: "Kashif Sayyed",
      rating: 4,
      comment:
        "omnis dolores perferendis doloremque in voluptatibus dignissimos ldolorem adipisci impedit, architecto libero, eius inventore beatae error. Commodi, distinctio soluta porro velit alias qui minus voluptatem obcaecati, saepe molestias sequi, eos molestiae? Natus corporis incidunt est saepe.",
    },
    {
      name: "Zeeshan Shaikh",
      rating: 0,
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt omnis dolores perferendis doloremque in voluptatibus dignissimos laudantium illo fugiat non harum, dolorem adipisci impedit, architecto libero, eius inventore beatae error. Commodi, distinctio soluta porro velit alias qui minus voluptatem obcaecati, saepe molestias sequi, eos molestiae? Natus corporis incidunt est saepe.",
    },
    {
      name: "Ashar",
      rating: 0.5,
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt omnis de? Natus corporis incidunt est saepe.",
    },
    {
      name: "Bashar",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicingndis doloremque in voluptatibus dignissimlibero, eius inventore beatae error. Commodi, distinctio soluta porro velit alias qui minus voluptatem obcaecati, saepe molestias sequi, eos molestiae? Natus corporis incidunt est saepe.",
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
              <div className="container" key={review._id}>
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
