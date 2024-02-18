import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  return (
    <div className='auth'>
      Auth
      <Login />
      <Registration />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3003/auth/login", {
        username,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);

      if (response.data.token) {
        navigate("/");
      } else {
        alert("enter valid user details");
      }
    } catch (error) {
      console.error(error);
      alert("wrong userr");
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label='Login'
      onSubmit={onSubmit}
    />
  );
};
//
//

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3003/auth/register", {
        username,
        password,
      });
      alert("Registration completed ! Now Login ");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label='Register'
      onSubmit={onSubmit}
    />
  );
};

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    <div className='auth-container'>
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className='form-group'>
          <label htmlFor=''> username :</label>
          <input
            value={username}
            type='text'
            id='username'
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''> PassWord :</label>
          <input
            value={password}
            type='text'
            id='PassWord'
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type='submit'>{label}</button>
      </form>
    </div>
  );
};
export default Auth;
