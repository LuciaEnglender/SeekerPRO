
import React from "react";
import "./slides.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function BtnSlider({ direction, moveSlide }) {
 // console.log(direction, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? <AiOutlineArrowRight /> :  <AiOutlineArrowLeft />} />
    </button>
  );
}