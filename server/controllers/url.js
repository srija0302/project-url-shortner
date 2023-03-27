const shortid = require("shortid");
const URL = require("../models/url");

async function generateNewShortUrl(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url is required"})
    const shortId = shortid.generate();
    console.log("shortidddd", shortId)
    await URL.create({
        shortID: shortId,
        redirectURL: body.url,
        visitHistory:[]
    });
    //console.log("responseee", res.json({ id: shortId}))
     res.json({ "id": shortId});
}

const getRedirectingUrl= async(req, res)=>{
    const id = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortID: id,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true } // Add this option to return the updated document
    );
    
    res.redirect(entry.redirectURL);
   
}

const getMessage = (req, res) =>{
  res.json({"message":"Hello from server!"})
}

module.exports = {generateNewShortUrl, getRedirectingUrl, getMessage};