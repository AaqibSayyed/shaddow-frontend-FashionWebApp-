import styled from "styled-components"
import instagram from '../../assests/instagram.png'
import facebook from '../../assests/facebook.png'
import twitter from '../../assests/twitter.png'
import youtube from '../../assests/youtube.png'

const CONTAINER = styled.footer`
    display: flex;
    flex-wrap: wrap;
    padding: 30px 30px;
    justify-content: space-between;
    align-items: flex-start;
    gap: 30px;
    background-color: ${({theme})=>theme.colors.bg};
    transition: all .3s ease;
        /* border: 2px solid black; */

    .about-us, .policies, .newsletter, .follow-us{
        /* border: 2px solid black; */
        min-width: 20%;
        h3{
        border-bottom: 3px solid ${({theme})=>theme.colors.primary};
        width: fit-content;
        }      
    }

    .newsletter p{
        max-width: 300px;
    }

    .newsletter input[type='text']{
        max-width: 300px;
        margin-top: 5px;
        padding : 5px
    }

    .newsletter input[type='text']:focus::placeholder {
    color: transparent;
    }

    .newsletter button{
        padding: 6px 6px;
        margin-left: 5px;
        margin-top: 5px;
        background-color: ${({theme})=>theme.colors.secondary};   
        color: ${({theme})=>theme.colors.primary};
        border: none;
        border-radius: 2px;
        transition: all .3s ease;
        cursor: pointer;
        &:hover{
            color: grey;
        }
    }

    .para{       
        margin-top: 3px;
        padding: 6px 0;
        width: fit-content;
        cursor: pointer;
        transition: all .3s ease;
        &:hover{
            color: grey;
        }
    }

    .follow-us .social-media img{
            border: .1px solid black;
            padding: 7px;
            width: 40px;
            margin: 0 2px;
            transition: all .3s ease;
            cursor: pointer;

            &:hover{
                transform: scale(1.1);
            }
        }

    .follow-us .social-media{
        /* border: 2px solid blue; */
        display: flex;
        flex-wrap: wrap;
        width: fit-content;
     
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}){
        .about-us, .policies, .newsletter, .follow-us{
        /* border: 2px solid black; */
        min-width: 100%;
    }
        h3{
            font-size: 16px;
        }
        p{
            font-size: 14px;
        }
    }

` 

function Footer() {

    const handleFormSubmission = (event)=>{
        event.preventDefault()
    }
  return (
    <CONTAINER className="container">
        <div className="about-us">
            <h3>ABOUT US</h3>
            <p className='para'>Overlays Clothing Pvt Ltd</p>
            <p className='para'>Explore to CHANGE.</p>
        </div>

        <div className='policies'>
            <h3>POLICIES</h3>
            <p className='para'>Return Your Order</p>
            <p className='para'>Shipping Policy</p>
            <p className='para'>Return, Refund, and Cancellation</p>
            <p className='para'>Terms and Conditions</p>
            <p className='para'>Privacy Policy</p>
            <p className='para'>Fraud Protection</p>
        </div>

        <div className="newsletter">
            <h3>NEWSLETTER</h3>
            <p style={{marginTop: '3px', padding: '6px 0', width: 'fit-content'}}>You can be the first one to know about our new releases, latest offers and more.</p>
            <form onSubmit={handleFormSubmission}>
            <input type='text' placeholder='Your Email' />
            <button type='submit'>Register</button>
            </form> 
        </div>

        <div className='follow-us'>
            <h3>FOLLOW US</h3>
            <p style={{marginTop: '3px', padding: '6px 0', width: 'fit-content'}}>Stay in touch!</p>
            <div className="social-media">
                <img src={instagram} alt='instagram'/>
                <img src={facebook} alt='facebook'/>
                <img src={twitter} alt=''/>
                <img src={youtube} alt='youtube'/>
            </div>
        </div>
    </CONTAINER>
  )
}

export default Footer