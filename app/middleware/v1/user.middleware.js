const appFirebase = require("../../service/v1/firebase/authService");
const isAdmin = (req, res, next)=>{

}

const isFirebaseTokenValid  = async (req, res, next) => {
	try{
		const bearer = req.headers['authorization'].split(' ');
		const idToken = bearer[1];
		//const idToken = req.headers.authorization.substr(6);
		console.log('idToken ', idToken);
		let decodeToken = await appFirebase.auth().verifyIdToken(idToken);
		console.log('decodeToken', decodeToken);
		next();
	}catch(e){
		console.log(e);
		next(e);
	}
}

exports.isFirebaseTokenValid = isFirebaseTokenValid;