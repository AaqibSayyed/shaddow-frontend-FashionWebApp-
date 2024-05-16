import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";


const ForgetPasswordForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: 70px;
  padding-bottom: 70px;

  .form-container {
    border: 1px solid black;
    border-radius: 5px;
    width: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
  }
  .form-container > h3 {
    font-size: 30px;
    font-weight: 900;
  }
  .form-container > p {
    font-size: 15px;
    font-style: italic;
  }
  .form-container form {
    position: relative;
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
  .input-types {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .input-types > p {
    font-size: 15px;
    font-style: italic;
    color: grey;
  }
  .input-icons {
    position: absolute;
    left: 50px;
    width: 20px;
    height: 20px;
  }

  .form-container input,
  button {
    width: 80%;
    padding: 15px;
    border: 1px solid grey;
    border-radius: 5px;
  }
  .form-container input {
    padding-left: 45px;
  }
  .form-container button {
    transition: all 0.3s ease;
    border: none;
    margin-top: 20px;
    font-size: 17px;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.bg};
    }
  }

  .NavLink {
    color: inherit;
  }

  .active {
    color: inherit;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding-top: 50px;
    padding-bottom: 90px;
    .form-container {
      width: 85%;
      padding-top: 30px;
      padding-bottom: 60px;
    }
    .form-container > h3 {
      font-size: 27px;
    }
    .form-container > p {
      font-size: 13px;
    }
   
    .input-icons {
      position: absolute;
      left: 45px;
      width: 20px;
      height: 20px;
    }

    .form-container input {
      padding-left: 40px;
    }
  }
`;
   

function ForgetPassword() {

    const [forgetPasswordEmail, SetForgetPasswordEmail] = useState('')  

    const forgetPasswordFormHandle = (event)=>{
        event.preventDefault();
        console.log(forgetPasswordEmail);
    }
  return (
    <ForgetPasswordForm>
        <div className="form-container">
        <h3>Recover Password</h3>
        <p>Please enter your e-mail:</p>

        <form onSubmit={forgetPasswordFormHandle}>
        <div className="input-types">
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              value={forgetPasswordEmail}
              required
              onChange={(e)=>{SetForgetPasswordEmail(e.target.value)}}
            />
            <EmailOutlinedIcon className="input-icons" />
          </div>

        <button type="submit">RECOVER</button>
        </form>

        <p>
        Remember your password?
          <NavLink to="/login" className="NavLink">
            {" "}
            Back to login
          </NavLink>
        </p>

        </div>

    </ForgetPasswordForm>

  )
}

export default ForgetPassword