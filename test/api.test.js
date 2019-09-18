const request = require('supertest');
const app = require('../server/index.js');
const { MongoClient } = require('mongodb');

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app)
      .get("/api/products/1")
      .then(response => {
        console.log('what is in response', response.data)
        expect(response.statusCode).toBe(200)
      });
  })
})

describe('integration test for server and database', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.fecTest);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });
  it('It should response the GET method', async () => {
      const productDetails = db.collection('productdetails');

      const mockProduct = {
        productCategoryId : 1,
        productCategory: 'Dresses',
        productName: 'Calypso Maxi Jumpsuit',
        price: '100',
        brandName: 'Farmer Bill',
        onlineExclusive: false,
        reviewStarCount: '4',
        reviewCount: 10,
        colors: ['Blue'],
        colorImages: ['Blue-Image', 'Green-Image', 'Red-Image'],
        fit: ['Standard', 'Petite', 'Plus'],
        sizeStandard: ['XS', 'S', 'M', 'L'],
        sizePetite: [ 'XXS Petite', 'XS Petite', 'S Petite' ],
        sizePlus: ['1x', '2x', '3x'],
        sizesUnavailable: 'XS',
        sizePetiteUnavailable: 'XS Petite',
        sizePlusUnavailable: '2x',
        image: ['ImageFile1', 'ImageFile2']    
      };
      await productDetails.insertOne(mockProduct);
      const insertedProduct = await productDetails.findOne({productCategoryId: 1});
      console.log('insertedProduct', insertedProduct)
      await request(app)
      .get("/api/products/1")
      .then(({ data }) => {
        // console.log('what is response', response)
        expect(data.productName).toBe('Calypso Maxi Jumpsuit')
      });
    })
  })