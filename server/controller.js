const { getById } = require('../database/dbHelpers.js');

//specifically going to show these so that i can show picture carousel
const moreColorDress = [13];
const moreColorPants = [26, 34];
const moreColorSkirts = [53];

const lessColorDress = [12];
const lessColorPants = [40,43];
const lessColorSkirts = [61,72];

const controller = {
  get: (req, res) => {
    let { id } = req.params;
    console.log('what is id', id)
    getById(id)
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((err) => res.status(400).send(err))
  }
}

module.exports = controller;