import styled from "styled-components";
import FeatureProduct from "./FeatureProduct";


const NewCollectionContainer = styled.div`
    width: 100%;
    margin-bottom: 50px;

  .new-collecion{
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
    transition: all .5s ease;
    &:hover{
        cursor: pointer;
        transform: scale(1.1)
    }
  }
  .small-devices{
    display: none
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .new-collecion{
      &:hover{
        transform: unset
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .large-devices{
        display: none;
    }
    .small-devices{
    display: block;
  }

  }
`;
function NewCollection() {
  return (
    <NewCollectionContainer>
      <div className="image-container">

        <img src='https://overlays.co/cdn/shop/files/OVRLYS_BANNER_Embrace_the_Sunshine_2160x1080_3.jpg?v=1712684866&width=1400' 
        alt="New Collecion" 
        className='new-collecion large-devices'/>
        <img src='https://overlays.co/cdn/shop/files/OVRLYS_BANNER_Embrace_the_Sunshine_1974x3508_3.jpg?v=1712684885&width=3000' 
        alt="New Collecion" 
        className='new-collecion small-devices'/>

      </div>

    <FeatureProduct productType='New Collection' category='newCollection'/>

    </NewCollectionContainer>
  );
}

export default NewCollection;
