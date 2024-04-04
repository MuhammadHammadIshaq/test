const express = require('express');
const { createDoctorAccountController , verifyAccountController , createUserAccountController} = require('../controller/controller');


// ! Route variable

const route = express.Router();

// * routes

route.post('/createDoctorAccount' , createDoctorAccountController)
route.get('/' , (req , res) => {
    res.send({
        success : true
    })
})
route.post('/verifyAccount' , verifyAccountController)
route.post('/createUserAccount' , createUserAccountController)
//  ! export Route 

module.exports = { 
    route
}