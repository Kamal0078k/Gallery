import { Fragment, useEffect, useState, memo } from "react";
import classes from "./Person.module.css";
import userIcon from "./assets/user.png";
import DpChange from "./DpChange";

const Person = (props) => {
  const [files, setFiles] = useState(null);
  const [bool, setBool] = useState(false);
  const [user, setUser] = useState({
    username: props.username,
    email: props.email,
    id: props.id,
  });
  const [dp, setDP] = useState(false);

  useEffect(() => {
    setUser({
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      id: localStorage.getItem("id"),
    });
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("id");
    fetch(`http://127.0.0.1:200/api/users/${id}/getdp/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.dpexist) {
          const dpexist = true;
          setBool(dpexist);
        } else {
          const dpexist = false;
          setBool(false);
        }
      });
  }, []);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUploadClick = () => {
    if (!files) {
      alert("no files choosen");
      return;
    }
    const formData = new FormData();
    for (const single_files of files) {
      formData.append("image", single_files);
    }

    fetch(`http://127.0.0.1:200/api/users/${user.id}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") alert("Uploaded succesfully");
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      window.location.reload();
    }, 2000);

    setFiles(null);
  };

  // const fetching = async () => {
  //   const response = await fetch(`http://127.0.0.1:200/api/users/${props.id}`);
  //   const data = response.json();
  //   setUser(data);
  // };

  // useEffect(() => {
  //   fetching();
  // }, []);

  const clicked = () => {
    setDP((prev) => !prev);
  };

  return (
    <Fragment>
      {dp && <DpChange clicked={clicked} />}
      <div className={classes.main}>
        <div className={classes.container}>
          <div className={classes.somek}>
            <div className={classes.photo}>
              <img
                src={
                  bool
                    ? `http://LocalHost:200/api/users/${user.id}/images/${user.username}/Dp/dp.png`
                    : userIcon
                }
                onClick={clicked}
                className={classes.usericon}
                alt="click to edit"
              />
            </div>
            <div className={classes.data}>
              <div>{user.username}</div>
              <div>{user.email}</div>
            </div>
          </div>
          <div className={classes.upload}>
            <input
              type="file"
              onChange={handleFileChange}
              name="image"
              multiple
            />
            <button onClick={handleUploadClick} className={classes.button}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(Person);
