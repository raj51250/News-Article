const express = require("express");
const NewsItemModel = require("../models/NewsItem");
const router = express.Router();

// Load environment variables from .env file
require("dotenv").config();
const jwtAuthMiddleware = require("../middleware/jwtAuthMiddleware");

router.post("/addnewsitem", jwtAuthMiddleware, async function (req, res) {
  try {
    const newitem = new NewsItemModel(req.body);
    await newitem.save();
    res.send("News added successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getallnewsitems", jwtAuthMiddleware, async function (req, res) {
  try {
    const data = await NewsItemModel.find();
    res.send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/getnewsitemby/:id", jwtAuthMiddleware, async function (req, res) {
  try {
    const newsItem = await NewsItemModel.findOne({ _id: req.params.id });
    res.send(newsItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/getnewsitemsbyuserid", jwtAuthMiddleware, async function (
  req,
  res
) {
  try {
    const data = await NewsItemModel.find();
    const userPostedNewsItems = data.filter(
      (obj) => obj.postedBy.userid === req.body.userid
    );
    res.send(userPostedNewsItems);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/editnewsitem", jwtAuthMiddleware, async function (req, res) {
  try {
    await NewsItemModel.findOneAndUpdate({ _id: req.body.newsid }, req.body);
    res.send("News edited successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/deletenewsitem", jwtAuthMiddleware, async function (req, res) {
  try {
    await NewsItemModel.findOneAndDelete({ _id: req.body.newsid });
    res.send("News deleted successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
