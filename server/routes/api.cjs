const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res)=>{
    console.log(req.body);
    res.sendStatus(201).end();
});

module.exports = router;