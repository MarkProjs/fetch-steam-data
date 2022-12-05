const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res)=>{
    console.log(req.body);
    res.sendStatus(201).end();
});

//Gets the total positive and negative reviews of any game starting from the :number appid.
//It loops by an arbitrary amount of times to not exceed the API request limit.
router.get("/:number", async (req, res) => {
    try{
      console.log("Starting fetch")
      let reviews = await jsonFetchReviews(req.params.number)
      res.json(reviews)
      console.log("Finished fetch")
    } catch(err) {
      console.error(err)
    }
  })
module.exports = router;