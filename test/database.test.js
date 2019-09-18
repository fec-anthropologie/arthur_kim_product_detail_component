const {MongoClient} = require('mongodb');

describe('insert', () => {
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

  it('should insert a doc into collection', async () => {
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
    expect(insertedProduct).toEqual(mockProduct);
  });
});
