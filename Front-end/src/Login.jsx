import { Fragment, useRef, useState, useEffect, memo } from "react";
import bg from "./assets/background.png";
import classes from "./Login.module.css";
import person from "./assets/person.jpg";

const Login = (props) => {
  const usernameInputRef = useRef("");
  const passwordInputRef = useRef("");
  const [data, setData] = useState("");
  const [correct, setCorrect] = useState(true);

  const takevalues = async (event) => {
    event.preventDefault();
    const usernames = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;
    const data = {};
    if (usernames == "" || password == "") {
      alert("inputs must be filled");
    } else {
      const register = {
        username: usernames,
        password: password,
      };
      try {
        fetch("http://127.0.0.1:200/api/users/login", {
          method: "POST",
          body: JSON.stringify(register),
          headers: {
            "Content-type": "application/json; charset = UTF-8",
          },
        })
          .then((res) => res.json())
          .then((info) => {
            if (info.message == true) {
              data.id = info.id;
              data.message = info.message;
              data.username = info.username;
              data.email = info.email;
              props.getdata(data.id, data.username, data.email);
              localStorage.setItem("user", data);
              setCorrect(true);
              localStorage.setItem("id", data.id);
              localStorage.setItem("username", data.username);
              localStorage.setItem("email", data.email);
              props.profileconvert();
            } else {
              setCorrect(false);
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const loginpage = () => {
    props.convert();
  };

  return (
    <Fragment>
      <img src={bg} className={classes.background} alt="wave" />
      <div className={classes.logo}>
        <div>
          <div className={classes.gallery}>Gallery</div>
          <div className={classes.caption}>Welcome Back!</div>
        </div>
      </div>
      <div className={classes.container}>
        <form className={classes.form} onSubmit={takevalues}>
          {/* <img src={person} alt="persona" className={classes.person} /> */}
          <div className={classes.userdp}>
            <div className={classes.letter}>G</div>
          </div>
          <div className={classes.comps}>
            <div className={classes.labe}>Username : </div>
            <input
              type="text"
              ref={usernameInputRef}
              className={classes.input}
            />
          </div>
          <div className={classes.comps}>
            <div className={classes.labe}>Password:</div>
            <input
              type="password"
              className={classes.input}
              ref={passwordInputRef}
            />
          </div>
          {!correct && (
            <div className={classes.warning}>
              username or password is incorrect
            </div>
          )}
          <div className={classes.convert}>
            Don't have an account? <span onClick={loginpage}>Register</span>
          </div>

          <button className={classes.button} type="submit">
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default memo(Login);
