import React from 'react';
import SizeList from './SizeList.jsx';
import SizeGuides from './SizeGuides.jsx';
import ColorCircle from './ColorCircle.jsx';

class ProductColorSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedFit: 'standard-fit',
      clickedSize: ''
    }
    this.clickFitChange = this.clickFitChange.bind(this);
    this.clickSizeChange = this.clickSizeChange.bind(this);
  }
  clickFitChange(e) {
    document.getElementById('fit-clicked').removeAttribute('id');
    document.getElementsByClassName(`${e.target.className}`)[0].setAttribute('id', 'fit-clicked');
    if (this.state.clickedSize.length !== 0) {
      document.getElementById('size-clicked').removeAttribute('id');
    }
    this.setState({
      clickedFit: e.target.className,
      clickedSize: ''
    })
  }
  clickSizeChange(e) {
    if (event.target.className.split(' ')[0] !== 'unavailable') {
      if (this.state.clickedSize.length !== 0) {
        document.getElementById('size-clicked').removeAttribute('id');
      }
      document.getElementsByClassName(`${e.target.className}`)[0].setAttribute('id', 'size-clicked');
      this.setState({
        clickedSize: e.target.className
      })
    }
  }
  render() {
    let { colorImages, colors , sizeStandard, sizesUnavailable,
      sizePetite, sizePetiteUnavailable, sizePlus, sizePlusUnavailable
    } = this.props.pictureData;
    let { currentColor, handleColorClick } = this.props;
    let quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let sizes, sizesOutofStock;
    if (this.state.clickedFit === 'standard-fit') {
      sizes = sizeStandard;
      sizesOutofStock = sizesUnavailable;
    } else if (this.state.clickedFit === 'petite-fit') {
      sizes = sizePetite;
      sizesOutofStock = sizePetiteUnavailable;
    } else if (this.state.clickedFit === 'plus-fit') {
      sizes = sizePlus;
      sizesOutofStock = sizePlusUnavailable;
    }
    if (this.props.pictureData) {
      return (
        <div className='product-color'>
          <div className='color-container'>
            <div className='color'>COLOR: </div>
            <div className='type'>{currentColor}</div>
          </div>
          <div className='color-image-container'>
            {colorImages.map((colorImage, i) => {
              return (
                <ColorCircle colorImage={colorImage} colors={colors} key={i} handleColorClick={handleColorClick}/>
              )
           })}
          </div>
          <div className='fit-container'>
            <div className='fit'>FIT: </div>
            <div className='subclass'>
              <div className='subcontainer'>
                <div className='standard-fit' id='fit-clicked' onClick={this.clickFitChange}>Standard</div>
              </div>
              <div className='subcontainer'>
                <div className='petite-fit' onClick={this.clickFitChange}>Petite</div>
              </div>
              <div className='subcontainer'>
                <div className='plus-fit' onClick={this.clickFitChange}>Plus</div>
              </div>
            </div>
          </div>
          <div className='size-container'>
            <div className='size'>SIZE: </div>
            <SizeList sizes={sizes} sizesUnavailable={sizesOutofStock} clickSizeChange={this.clickSizeChange} />
            <div className='subclass'>
              <SizeGuides />
              <div className='divider'>|</div>
              <div className='customers-say'>Customers say True to Size</div>
            </div>
          </div>
          <div className='quantity-container'>
            <div className='quantity'>QTY: </div>
            <select className='select'>
              {quantity.map(number => {
                return (
                  <option key={number}>{number}</option>
                )
              })}
            </select>
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default ProductColorSection;