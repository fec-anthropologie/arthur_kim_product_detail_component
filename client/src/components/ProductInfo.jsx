import React from 'react';
import ProductTitleSection from './ProductTitleSection.jsx';
import ProductColorSection from './ProductColorSection.jsx';
import ProductShipSection from './ProductShipSection.jsx';

let ProductInfo = ({ afterPay, colorImages, currentColor, handleAfterPayInfoClick, handleColorClick, pictureData }) => {
  return (
    <div className='product-info'>
      <ProductTitleSection afterPay={afterPay} pictureData={pictureData} handleAfterPayInfoClick={handleAfterPayInfoClick}/>
      <ProductColorSection currentColor={currentColor} colorImages={colorImages} pictureData={pictureData}
      handleColorClick={handleColorClick}/>
      <hr className='non-dotted' ></hr>
      <ProductShipSection />
    </div>
  )
}

export default ProductInfo;