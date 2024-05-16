import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

const RegisterForm = styled.div`
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
   



function Register() {
  const [registerFormValues, setregisterFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getRegisterFormValues = (event) => {
    setregisterFormValues({
      ...registerFormValues,
      [event.target.name]: event.target.value,
    });
  };

  const registerFormHandle = (event) => {
    event.preventDefault();
    console.log(registerFormValues.name);
    console.log(registerFormValues.email);
    console.log(registerFormValues.password);

  };

  return (
    <RegisterForm>
      <div className="form-container">
        <h3>REGISTER</h3>
        <p>Please fill in the fields below:</p>

        <form onSubmit={registerFormHandle}>

          <div className="input-types">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={registerFormValues.name}
              required
              onChange={getRegisterFormValues}
            />
            <DriveFileRenameOutlineOutlinedIcon className="input-icons" />
          </div>

          <div className="input-types">
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              value={registerFormValues.email}
              required
              onChange={getRegisterFormValues}
            />
            <EmailOutlinedIcon className="input-icons" />
          </div>

          <div className="input-types">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={registerFormValues.password}
              required
              onChange={getRegisterFormValues}
            />
            <LockOpenOutlinedIcon className="input-icons" />
          </div>

          <button type="submit">REGISTER</button>
        </form>
        <p>
            Already have an account?
          <NavLink to="/login" className="NavLink">
            {" "}
            Login
          </NavLink>
        </p>
      </div>
    </RegisterForm>
  );
}

export default Register;
