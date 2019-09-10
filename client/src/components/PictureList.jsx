import React from 'react';
import Picture from './Picture.jsx';
import { FiChevronUp } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";

class PictureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureNotClicked: true,
      currentPictureClicked: '',
    }
    this.checkIfPictureClickedInPictureList = this.checkIfPictureClickedInPictureList.bind(this);
  }
  checkIfPictureClickedInPictureList(event) {
    let string = 'container ';
    let containerClassSearch = string.concat(event.target.className.split(' ')[1]);
    if (this.state.pictureNotClicked) {
      document.getElementsByClassName(`${containerClassSearch}`)[0].setAttribute('id', 'picture-clicked');
      this.setState({
        pictureNotClicked: false,
        currentPictureClicked: event.target.className
      })
    } else {
      if (document.getElementById('picture-clicked')){
        document.getElementById('picture-clicked').removeAttribute('id');
      }
      document.getElementsByClassName(`${containerClassSearch}`)[0].setAttribute('id', 'picture-clicked');
      this.setState({
        currentPictureClicked: event.target.className
      })
    }
  }
  render() {
    let { changeFivePictures, changeMainPicture, initialArrowCounter, 
      pictureArray, topArrowDarken, transformPictureListValue } = this.props;
    let topArrow = <div className='arrow'></div>;
    let bottomArrow = <div className='arrow-container-bottom'></div>;
    // let whiteBox = <div className='empty'></div>;
    if (pictureArray.length > 5) {
      if (initialArrowCounter === 0) {
        topArrow = <FiChevronUp className='arrow' id='top' color='#f4efef' />;
        bottomArrow = <div className='arrow-container-bottom' id='bottom-arrow'>
        <FiChevronDown className='arrow' id='bottom' color='#808080' onClick={changeFivePictures}/></div>;
      } else {
        if (topArrowDarken) {
          topArrow = <FiChevronUp className='arrow' id='top' color='#808080' 
          onClick={changeFivePictures}
          />;
          bottomArrow = <div className='arrow-container-bottom' id='bottom-arrow'>
          <FiChevronDown className='arrow' id='bottom' color='#f4efef' /></div>
        } else {
          topArrow = <FiChevronUp className='arrow' id='top' color='#f4efef' />;
          bottomArrow = <div className='arrow-container-bottom' id='bottom-arrow'>
            <FiChevronDown className='arrow' id='bottom' color='#808080' onClick={changeFivePictures}/></div>;
        }
      }
      // whiteBox = <div id='white-box'></div>
    }
    return (
      <div className='picture-list-carousel'>
        <div className='container'>
          <div className='arrow-container-top' id='top-arrow'>
            {topArrow}
          </div>
          <div className='picture-list-container'
            style= {
              {
                transform: `translateY(${transformPictureListValue}px)`,
                transition: 'transform ease-out 0.5s'         
              }
            }>
            {pictureArray.map((picture, index) => {
              return (
                <Picture picture={picture} key={index} id={index} changeMainPicture={changeMainPicture} 
                checkIfPictureClickedInPictureList={this.checkIfPictureClickedInPictureList} />
              )
            })}
          </div>
          {/* {whiteBox} */}
          {bottomArrow}
        </div>
      </div>
    )
  }
}

export default PictureList;