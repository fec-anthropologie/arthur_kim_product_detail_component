
import React from 'react';

let MainPictureSlide = ({ handleMouseHover, image, xCoordinate, yCoordinate }) => {
  const styles = {
    backgroundImage: `url("${image}")`,
    backgroundSize: 'cover',
  }  
  //if isHovering create a new div and set it to miniBox
  let zoomBox;

  if (xCoordinate !== '' && yCoordinate !== ''){
    zoomBox = <div className='zoom-box'
    style = {
      {
        position: 'absolute',
        top: `${yCoordinate}px`,
        left: `${xCoordinate}px`
      }
    }></div>;
  } else {
    zoomBox = <div></div>;
  }

  return (
    <div className='image-slide' style={styles}
    onMouseMove={handleMouseHover}>
    {/* // onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover}> */}
    {zoomBox}
    </div>
  )
}

export default MainPictureSlide;