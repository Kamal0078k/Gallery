import { Fragment, memo } from "react";
import classes from "./Register.module.css";
import bg from "./assets/background.png";
import person from "./assets/person.jpg";
import { useRef, useState } from "react";
import validator from "validator";
import { useScrollTrigger } from "@material-ui/core";

const Register = (props) => {
  const usernameInputRef = useRef("");
  const passwordInputRef = useRef("");
  const emailInputRef = useRef("");
  const [username, setUsername] = useState("");
  const [emailerr, setEmailerr] = useState(true);
  const [length, setLength] = useState(true);
  const [unique, setUnique] = useState("");
  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  const takevalues = (event) => {
    event.preventDefault();
    const usernames = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;
    const email = emailInputRef.current.value;

    if (usernames == "" || password == "" || email == "") {
      alert("inputs must be filled");
      return;
    }
    if (password.trim().length < 10 || !containsSpecialChars(password)) {
      setLength(false);

      return;
    }
    setLength(true);

    if (!validator.isEmail(email)) {
      setEmailerr(false);
      return;
    }

    setEmailerr(true);

    const register = {
      username: usernames,
      password: password,
      email: email,
    };
    try {
      fetch("http://127.0.0.1:200/api/users/register", {
        method: "POST",
        body: JSON.stringify(register),
        headers: {
          "Content-type": "application/json; charset = UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.unique != "username" && data.unique != "email")
            props.convert();
          setUnique(data.unique);
        });
    } catch (err) {
      console.log(err);
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
          <div className={classes.caption}>A place for all your memories</div>
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
            {unique == "username" && (
              <div className={classes.warningemail}>Username already taken</div>
            )}
          </div>
          <div className={classes.comps}>
            <div className={classes.labe}>Password:</div>
            <input
              type="text"
              className={classes.input}
              ref={passwordInputRef}
            />
            {!length && (
              <div className={classes.warningpassword}>
                Password should contain min of 10 characters and special
                characters
              </div>
            )}
          </div>
          <div className={classes.comps}>
            <div className={classes.labe}>Email:</div>
            <input type="text" ref={emailInputRef} className={classes.input} />
            {!emailerr && (
              <div className={classes.warningemail}>Invalid Email!</div>
            )}
            {unique == "email" && (
              <div className={classes.warningemail}>Email already taken</div>
            )}
          </div>
          <div className={classes.convert}>
            Already have account? <span onClick={loginpage}>login</span>
          </div>
          <button className={classes.button}>Register</button>
        </form>
      </div>
    </Fragment>
  );
};

export default memo(Register);
