import Button from "../UI/Button/Button";
import classes from "./HeroText.module.css";
import { Link } from "react-router-dom";

const subtext =
  "Waste Eliminator is a simple web application where anyone can make an alert of uncontrolled waste by uploading images and locations.";

const HeroText = (props) => {
  return (
    <div className={classes.herotext}>
      <h1>Waste Eliminator</h1>
      <p>{subtext}</p>
      <Link to={"/alert"}>
        <Button> Getting Start </Button>
      </Link>

    </div>
  );
};

export default HeroText;
