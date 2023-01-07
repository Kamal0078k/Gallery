import { Fragment, memo, useState } from "react";
import SendUser from "./SendUser";
import ReactDOM from "react-dom";

import classes from "./ImagePreview.module.css";

const ImagePreview = (props) => {
  const id = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const originalName = props.name.substring(13);
  const date = props.name.substring(0, 13);
  const [send, setSend] = useState(false);

  const somek = () => {
    props.back("");
  };
  const data = { name: props.name };
  const deleteimage = () => {
    fetch(`http://LocalHost:200/api/users/${id}/images/delete`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset = UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    window.location.reload();
  };

  const senduser = () => {
    setSend((prev) => !prev);
  };

  return ReactDOM.createPortal(
    <Fragment>
      {/* <div className={classes.black} onClick={somek}>
        <button className={classes.button} onClick={deleteimage}>
          Delete
        </button>
        <img
          className={classes.preview}
          src={`http://LocalHost:200/api/users/${id}/images/${username}/${props.name}`}
        />
      </div> */}
      {send && <SendUser senduser={senduser} name={props.name} />}
      <div className={classes.black}>
        <div className={classes.container}>
          <div className={classes.main}>
            <img
              className={classes.Image}
              src={`http://LocalHost:200/api/users/${id}/images/${username}/${props.name}`}
            />
            <div className={classes.description}>
              <div className={classes.details}>
                <div>{originalName}</div>
                <div className={classes.time}>{date}</div>
              </div>
              <div className={classes.buttons}>
                <button className={classes.delete} onClick={deleteimage}>
                  Delete
                </button>
                <button className={classes.share} onClick={senduser}>
                  Share
                </button>
                <button className={classes.cancel} onClick={somek}>
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>,
    document.getElementById("popup")
  );
};

export default memo(ImagePreview);
