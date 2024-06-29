import {useState,useEffect} from 'react'
import styled from "styled-components";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { NavLink } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";
import { userPasswordReset } from '../../redux/slices/userSlice/userThunk';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { clearError } from "../../redux/slices/userSlice/userSlice";


const ResetPasswordContainer = styled.div`
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

function ResetPassword() {
    const { resetToken } = useParams();
    const dispatch = useDispatch()
    const {isErrorResetPassword, passwordResetMessage, errorMessage} = useSelector((state)=> state.user)
    const navigate = useNavigate();

    const [password, setPassword] = useState({
        newPassword: '',
        confirmPassword: '',
    })  

    const data = {
        password : password.newPassword,
        confirmPassword : password.confirmPassword,
        resetToken 
    }

    const resetPasswordFormHandle = (event)=>{
        event.preventDefault()
        dispatch(userPasswordReset(data))
    }

    const getValues = (event)=>{
        setPassword({
            ...password, [event.target.name] : event.target.value
        })

    }

    useEffect(()=>{
        if(isErrorResetPassword){
            toast.error(errorMessage)
        }

    },[isErrorResetPassword])

    useEffect(()=>{
        if(!isErrorResetPassword && passwordResetMessage){
            toast.success(passwordResetMessage)
            setPassword({
                newPassword: '',
                confirmPassword: ''
            })  

            navigate('/login')
        }

    },[isErrorResetPassword, passwordResetMessage])

    useEffect(()=>{
        return ()=>{
          dispatch(clearError())
        }
      },[])

  return (

    <ResetPasswordContainer>
    <div className="form-container">
    <h3>Reset Password</h3>
    <p>Please enter your New Password:</p>

    <form onSubmit={resetPasswordFormHandle}>
    <div className="input-types">
        <input
          type="password"
          placeholder="New Password"
          name="newPassword"
          value={password.newPassword}
          required
          onChange={getValues}
        />
        <LockOpenOutlinedIcon className="input-icons" />
      </div>

      <div className="input-types">
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={password.confirmPassword}
          required
          onChange={getValues}
        />
        <LockOpenOutlinedIcon className="input-icons" />
      </div>


    <button type="submit">Submit</button>
    </form>

    <p>
    Remember your password?
      <NavLink to="/login" className="NavLink">
        {" "}
        Back to login
      </NavLink>
    </p>

    </div>
    </ResetPasswordContainer>

  )
}

export default ResetPassword