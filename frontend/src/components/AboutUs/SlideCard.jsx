import React from "react";
import { useInView } from "react-intersection-observer";
import "./SlideCard.css";

const SlideCard = ({ title, description, image }) => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <div style={{color:"gray", width:"160px",justifyItems:"center"}}
      ref={ref}
      className={`slide-card ${inView ? "visible" : ""}`}
    >
      <div style={{padding:"10px", display:"flex",justifyContent:"center"}}>
      <img style={{width:"75px",}} src={image} alt={title} className="slide-card-image" /></div>
      <div className="slide-card-content">
        <h2 className="slide-card-title">{title}</h2>
        <p className="slide-card-description">{description}</p>
      </div>
    </div>
  );
};

export default SlideCard;
