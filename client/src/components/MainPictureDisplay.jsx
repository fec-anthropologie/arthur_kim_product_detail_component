import React from 'react';
import MainPictureSlide from './MainPictureSlide.jsx';

class MainPictureDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xCoordinate: '',
      yCoordinate: ''
    }
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }
  handleMouseHover(event){
    let zoomBoxArea = document.getElementsByClassName('zoom-box')[0];
    let mainImageSlide = document.getElementsByClassName('image-slide')[0];
    // console.log('what is zoomboxarea mainimageslide', zoomBoxArea, mainImageSlide)
    // this.setState({
    //   mainPictureOffsetHeight: '',
    //   mainPictureOffsetWidth: '',
    //   zoomBoxOffsetWidth: '',
    //   zoomBoxOffsetHeight: ''
    //   // xCoordinate: event.clientX,
    //   // yCoordinate: event.clientY
    //   // xCoordinate: event.screenX,
    //   // yCoordinate: event.screenY
    //   // xCoordinate: event.offsetX,
    //   // yCoordinate: event.offsetY
    //   // xCoordinate: event.nativeEvent.offsetX,
    //   // yCoordinate: event.nativeEvent.offsetY
    // }, () => console.log('X Coordinate, Y Coordinate', this.state.xCoordinate, this.state.yCoordinate))
  }
  handleMouseChange(hovering){
    if (hovering){
      console.log('event,')
    }
  }
  render() {
    let { pictureArray, transformPictureValue } = this.props;
    console.log('what is transformPictureValue inside MPD', transformPictureValue)
    if (pictureArray.length > 0) {
      return (
          <div className='main-picture-container'
          style={
            {
              transform: `translateX(${transformPictureValue}px)`,
              transition: 'transform ease-out 0.5s'
            }
          }>
          {pictureArray.map((image, i) => (
            <MainPictureSlide image={image} key={i} handleMouseHover={this.handleMouseHover}
              xCoordinate={this.state.xCoordinate} yCoordinate={this.state.yCoordinate}/>
          ))}
          </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

export default MainPictureDisplay;