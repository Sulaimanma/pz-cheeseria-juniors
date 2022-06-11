import * as express from "express";
const cheeses = require("./data/cheeses.json");
import mongoose = require("mongoose");
import Purchase from "./data/models/purchase";

//Purchase list json

// const purchaseList: any[] = [];

const router = express.Router();

// const Purchase = require('./data/models/purchase');

router.get("/api/cheeses", (req, res, next) => {
  res.json(cheeses);
});

router.post("/api/purchase", (req, res, next) => {
  // Authenticate the user
  const { paymenttoken } = req.headers;
  console.log("paymentToken", paymenttoken);
  if (paymenttoken && paymenttoken === "sulaiman") {
    const purchaseRecord: any[] = req.body;

    //Loop each record to be posted to the database
    purchaseRecord?.map(async (record) => {
      //Read the request data into schema to validate
      const purchase = new Purchase({
        id: record.id,
        amount: record.amount,
        description: record.description,
        image: record.image,
        price: record.price,
        purchaseTime: record.purchaseTime,
        title: record.title,
      });
      return (
        purchase
          //Upload the data to database
          .save()
          .then((result) => {
            console.log("post", result);
            return res.status(201).send("Purchase record has been created!");
          })
          .catch((err: string) => console.log(err))
      );
    });
    console.log("req.body", req.body);
  } else {
    res.status(403).send("Forbidden");
  }

  res.status(201);
});

//Access purchase history
router.get("/api/purchase", (req, res, next) => {
  // Get data from database
  Purchase.find()
    .then((list) => {
      res.status(200).json(list);
    })
    .catch((err: string) => console.log(err));
});

router.delete("/api/purchase/clear", (req, res, next) => {
  // Delete all records from database
  // Authenticate the user
  const { paymenttoken } = req.headers;
  if (paymenttoken && paymenttoken === "sulaiman") {
    Purchase.deleteMany()
      .then(function () {
        console.log("Data deleted"); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });
    res.status(200).send("Purchase history has been cleared!");
  }
});

export default router;
