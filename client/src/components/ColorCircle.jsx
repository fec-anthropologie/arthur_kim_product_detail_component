import React from 'react';

let ColorCircle = ({ colorImage, colors, handleColorClick }) => {
  let color;
  for (var i = 0; i < colors.length; i++){
    if(colorImage.indexOf(colors[i]) !== -1){
      color = colors[i]
    }
  }
  return (
    <div className='color-image-border' onClick={handleColorClick} >
      <img src={`${colorImage}`} className='color-image' id={color}></img>
    </div>
  )
}

export default ColorCircle;