import ReactDOM from "react-dom";
import { useRef, useState } from "react";
import classes from "./SendUser.module.css";
import close from "./assets/close.png";
const SendUser = (props) => {
  const id = localStorage.getItem("id");
  const usernameInputRef = useRef("");
  const [exist, setExist] = useState(true);
  const back = () => {
    props.senduser();
  };

  console.log(props.name);

  const sendImage = () => {
    const usernames = usernameInputRef.current.value;
    const data = {
      name: props.name,
      username: usernames,
    };
    fetch(`http://127.0.0.1:200/api/users/${id}/shareimage`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset = UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.usernameexist) {
          setExist(true);
          alert("sent succesfully");
          props.senduser();
        } else {
          setExist(false);
        }
      });
  };

  return ReactDOM.createPortal(
    <div className={classes.black}>
      <div className={classes.container}>
        <div className={classes.flex}>
          <img src={close} onClick={back} className={classes.close} alt="" />
          <div>To Username:</div>
          <div>
            <input
              ref={usernameInputRef}
              className={classes.input}
              type="text"
            />
            <button className={classes.send} onClick={sendImage}>
              Send
            </button>
            {!exist && (
              <div className={classes.warning}>Username doesn't exist</div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("send")
  );
};

export default SendUser;
