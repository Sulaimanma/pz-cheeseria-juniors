import * as express from 'express';
const cheeses = require('./data/cheeses.json');

//Purchase list json

const purchaseList: any[] = [];

const router = express.Router();

router.get('/api/cheeses', (req, res, next) => {
  res.json(cheeses);
});

router.post('/api/purchase', (req, res, next) => {
  // Authenticate the user
  const { paymenttoken } = req.headers;

  if (paymenttoken && paymenttoken === 'sulaiman') {
    const purchaseRecord: any[] = req.body;
    console.log('newRecord', purchaseRecord);

    //Update the purchase list
    purchaseRecord?.map((record) => purchaseList.push(record));

    res.status(201).send('Purchase record has been created!');
  } else {
    res.status(403).send('Forbidden');
  }

  res.status(201);
});

//Access purchase history
router.get('/api/purchase', (req, res, next) => {
  res.status(200).send(purchaseList);
});

export default router;
