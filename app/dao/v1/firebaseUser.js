const appFirebase = require("../../service/v1/firebase/authService");
const User = require('../../dto/v1/user');

const USER_ROLES = ['user', 'admin', 'superadmin'];

getUserList = async (nextPageToken)=>{
        let result = [];
        listUsersResult = await appFirebase.auth().listUsers(1000, nextPageToken);
        listUsersResult.users.forEach((userRecord) => {
            let user = new User(
                userRecord.displayName,
                userRecord.email,
                userRecord.disabled,
                userRecord.photoURL,
                userRecord.uid,
                userRecord.customClaims
            );
            result.push(user);
        });
        if (listUsersResult.pageToken) {
            // List next batch of users.
            result= result.concat(await getUserList(listUsersResult.pageToken));
        }
        return result;
}

validateUserToken = async  (token, uid) => {
    decodeToken = await appFirebase.auth().verifyIdToken(token);
    return decodeToken.uid == uid;
}
addClaims = async (uid, roles)=>{

    let user = await appFirebase.auth().getUser(uid);
    if(user && roles){
        let result = await appFirebase.auth().setCustomUserClaims(uid, roles);
    }
}
function convertToClaimObject(rolesArray){
    return rolesArray.reduce((acc,curr) => ({...acc, [curr]:true}), {});
}

getUserClaims = async (uid) => {
    if(!uid)
        return null;
    let user = await getUserByUid(uid);
    return user.customClaims;
}

getUserByUid = async (uid) =>{
    if(!uid)
        return null;
    return await appFirebase.auth().getUser(uid);
}

getUserByEmail = async (email) => {
    if(!email)
        return null;
    return await appFirebase.auth().getUserByEmail(email);
}

updateUserStatus = async (uid, status)=>{
    return await appFirebase.auth().updateUser(uid,{
        disabled: status
    });
}


exports.getUserList = getUserList;
exports.validateUserToekn = validateUserToken;
exports.getUserByUid = getUserByUid;
exports.getUserByEmail = getUserByEmail;
exports.addClaims = addClaims;
exports.getUserClaims = getUserClaims;
exports.updateUserStatus = updateUserStatus;
