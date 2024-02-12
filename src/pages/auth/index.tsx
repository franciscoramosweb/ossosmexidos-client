import { useState, SyntheticEvent, useContext, useEffect } from "react";
import axios from "axios";
import { UserErrors } from "../../models/errors";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { IShopContext, ShopContext } from "../../context/shop.context";
import styles from "./style.module.scss";

export default function Index() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.auth}>
      <div className={styles.box}>
        <img
          src={
            isLogin
              ? "./carvi-drawings/yellowman.jpg"
              : "./carvi-drawings/blueman.jpg"
          }
          alt=""
        />
      </div>
      <div className={styles.box}>
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Register setIsLogin={setIsLogin} />
        )}
      </div>{" "}
    </div>
  );
}

const Register = ({ setIsLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handlesubmit = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();

      await axios.post("https://ossosmexidos-server.onrender.com/user/register", {
        username,
        password,
      });

      alert("Registration Complete! Login Please!");
    } catch (err) {
      if (err.response.data.type === UserErrors.USERNAME_ALREADY_EXISTS) {
        alert("ERROR: Username already in use");
      } else {
        alert("ERROR: Something went wrong");
      }
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handlesubmit}>
        <h1>REGISTER</h1>
        <div>
          <input
            placeholder="USERNAME"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="PASSWORD"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">REGISTER</button>
      </form>
      <p>
        Already have an account? <a onClick={() => setIsLogin(true)}>Login</a>
      </p>
    </div>
  );
};

const Login = ({ setIsLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [_, setCookies] = useCookies(["accessToken"]);

  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext<IShopContext>(ShopContext);

  const handlesubmit = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();

      const result = await axios.post("https://ossosmexidos-server.onrender.com/login", {
        username,
        password,
      });

      setCookies("accessToken", result.data.token);
      localStorage.setItem("userID", result.data.userID);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.log(err);

      let errorMessage: string = "";
      switch (err.response.data.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User doesnt exist";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong username/password";
          break;
        default:
          errorMessage = "Something went wrong";
      }
      alert("ERROR: " + errorMessage);
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handlesubmit}>
        <h1>LOGIN</h1>
        <div>
          <input
            placeholder="USERNAME"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="PASSWORD"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">LOGIN</button>
        <p>
          Don't have an account? <a onClick={() => setIsLogin(false)}>Register</a>
        </p>
      </form>
    </div>
  );
};
