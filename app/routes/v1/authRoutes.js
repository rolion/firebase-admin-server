var express = require('express');
var router = express.Router();

const {isFirebaseTokenValid} = require("../../middleware/v1/user.middleware");


const appFirebase = require("../../service/v1/firebase/authService");
const {getUserList, addClaims, getUserClaims, updateUserStatus} = require("../../dao/v1/firebaseUser")

router.get("/list", isFirebaseTokenValid,async (req, res, next)=>{
    let result = await getUserList();
    res.status(200).json({users:result});
});

router.put('/user-status/:uid/:status', async (req, res, next)=>{
    try{
        const {status, uid} = req.params;
        await updateUserStatus(uid, status ==='true');
        res.status(200).json({result:'ok'});
    }catch(e){
        console.log(e);
        next(e);
    }
});

router.post('/add-claims', async (req, res, next)=>{
    try{
        console.log(req.body);
        const {uid, roles} =  req.body;
        if(uid && roles){
            await addClaims(uid, roles)
            res.status(200).json({result:'ok'});
        }else{
            console.log('uid and roles can not be empty');
            next(400);
        }
    }catch (e) {
        console.log(e);
        next(400);
    }
});
router.get('/user-claims/:uid', async (req, res, next) =>{
   try{
       //console.log('uid',req.params.uid);
       let uid = req.params.uid;
       let claims = await getUserClaims(uid)
       res.status(200).json({claims: claims});
   }catch (e){
       console.log(e);
       next(400);
   }
});
module.exports = router;
