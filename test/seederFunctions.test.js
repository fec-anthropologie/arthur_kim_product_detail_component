const {
  generateProductNames,
  generateRandomValue,
} = require('../database/seederFunctions.js');
const {
  productBrandName, 
  dressSubcategory, 
  dressAdjectives,
} = require('../database/seederMockData.js');

test('Create same number of product names as diff of min and max', ()=> {
  var dressesArr = generateProductNames(productBrandName, dressAdjectives, dressSubcategory, 0, 25);
  expect(dressesArr.length).toBe(25);
})
test('Check if name created grabs from 3 input arrays', () => {
  let dressesArr = generateProductNames(productBrandName, dressAdjectives, dressSubcategory, 0, 25);
  let dress = dressesArr[0].split(' ');
  let brand = dress[0];
  let adjective = dress[1];
  let subCategory = dress[2] + ' ' + dress[3];
  expect(productBrandName.indexOf(brand)).not.toBe(-1);
  expect(dressSubcategory.indexOf(subCategory)).not.toBe(-1);
  expect(dressAdjectives.indexOf(adjective)).not.toBe(-1);
})
test('Check if generate random value function works', () => {
  let arr = [1,2,3,4,5];
  let randomVal = generateRandomValue(arr);
  expect(arr.indexOf(randomVal)).not.toBe(-1);
})