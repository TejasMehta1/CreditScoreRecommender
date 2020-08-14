import React from 'react';
import './App.css';
import { Columns, Container } from 'react-bulma-components'

const CategoryCard = (props) => {
  return (
    <div onClick = {() => {props.activateModal()}} id={props.colorId} className={"card hovercard " + props.displayCard}>
      <div className="cardElements">
      
        <div className="category">
        <p>{props.text}</p>
        </div>

        <div className="emoji">
        <p>{props.emoji}</p>
        </div>
        
        </div>
      
      </div>
  );
}

export default CategoryCard;
