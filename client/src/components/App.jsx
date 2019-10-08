import React from 'react';
import MainPictureDisplay from './MainPictureDisplay.jsx';
import PictureList from './PictureList.jsx';
import ProductInfo from './ProductInfo.jsx';
import Axios from 'axios';
import AfterPayModal from './AfterPayModal.jsx';

const afterPay = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSYF5YkDEGMF8EYXrKBfL0aJOt6guePtglaHrDKQNnXkXPslvX';
import '../../dist/styleSheets/appstyles.css';
import '../../dist/styleSheets/mainPictureStyles.css';
import '../../dist/styleSheets/modalStyles.css';
import '../../dist/styleSheets/pictureAndListStyles.css';
import '../../dist/styleSheets/productColorStyles.css';
import '../../dist/styleSheets/productInfoAndTitlesStyles.css';
import '../../dist/styleSheets/productShipStyles.css';
import '../../dist/styleSheets/sizeListStyles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureData: '',
      pictureArray: [],
      colorImages: [],
      colors: [],
      currentColor: '',
      // colorChange: false,
      mainPictureIndex: 0,
      transformPictureValue: 0,
      transformPictureListValue: 0,
      topArrowDarken: true,
      initialArrowCounter: 0,
      afterPayClicked: false,
      intialRenderOfMainPic: true
    }
    this.getPictureData = this.getPictureData.bind(this);
    this.changeMainPicture = this.changeMainPicture.bind(this);
    this.changeFivePictures = this.changeFivePictures.bind(this);
    this.handleAfterPayInfoClick = this.handleAfterPayInfoClick.bind(this);
    this.handleAfterPayXClick = this.handleAfterPayXClick.bind(this);
    this.calculateTransformPictureValue = this.calculateTransformPictureValue.bind(this);
    this.handleColorClick = this.handleColorClick.bind(this);
  }
  getPictureData(id) {
    Axios.get(`/api/products/${id}`)
      .then(({ data }) => {
        this.setState({
          pictureData: data,
          pictureArray: data.image,
          currentFivePictureArray: data.image.slice(0, 5),
          mainPicture: data.image[0],
          colorImages: data.colorImages,
          colors: data.colors,
          currentColor: data.colors[0]
        })
      })
      .catch((err) => {
        console.log('Data receive failed', err)
      })
  }
  changeMainPicture(e) {
    let storagePics = []
    for (var i = 0; i < this.state.pictureArray.length; i++){
      if (this.state.pictureArray[i].indexOf(this.state.currentColor) !== -1){
        storagePics.push(this.state.pictureArray[i])
      }
    }
    let previousMainPictureIndex= this.state.mainPictureIndex;
    let currentMainPictureIndex = storagePics.indexOf(e.target.src);
    let imageWidth = document.querySelector('.image-slide').clientWidth;
    let newTransformValue = this.calculateTransformPictureValue(previousMainPictureIndex, currentMainPictureIndex, imageWidth);
    this.setState({
      mainPictureIndex: currentMainPictureIndex,
      intialRenderOfMainPic: false,
      transformPictureValue: this.state.transformPictureValue - newTransformValue,
      colorChange: false
    })
  }
  calculateTransformPictureValue(previous, current, width){
    let differenceIndex = current - previous;
    return width * differenceIndex;
  }
  changeFivePictures(e) {
    if ( document.getElementById('picture-clicked')){
      document.getElementById('picture-clicked').removeAttribute('id')
    }
    let height = document.querySelector('.picture').clientHeight;
    let moveLength;
    if (e.target.id === 'top') {
      this.setState({
        transformPictureListValue: 0,
        topArrowDarken: false,
        initialArrowCounter: this.state.initialArrowCounter + 1
      })
    } else if (e.target.id === 'bottom') {
      let lengthOver = this.state.pictureArray.length - 5;
      moveLength = lengthOver * height;
      this.setState({
        transformPictureListValue: this.state.transformPictureListValue - moveLength,
        topArrowDarken: true,
        initialArrowCounter: this.state.initialArrowCounter + 1
      })
    }
  }
  handleAfterPayInfoClick() {
    if (!this.state.afterPayClicked) {
      document.getElementsByTagName('div')[0].setAttribute('id', 'gray-out');
      document.getElementsByClassName('picture-list-carousel')[0];
      document.getElementsByClassName('picture-list-carousel')[0].setAttribute('id', 'gray-out-picture-list');
      document.getElementsByClassName('top')[0];
      document.getElementById('top-arrow').removeAttribute('id')
      document.getElementsByClassName('arrow-container-top')[0].setAttribute('id', 'new-top-arrow');
      
      this.setState({
        afterPayClicked: true
      })
    }
  }
  handleAfterPayXClick() {
    if (this.state.afterPayClicked) {
      document.getElementsByTagName('div')[0].removeAttribute('id');
      document.getElementsByClassName('picture-list-carousel')[0].removeAttribute('id');
      document.getElementById('new-top-arrow').removeAttribute('id')
      document.getElementsByClassName('arrow-container-top')[0].setAttribute('id', 'top-arrow');

      this.setState({
        afterPayClicked: false
      })
    }
  }
  handleColorClick(e){
    if ( document.getElementById('picture-clicked')){
      document.getElementById('picture-clicked').removeAttribute('id')
    }
    this.setState({
      currentColor: e.target.id,
      mainPictureIndex: 0,
      transformPictureValue: 0,
      transformPictureListValue: 0,
      intialRenderOfMainPic: true,
      // colorChange: !this.state.colorChange,
      mainPictureIndex: 0
    })
  }
  componentDidMount() {
    // generates random id and sends api request
    let randomArr = [4,26,34,53,43,72];
  // this.getPictureData(15)
    this.getPictureData(randomArr[Math.floor(Math.random() * randomArr.length)]);
  }

  render() {
    let { productCategory, productName } = this.state.pictureData;
    if (productCategory === 'Dress') {
      productCategory += 'es';
    } else if (productCategory === 'Skirt') {
      productCategory += 's';
    }
    let afterPayM = this.state.afterPayClicked ? <AfterPayModal afterPay={afterPay} handleAfterPayXClick={this.handleAfterPayXClick}/> : <div></div>
    let currentPictureImages = [];
    if (this.state.colors.length > 1){
      for (var i = 0; i < this.state.pictureArray.length; i++){
        if (this.state.pictureArray[i].indexOf(this.state.currentColor) !== -1){
          currentPictureImages.push(this.state.pictureArray[i])
        }
      }
    } else {
      for (var i = 0; i < this.state.pictureArray.length; i++){
        if (this.state.pictureArray[i].indexOf(this.state.currentColor) !== -1){
          currentPictureImages.push(this.state.pictureArray[i])
        }
      }
    }
    return (
      <div className='app-component-body'>
        <div className='app-after-pay'>{afterPayM}</div>
        <div className='app-body'>
          <div className='product-header'>
            <div className='start'>Clothing</div>
            <div className='backslash'>/</div>
            <div className='product-category'>{productCategory}</div>
            <div className='backslash'>/</div>
            <div>{productName}</div>
          </div>
          <div className='app-body-product'>
            <div className='images-container'>
              <PictureList pictureArray={currentPictureImages} changeMainPicture={this.changeMainPicture}
                currentFivePictureArray={this.state.currentFivePictureArray} changeFivePictures={this.changeFivePictures}
                topArrowDarken={this.state.topArrowDarken} initialArrowCounter={this.state.initialArrowCounter} 
                transformPictureListValue={this.state.transformPictureListValue}/>
              <MainPictureDisplay intialRenderOfMainPic={this.state.intialRenderOfMainPic} mainPictureIndex={this.state.mainPictureIndex}
              pictureArray={currentPictureImages} transformPictureValue={this.state.transformPictureValue}/>
            </div>
            <div className='product-info'>
              <ProductInfo pictureData={this.state.pictureData} afterPay={afterPay} handleAfterPayInfoClick={this.handleAfterPayInfoClick}
                colorImages={this.state.colorImages} currentColor={this.state.currentColor} handleColorClick={this.handleColorClick}/>
            </div>
          </div>
          <div className='images-caption'>Hover your mouse over an image to zoom.</div>
        </div>
      </div>
    )
  }
}

export default App;