const { timeStamp } = require('console');
const mongoose = require('mongoose');

const addDoctorSchema = new mongoose.Schema({
    name : String,
    lname : String,
    email : String,
    password : String,
    profile : String,
    code : Number,
    verify : Boolean,
    experities : String,
    experience : String,
    education : String,
    qualification : String,
} , {timestamps : true});

const UserAccountSchema = new mongoose.Schema({
    name : String,
    lname : String , 
    email : String ,
    location : String,
    password : String , 
    profile : String ,
    code : Number , 
    verify : Boolean
} , {timestamps : true});



const AddDoctor = new mongoose.model('Doctor' , addDoctorSchema);
const UserAccount = new mongoose.model('UserAccount' , UserAccountSchema);

module.exports = {
    AddDoctor,
    UserAccount
};