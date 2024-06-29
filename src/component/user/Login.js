import { useState, useEffect } from "react";
import styled from "styled-components";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { NavLink } from "react-router-dom";
import { userLogin } from "../../redux/slices/userSlice/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../redux/slices/userSlice/userSlice";


const LoginForm = styled.div`
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

  .forget-password {
    font-size: 15px;
    font-style: italic;
    color: grey;
    position: absolute;
    right: 50px;
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

    .forget-password {
      right: 45px;
      font-size: 12px;
    }

    .form-container input {
      padding-left: 40px;
    }
  }
`;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isErrorLogin, errorMessage, isAuthenticated,userCurrentLocation, user } = useSelector(
    (state) => state.user
  );

  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: "",
  });

  const getLoginFormValues = (event) => {
    setLoginFormValues({
      ...loginFormValues,
      [event.target.name]: event.target.value,
    });
  };

  const loginFormHandle = (event) => {
    event.preventDefault();
    dispatch(userLogin(loginFormValues));
  };

  useEffect(() => {
    if (isErrorLogin) {
      toast.error(errorMessage);
    }
    return ()=>{
      dispatch(clearError())
  }
  }, [isErrorLogin]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate((userCurrentLocation)? userCurrentLocation : '/');
      toast.success(`Welcome, ${user.name}`)
    }
  }, [isAuthenticated, navigate]);


  return (
    <LoginForm>
      <div className="form-container">
        <h3>Login</h3>
        <p>Please enter your e-mail and password:</p>
        <form onSubmit={loginFormHandle}>
          <div className="input-types">
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              value={loginFormValues.email}
              required
              onChange={getLoginFormValues}
            />
            <EmailOutlinedIcon className="input-icons" />
          </div>

          <div className="input-types">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={loginFormValues.password}
              required
              onChange={getLoginFormValues}
            />
            <LockOpenOutlinedIcon className="input-icons" />
            <div className="forget-password">
              <NavLink to="/forgetpassword" className="NavLink">
                Forget Password?
              </NavLink>
            </div>
          </div>

          <button type="submit">LOGIN</button>
        </form>
        <p>
          New customer?
          <NavLink to="/register" className="NavLink">
            {" "}
            Create an account
          </NavLink>
        </p>
      </div>
    </LoginForm>
  );
}

export default Login;
