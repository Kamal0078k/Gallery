import { Fragment, useEffect, useState } from "react";
import Person from "./Person";
import classes from "./Profile.module.css";
import Header from "./Header";
import bg from "./assets/background.png";
import Images from "./Images";

const Profile = (props) => {
  // const [files, setFiles] = useState(null);

  // console.log(props.id);

  // const handleUploadClick = () => {
  //   if (!files) {
  //     alert("no files choosen");
  //     return;
  //   }
  //   const formData = new FormData();
  //   for (const single_files of files) {
  //     formData.append("image", single_files);
  //   }

  //   fetch(`http://127.0.0.1:200/api/users/${props.id}/upload`, {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // };

  return (
    <Fragment>
      <img src={bg} className={classes.background} alt="wave" />
      {/* <div className={classes.background}></div> */}
      <div classes={classes.profile}>
        <Header />
        <Person email={props.email} username={props.username} id={props.id} />
        <div className={classes.heading}>Images :</div>
        <hr></hr>
        {/* <input type="file" onChange={handleFileChange} name="image" multiple />
      <button onClick={handleUploadClick}>Upload</button> */}
      </div>
      <Images />
    </Fragment>
  );
};

export default Profile;
