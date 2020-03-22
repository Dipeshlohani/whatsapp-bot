const mongoose=require("mongoose");

const AdminSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        roles:[
            {
                type:String,
                $in:["admin"]
            }
        ]
    },
    {
        collection:"admin",
        timeStamps:{
            createdAt: "created_at",
            updatedAt: "updated_at"
        },
        toObject: {
            virtuals: true
          },
        toJson: {
            virtuals: true
          }
    }
);

module.exports=mongoose.model("Admin",AdminSchema);