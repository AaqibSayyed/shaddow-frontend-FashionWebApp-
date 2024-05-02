import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

function Stars({stars}) {
    const ratingStar = Array.from({length: 5}, (elem,i)=>{
        
        const number = i+0.5;
        i = i+1;
        return (
            <span key ={i}>

            {i<=stars? <FaStar style={{color: 'orange'}}/>: stars>=number?  <FaStarHalfAlt style={{color: 'orange'}}/>: <AiOutlineStar />}

        </span>
        )
    })

  return (
    <>
    <span style={{dislay: 'flex', gap:'0.5px'}}>{ratingStar}</span> 
    </>
  )
}

export default Stars