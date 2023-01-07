import { Fragment, useEffect, useState, memo } from "react";
import ImagePreview from "./ImagePreview";
import classes from "./Images.module.css";

const Images = () => {
  const id = localStorage.getItem("id");
  const [names, setNames] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`http://LocalHost:200/api/users/${id}/images/`)
      .then((res) => res.json())
      .then((data) => {
        setNames(data.names);
      });
  }, []);

  //   const previewImage = (e) => {
  //     console.log(e);
  //   };

  const username = localStorage.getItem("username");

  const allimages = names.map((name) => (
    <Fragment>
      <img
        onClick={(e) => setName(name)}
        className={classes.images}
        src={`http://LocalHost:200/api/users/${id}/images/${username}/${name}`}
      />
    </Fragment>
  ));

  const back = (name) => {
    setName(name);
  };

  return (
    <Fragment>
      <div className={classes.gallery}>{allimages}</div>
      {names.length == 0 && (
        <div className={classes.uploadimages}>Upload images to preview</div>
      )}
      {name == "" ? "" : <ImagePreview name={name} back={back} />}
    </Fragment>
  );
};

export default memo(Images);
