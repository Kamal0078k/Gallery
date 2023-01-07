import { Fragment, useState, useEffect } from "react";
import Login from "./Login";
import Profile from "./Profile";

import Register from "./Register";

const App = () => {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(true);
  const [profile, setProfile] = useState(false);
  const [id, setID] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const convert = () => {
    setLogin((prev) => !prev);
    setRegister((prev) => !prev);
  };

  const profileconvert = () => {
    setLogin((prev) => !prev);
    setProfile((prev) => !prev);
  };

  const getdata = (id, username, email) => {
    setID(id);
    setUsername(username);
    setEmail(email);
  };

  useEffect(() => {
    const somek = localStorage.getItem("user");
    if (somek) {
      setLogin(false);
      setRegister(false);
      setProfile(true);
    }
  }, []);

  return (
    <Fragment>
      {register && <Register convert={convert} />}
      {login && (
        <Login
          convert={convert}
          profileconvert={profileconvert}
          getdata={getdata}
        />
      )}
      {profile && <Profile id={id} email={email} username={username} />}
    </Fragment>
  );
};

export default App;
