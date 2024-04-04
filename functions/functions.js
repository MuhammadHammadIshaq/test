// const mongoose = require('mongoose');
const { AddDoctor, UserAccount } = require("../model/model");
const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken")



const Send_Mail = ( to, subject , htmlData ) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.ACC_PASSWORD,
    },
  });

  let mailOptions = {
    from: `TrustCare Medical group<${process.env.EMAIL}>`,
    to: to,
    subject: subject,
    html : htmlData,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
};



const insertDoctorData = async (data) => {
  let generateCode = Math.floor(Math.random() * 99999999);
  let Cod_send = `<div><div style="font-size: 30px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: 600; text-align: center; margin-bottom: 10px;">TrustCare Medical Group </div><div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 600;color: rgb(44, 44, 44);font-size: 25px;text-align: center;list-style: none;">Hy Dr. Munawwar</div><br /><p style="text-align: center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> Welcome To Our Team , You Are Joining Now as a Doctor For Online Appointment </p><br /><p style="text-align: center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Your Account Verification Code Is <span style="color: grey; font-weight: 700">${generateCode}</span></p><div style="width: 90%; background-color: white; box-shadow: 0 0 2px 2px rgba(128, 128, 128, 0.457); margin: auto; border-radius: 5px; padding: 20px;"><h2>Your Account Information</h2><li style="list-style:none;">Name - <span style="font-weight: 600; color: grey">${data.name}</span></li><li style="list-style:none;">Email - <span style="font-weight: 600; color: grey">${data.email}</span></li><li style="list-style:none;">Password -<span style="font-weight: 600; color: grey">${data.password}</span><li style="list-style:none;"> Qualification - <span style="font-weight: 600; color: grey">${data.qualification}</span></li></li><li style="list-style:none;">Experience - <span style="font-weight: 600; color: grey">${data.experience}</span></li><li style="list-style:none;">Experities - <span style="font-weight: 600; color: grey">${data.experities}</span></li><li style="list-style:none;">Education - <span style="font-weight: 600; color: grey">${data.education}</span></li></div>`

  Send_Mail(data.email , 'Account Verification Code' , Cod_send)
  const Data = new AddDoctor({
    name: data.name,
    email: data.email,
    lname : data.lname,
    profile: data.profile,
    code : generateCode,
    password: data.password,
    verify: false,
    experities : data.experities,
    experience : data.experience,
    education : data.education,
    qualification : data.qualification
  });
  await Data.save();
};

//  * verifyToken

const verifyToken = (tok) => {
 let verify = jwt.verify(tok , process.env.SECRET_KEY) 
 if(verify){
  return verify
 }else{
  return false
 }
}

const createToken = (data) => {
  const token = jwt.sign(data, process.env.SECRET_KEY);
  return token;
}

const createUserAccount = async (data) => {
  let generateCode = Math.floor(Math.random() * 99999999);
  let Cod_send = `<div><div style="font-size: 30px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: 600; text-align: center; margin-bottom: 10px;">TrustCare Medical Group </div><div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 600;color: rgb(44, 44, 44);font-size: 25px;text-align: center;list-style: none;">Hy Dr. Munawwar</div><br /><p style="text-align: center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> Welcome To TrustCare Medical group , Your Account Has Been Created </p><br /><p style="text-align: center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Your Account Verification Code Is <span style="color: grey; font-weight: 700">${generateCode}</span></p><div style="width: 90%; background-color: white; box-shadow: 0 0 2px 2px rgba(128, 128, 128, 0.457); margin: auto; border-radius: 5px; padding: 20px;"><h2>Your Account Information</h2><li style="list-style:none;">Name - <span style="font-weight: 600; color: grey">${data.name}</span></li><li style="list-style:none;">Email - <span style="font-weight: 600; color: grey">${data.email}</span></li><li style="list-style:none;">Password -<span style="font-weight: 600; color: grey">${data.password}</span></li>`;

  let userData = new UserAccount({
    name : data.name,
    lname : data.lname,
    password : data.password,
    email : data.email,
    profile : data.profile,
    location : data.location,
    code : generateCode,
    verify : false
  });

  await userData.save();
  return true;
}

module.exports = {
  insertDoctorData,
  Send_Mail,
  verifyToken,
  createToken,
  createUserAccount,
}