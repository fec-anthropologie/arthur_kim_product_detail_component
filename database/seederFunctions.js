//seeder functions for various parts
const {
  productCategories,
  productBrandName,
  dressSubcategory,
  dressAdjectives,
  skirtSubcategory,
  dressSkirtSize,
  pantsSubcategory,
  pantsAdjectives,
  pantsSize,
  fit,
  beddingSubcategory,
  beddingSize,
  beddingAdjectives
} = require('./seederMockData.js');

const generateProductNames = (brandNames, adjectives, subcategory, min, max) => {
  let storage = [];
  var newBrandName;
  var newAdjective;
  var newSubcategory;
  for (var i = min; i < max; i++) {
    newBrandName = brandNames[Math.floor(Math.random() * brandNames.length)] + ' ';
    newAdjective = adjectives[Math.floor(Math.random() * adjectives.length)] + ' ';
    newSubcategory = subcategory[Math.floor(Math.random() * subcategory.length)];
    storage.push(newBrandName.concat(newAdjective, newSubcategory));
  }
  return storage;
}
//will generate random for online exclusive (or other arrays inputted in function)
const generateRandomValue = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}
//random price generator/review count
const generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}
//random star count
const getRandomArbitraryStarCount = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(1);
}
// //filter through file images and match with id
// const filterImageFolder = (imageArray, id) => {
//   let titleNumber = title.split('_')[0];
//   let storage = [];

//   for (var i = 0; i < imageArray.length; i++){
//     if (imageArray[i].indexOf(titleNumber) !== -1){
//       storage.push(array[i])
//     }
//   }
//   return storage;
// }
const assignCorrectImageLinks = (object, index) => {
  return object[String(index)];
}
const colorGrabber = (array, colorArray) => {
  //grab first from array
  var firstLink = array[0]
  var lastLink = array[array.length-1]
  var currentColors = []
  for (var i = 0; i < colorArray.length; i++) {
    if (firstLink.indexOf(colorArray[i]) !== -1) {
      currentColors.push(colorArray[i]);
    }
  }
  if (lastLink.indexOf(currentColors[0]) === -1){
    for (var i = 0; i < colorArray.length; i++) {
      if (lastLink.indexOf(colorArray[i]) !== -1) {
        currentColors.push(colorArray[i]);
      }
    }
  }
  return currentColors;
}
const colorImageGrabber = (ImageLinksArray, colorsArray) => {
  var storage = [];
  for (var i = 0; i < colorsArray.length; i++){
    storage.push(ImageLinksArray[colorsArray[i]]);
  }
  return storage;
}


module.exports = {
  generateProductNames,
  generateRandomValue,
  generateRandomNumber,
  getRandomArbitraryStarCount,
  assignCorrectImageLinks,
  colorGrabber,
  colorImageGrabber
}