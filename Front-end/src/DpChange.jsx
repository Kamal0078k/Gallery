import { memo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Fragment } from "react";
import classes from "./DpChange.module.css";
import usericon from "./assets/user.png";
import { AddAlertRounded } from "@material-ui/icons";

const DpChange = (props) => {
  const [files, setFiles] = useState(null);
  const [bool, setBool] = useState(false);
  const id = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const handleclick = () => {
    props.clicked();
  };

  const deleteDp = () => {
    fetch(`http://127.0.0.1:200/api/users/${id}/deletedp`).then((res) =>
      res.json()
    );
    window.location.reload();
  };

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
    setFiles(event.target.files[0]);
  };
  const handleUploadClick = () => {
    if (!files) {
      alert("no files choosen");
      return;
    }
    const formData = new FormData();
    formData.append("dp", files);

    fetch(`http://127.0.0.1:200/api/users/${id}/dp`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "succesfull") alert("uploaded succesfully");
        window.location.reload();
      });
  };

  return ReactDOM.createPortal(
    <Fragment>
      <div className={classes.black}>
        <div className={classes.text}>Choose an image for your profile</div>
        <div className={classes.container}>
          <img
            src={
              bool
                ? `http://LocalHost:200/api/users/${id}/images/${username}/Dp/dp.png`
                : usericon
            }
            className={classes.usericon}
          />

          <div className={classes.Description}>
            <input
              type="file"
              className={classes.choose}
              onChange={handleFileChange}
              name="dp"
            />
            <button onClick={handleUploadClick} className={classes.upload}>
              Upload
            </button>
            <button className={classes.remove} onClick={deleteDp}>
              Remove
            </button>
            <button className={classes.cancel} onClick={handleclick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Fragment>,
    document.getElementById("dp")
  );
};

export default memo(DpChange);
