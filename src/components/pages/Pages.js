import React from "react";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import "./Pages.css";

const Pages = props => {
  const { handlePagesClick } = props;

  return (
    <div className="pokeButtons">
      <button onClick={() => handlePagesClick("prev")} className="leftbtn">
        <KeyboardArrowLeft style={{ fontSize: 20 }} />
      </button>

      <button onClick={() => handlePagesClick("next")} className="rightbtn">
        <KeyboardArrowRight style={{ fontSize: 20 }} />
      </button>
    </div>
  );
};
export default Pages;
