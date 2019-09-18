const mongoose = require('mongoose');
const ProductDetail = require('./model.js');
const {
  productCategories, 
  productBrandName, 
  dressSubcategory, 
  dressAdjectives,
  skirtSubcategory,
  dressSkirtSize,
  dressSkirtSizePetite,
  dressSkirtSizePlus,
  pantsSubcategory,
  pantsAdjectives,
  pantsSize,
  pantsSizePetite,
  pantsSizePlus,
  colors,
  // colorImages,
  fit,
  beddingSubcategory,
  beddingSize,
  beddingAdjectives,
  designers
} = require('./seederMockData')
const {
  generateProductNames,
  generateRandomValue,
  generateRandomNumber,
  getRandomArbitraryStarCount,
  assignCorrectImageLinks,
  colorGrabber,
  colorImageGrabber
} = require('./seederFunctions.js')
const { dressImageLinks } = require('./dressImageLinks.js');
const { pantsImageLinks } = require('./pantsImageLinks.js');
const { skirtsImageLinks } = require('./skirtsImageLinks.js');
const { beddingImageLinks } = require('./beddingImageLinks.js');
const { colorImageLinks } = require('./colorImageLinks.js'); 


let dressesArr = generateProductNames(productBrandName, dressAdjectives, dressSubcategory, 0, 26);
let pantsArr = generateProductNames(productBrandName, pantsAdjectives, pantsSubcategory, 0, 26);
let skirtsArr = generateProductNames(productBrandName, dressAdjectives, skirtSubcategory, 0, 26);
let beddingArr = generateProductNames(beddingAdjectives, beddingAdjectives, beddingSubcategory, 0, 26);
let productArr = dressesArr.concat(pantsArr, skirtsArr, beddingArr)

let storage = [];
// let fileNames = [];

const createDresses = () => {
  let document = {};
  for (var i = 1; i <= 25; i++){
    document.productCategoryId = i;
    document.productCategory = productCategories[0];
    document.productName = productArr[i];
    document.price = generateRandomNumber(100, 399);
    document.brandName = generateRandomValue(designers);
    document.onlineExclusive = generateRandomValue([true, false]);
    document.reviewStarCount = getRandomArbitraryStarCount(1, 5);
    document.reviewCount = generateRandomNumber(5, 40);
    document.fit = fit;
    document.sizeStandard = dressSkirtSize;
    document.sizePetite = dressSkirtSizePetite;
    document.sizePlus = dressSkirtSizePlus;
    document.sizesUnavailable = generateRandomValue(dressSkirtSize);
    document.sizePetiteUnavailable = generateRandomValue(dressSkirtSizePetite);
    document.sizePlusUnavailable = generateRandomValue(dressSkirtSizePlus);
    document.image = assignCorrectImageLinks(dressImageLinks, i);
    document.colors = colorGrabber(document.image, colors);
    document.colorImages = colorImageGrabber(colorImageLinks, document.colors);
    storage.push(document);
    document = {};
  }
}
const createPants = () => {
  let document = {};
  for (var i = 26; i <= 50; i++){
    document.productCategoryId = i;
    document.productCategory = productCategories[2];
    document.productName = productArr[i];
    document.price = generateRandomNumber(100, 399);
    document.brandName = generateRandomValue(designers);
    document.onlineExclusive = generateRandomValue([true, false]);
    document.reviewStarCount = getRandomArbitraryStarCount(1, 5);
    document.fit = fit;
    document.sizeStandard = pantsSize;
    document.sizePetite = pantsSizePetite;
    document.sizePlus = pantsSizePlus;
    document.sizesUnavailable = generateRandomValue(pantsSize);
    document.sizePetiteUnavailable = generateRandomValue(pantsSizePetite);
    document.sizePlusUnavailable = generateRandomValue(pantsSizePlus);
    document.image = assignCorrectImageLinks(pantsImageLinks, i);
    document.colors = colorGrabber(document.image, colors);
    document.colorImages = colorImageGrabber(colorImageLinks, document.colors);
    storage.push(document);
    document = {};
  }
}
const createSkirts = () => {
  let document = {};
  for (var i = 51; i <= 75; i++){
    document.productCategoryId = i;
    document.productCategory = productCategories[1];
    document.productName = productArr[i];
    document.price = generateRandomNumber(100, 399);
    document.brandName = generateRandomValue(designers);
    document.onlineExclusive = generateRandomValue([true, false]);
    document.reviewStarCount = getRandomArbitraryStarCount(1, 5);
    document.fit = fit;
    document.sizeStandard = dressSkirtSize;
    document.sizePetite = dressSkirtSizePetite;
    document.sizePlus = dressSkirtSizePlus;
    document.sizesUnavailable = generateRandomValue(dressSkirtSize);
    document.sizePetiteUnavailable = generateRandomValue(dressSkirtSizePetite);
    document.sizePlusUnavailable = generateRandomValue(dressSkirtSizePlus);
    document.image = assignCorrectImageLinks(skirtsImageLinks, i);
    document.colors = colorGrabber(document.image, colors);
    document.colorImages = colorImageGrabber(colorImageLinks, document.colors);
    storage.push(document);
    document = {};
  }
}
const createBedding = () => {
  let document = {};
  for (var i = 76; i <= 100; i++){
    document.productCategoryId = i;
    document.productCategory = productCategories[3];
    document.productName = productArr[i];
    document.price = generateRandomNumber(100, 399);
    document.brandName = generateRandomValue(designers);
    document.onlineExclusive = generateRandomValue([true, false]);
    document.reviewStarCount = getRandomArbitraryStarCount(1, 5);
    document.fit = fit;
    document.sizeStandard = beddingSize;
    document.sizePetite = [''];
    document.sizePlus = [''];
    document.sizesUnavailable = generateRandomValue(beddingSize);
    document.sizePetiteUnavailable = '';
    document.sizePlusUnavailable = '';
    document.image = assignCorrectImageLinks(beddingImageLinks, i);
    document.colors = colorGrabber(document.image, colors);
    document.colorImages = colorImageGrabber(colorImageLinks, document.colors);
    storage.push(document);
    document = {};
  }
}

// fs.readdir(path.join(__dirname, './productImages'), (err, files) => {
//   files.forEach(file => {
//     fileNames.push(file)
//   })
//   if (err){
//     console.log('error', err)
//   }
createDresses();
createPants();
createSkirts();
createBedding();
ProductDetail.insertMany(storage)
  .then((data) => console.log('insert many worked!', data))
  .catch((err) => console.log('Bulk insert failed', err))
// })

