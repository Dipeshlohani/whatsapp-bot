const AdminModel=require("./admin.model");
const bcrypt=require("bcryptjs");

const checkAuth=async payload=>{
    let user=await AdminModel.findOne({email:payload.email}).exec();
    if(!user){
        return Promise.resolve({ message: "Email or Password is incorrect. Please try again" })
    }
    let chkPass = await bcrypt.compare(payload.password, user.password);
    if(chkPass){
        return user;
    }
    return Promise.resolve({ message: "Email or Password is incorrect. Please try again" });
}

const createAdmin=async payload=>{
    let email=await  AdminModel.findOne({email:payload.email}).exec();
    if(email){
        return Promise.resolve({ message: "User Already Exists" });
    }
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(payload.password, salt);
    payload.password = hash;  
    let data=await AdminModel.create(payload);
    return data;      
}

module.exports={checkAuth,createAdmin};