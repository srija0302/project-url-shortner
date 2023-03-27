const express = require("express");
const {generateNewShortUrl, getRedirectingUrl, getMessage} = require("../controllers/url");
const router = express.Router();
//const URL = require("../models/url")

router.post("/url", generateNewShortUrl);
router.get("/:shortId", getRedirectingUrl);
//router.get("/message", getMessage);
// router.get("/:shortId", async(req,res)=>{
//     const entry = await URL.find({shortID: req.params.shortId});
//     console.log("entry",entry)
// console.log("idd printing", req.params.shortId)
// res.redirect(entry[0].redirectURL)
// return;

// })

module.exports = router;