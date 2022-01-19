var express = require('express');
const boom = require('@hapi/boom');
var router = express.Router();

const {isFirebaseTokenValid, tokenHasClaim} = require("../../middleware/v1/user.middleware");


const appFirebase = require("../../service/v1/firebase/authService");
const {getUserList, addClaims, getUserClaims, updateUserStatus} = require("../../dao/v1/firebaseUser")

router.get("/list",
    isFirebaseTokenValid,
    tokenHasClaim('admin'),
    async (req, res, next)=>{
       try{
           let result = await getUserList();
           res.status(200).json({users:result});
       }catch (e){
           next(boom.badRequest(e));
       }
    });

router.put('/user-status/:uid/:status',
    isFirebaseTokenValid,
    tokenHasClaim('admin'),
    async (req, res, next)=>{
    try{
        const {status, uid} = req.params;
        await updateUserStatus(uid, status ==='true');
        res.status(200).json({result:'ok'});
    }catch(e){
        next(boom.badRequest(e));
    }
});

router.post('/add-claims',
    isFirebaseTokenValid,
    tokenHasClaim('admin'),
    async (req, res, next)=>{
    try{
        const {uid, roles} =  req.body;
        if(uid && roles){
            await addClaims(uid, roles)
            res.status(200).json({result:'ok'});
        }else{
            next(boom.badRequest('uid and roles can not be empty'));
        }
    }catch (e) {
        next(boom.badRequest(e));
    }
});
router.get('/user-claims/:uid',
    isFirebaseTokenValid,
    tokenHasClaim('admin'),
    async (req, res, next) =>{
   try{
       let uid = req.params.uid;
       let claims = await getUserClaims(uid)
       res.status(200).json({claims: claims});
   }catch (e){
       next(boom.badRequest(e));
   }
});
module.exports = router;
