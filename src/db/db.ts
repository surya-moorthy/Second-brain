import mongoose, { model, Types } from "mongoose";
import {Schema} from "mongoose";

mongoose.connect("mongodb://mongoadmin:password@localhost:27017")

const UserSchema : Schema = new Schema({
    username : { type : String , required : true,unique: true,min : 3,max : 10},
    password : {type : String,required : true, min : 8 , max : 20 }
})

const ContentSchema : Schema = new Schema({
    link : {type : String,required : true},
    type : {type :String,required : true},
    title : {type : String,required : true},
    userId : {type : String, required : true},
    tags : [{type : Types.ObjectId, ref : "Tag"}],
    user : {type : Types.ObjectId, ref : "User"}
})

const TagSchema = new Schema({
    title : {type : String,required : true}
})

const LinkSchema = new Schema({
    hash :  {type : String,required : true},
    share : {type : Boolean, default : false},
    userId : {type : String, required : true},
    user : {type : Types.ObjectId, ref : "User"} // use ref to relate db to another.
})

export const UserModel =  model("User",UserSchema);
export const TagModel = model("Tag",TagSchema);
export const LinkModel = model("Link",LinkSchema);
export const ContentModel = model("Content",ContentSchema);