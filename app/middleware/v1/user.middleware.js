const appFirebase = require("../../service/v1/firebase/authService");
const boom = require('@hapi/boom');
const isAdmin = (req, res, next)=>{

}

const isFirebaseTokenValid  = async (req, res, next) => {
	try{
		const bearer = req.headers['authorization'].split(' ');
		const idToken = bearer[1];
		console.log('idToken ', idToken);
		let decodeToken = await appFirebase.auth().verifyIdToken(idToken);
		req.headers['decodeToken'] = decodeToken;
		next();
	}catch(error){
		//console.log(e);
		next(boom.unauthorized(error));
	}
}

const tokenHasClaim = (claim) =>{
	return (req, res, next) => {
		let decodeToken =  req.headers['decodeToken']
		if(decodeToken[claim])
			next();
		else
			next(boom.unauthorized('user not allowed'));
	}
}

exports.isFirebaseTokenValid = isFirebaseTokenValid;
exports.tokenHasClaim = tokenHasClaim;
