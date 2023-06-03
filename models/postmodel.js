const mongoose=require('mongoose');

// - Name
// - Description
// - Category (Clothing, Electronics, Furniture, Other)
// - Image URL
// - Location
// - Date
// - Price

const PostSchema=mongoose.Schema({
    name:String,
    description:String,
    category:String,
    image:String,
    location:String,
    date:String,
    price:Number
})

const PostModel=mongoose.model("post",PostSchema);

module.exports={
    PostModel
}