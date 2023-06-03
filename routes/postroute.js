const express = require('express');

const { PostModel } = require("../models/postmodel");

const postrouter = express.Router();


postrouter.get("/", async (req, res) => {
    try {

        let post_data = await PostModel.find();
        res.json( post_data )

    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error While Fetching the data" })
    }
})



postrouter.post("/post", async (req, res) => {
    const payload = req.body;

    try {

        let post_data = new PostModel(payload);
        await post_data.save();
        res.json({ "msg":"successfully posted the data","data": post_data });

    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while adding the post data" })
    }
})


postrouter.patch("/edit/:id", async (req, res) => {
    let id = req.params.id;
    const payload = req.body

    try {
        let update_data = await PostModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
        res.json( update_data );

    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while editing the data" })
    }

})


postrouter.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;


    try {
        let del_data = await PostModel.findByIdAndDelete({ _id: id }, { new: true });
        res.json({ "msg": del_data });

    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while deleting the data" })
    }

})

module.exports = {
    postrouter
}