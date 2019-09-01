import React from 'react';
import Picture from './Picture.jsx';
import { FiChevronUp } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";

class PictureList extends React.Component {
  constructor(props) {
    super(props);
    this.addSlideUp = this.addSlideUp.bind(this);
    this.addSlideDown = this.addSlideDown.bind(this);
  }
  addSlideUp(){
    document.getElementsByClassName('picture-list-container')[0].setAttribute(
      'id', 'addSlideUp'
    )
  }
  addSlideDown(){
    document.getElementsByClassName('picture-list-container')[0].setAttribute(
      'id', 'addSlideDown'
    )   
  }
  render() {
    let { changeFivePictures, changeMainPicture, currentFivePictureArray, initialArrowCounter, pictureArray, topArrowDarken } = this.props;
    let topArrow = <div className='arrow'></div>;
    let bottomArrow = <div className='arrow'></div>;
    if (pictureArray.length > 5) {
      if (initialArrowCounter === 0) {
        topArrow = <FiChevronUp className='arrow' id='top' color='#f4efef' />;
        bottomArrow = <FiChevronDown className='arrow' id='bottom' color='#808080' onClick={changeFivePictures} />;
      } else {
        if (topArrowDarken) {
          topArrow = <FiChevronUp className='arrow' id='top' color='#808080' onClick={changeFivePictures} />;
          bottomArrow = <FiChevronDown className='arrow' id='bottom' color='#f4efef' />;
        } else {
          topArrow = <FiChevronUp className='arrow' id='top' color='#f4efef' />;
          bottomArrow = <FiChevronDown className='arrow' id='bottom' color='#808080' onClick={changeFivePictures} />;
        }
      }
    }

    return (
      <div className='picture-list-carousel'>
        <div className='container'>
          <div className='arrow-container'>
            {topArrow}
          </div>
          <div className='picture-list-container'>
            {currentFivePictureArray.map((picture, index) => {
              return (
                <Picture picture={picture} key={index} changeMainPicture={changeMainPicture} />
              )
            })}
          </div>
          <div className='arrow-container'>
            {bottomArrow}
          </div>
        </div>
      </div>
    )
  }
}


export default PictureList;