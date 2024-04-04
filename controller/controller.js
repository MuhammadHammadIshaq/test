// * module import
const { response } = require("express");
const {
  insertDoctorData,
  createToken,
  verifyToken,
  createUserAccount,
} = require("../functions/functions");
const { AddDoctor, UserAccount } = require("../model/model");
// ! create doctor account constroller

const createDoctorAccountController = async (req, res) => {
  const {
    name,
    lname,
    email,
    password,
    education,
    experience,
    experities,
    profile,
    qualification,
  } = req.body;
  const checkMail = await AddDoctor.findOne({ email: email });

  if (!checkMail) {
    if (
      name.trim() &&
      lname.trim() &&
      email.trim &&
      password.trim &&
      education.trim() &&
      experience.trim()
    ) {
      if (name.trim().length > 3 && lname.trim().length > 3) {
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())
        ) {
          if (password.trim().length > 10) {
            if (
              insertDoctorData({
                name: name,
                lname: lname,
                email: email,
                password: password,
                experities: experities,
                education: education,
                experience: experience,
                profile: profile,
                qualification: qualification,
              })
            ) {
              let tok = createToken({
                name: name,
                lname: lname,
                email: email,
                password: password,
                experities: experities,
                education: education,
                experience: experience,
                profile: profile,
                qualification: qualification,
              });
              res.send({
                success: true,
                msg: "Account Created successfully",
                data: {
                  name,
                  lname,
                  email,
                  experities,
                  experience,
                  education,
                  qualification,
                  profile,
                },
                token: tok,
              });
            } else {
              res.send({
                success: false,
                msg: "An Error Accured",
              });
            }
          } else {
            res.send({
              success: false,
              msg: "Password Length must be at least 10 characters",
            });
          }
        } else {
          res.send({
            success: false,
            msg: "Please enter a valid email address",
          });
        }
      } else {
        res.send({
          success: false,
          msg: "Name or Last Name length must be greater than 3 characters",
        });
      }
    } else {
      res.send({
        success: false,
        msg: "Please Enter Account data",
      });
    }
  } else {
    res.send({
      success: false,
      msg: "Email is Already Used For Account",
    });
  }
};

// * verifyAccountController

const verifyAccountController = async (req, res) => {
  const { token, code } = req.body;
  if (verifyToken(token)) {
    let user = await AddDoctor.findOne({ email: verifyToken(token).email });
    if (user) {
      if (code === user.code) {
        await AddDoctor.updateOne(
          { _id: user._id },
          { $set: { verify: true, code: null } }
        );
        let userdata = await AddDoctor.findOne({ _id: user._id });
        let tok = createToken({
          name: userdata.name,
          lname: userdata.lname,
          email: userdata.email,
          password: userdata.password,
          experities: userdata.experities,
          education: userdata.education,
          experience: userdata.experience,
          profile: userdata.profile,
          qualification: userdata.qualification,
        });
        res.send({
          success: true,
          msg: "Verification Completed successfully",
          token: tok,
        });
      } else {
        res.send({
          success: false,
          msg: "Invalid verification Code",
        });
      }
    } else {
      res.send({
        success: false,
        msg: "An Error occurred",
      });
    }
  }
};

const createUserAccountController = async (req, res) => {
  const { name, lname, email, password, location } = req.body;
  let checkemail = await UserAccount.findOne({ email: email });
  if (checkemail) {
    res.send({
      success: false,
      msg: "Email Already Exixts",
    });
  } else {
    if (
      name.trim() &&
      lname.trim() &&
      email.trim &&
      password.trim &&
      location.trim()
    ) {
      if (name.trim().length > 3 && lname.trim().length > 3) {
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())
        ) {
          if (password.trim().length > 10) {
            if (createUserAccount(name, lname, email, password, location)) {
              let tok = createToken({
                name,
                lname,
                email,
                password,
                location,
              });
              res.send({
                success: true,
                msg: "Account Created successfully",
                data: {
                  name,
                  lname,
                  email,
                  password,
                  location,
                },
                token: tok,
              });
            } else {
              res.send({
                success: false,
                msg: "An Error Accured",
              });
            }
          } else {
            res.send({
              success: false,
              msg: "Password Length must be at least 10 characters",
            });
          }
        } else {
          res.send({
            success: false,
            msg: "Please enter a valid email address",
          });
        }
      } else {
        res.send({
          success: false,
          msg: "Name or Last Name length must be greater than 3 characters",
        });
      }
    } else {
      res.send({
        success: false,
        msg: "Please Enter Account data",
      });
    }
  }
};

// * exprt constrollers

module.exports = {
  createDoctorAccountController,
  verifyAccountController,
  createUserAccountController,
};
