module.exports = class User {

    constructor(name = '',
                email ='',
                isDisable = false,
                photoUrl ='',
                uid ='',
                customClaims = {}) {
        this.email = email;
        this.name = name;
        this.isDisable = isDisable;
        this.photoUrl = photoUrl;
        this.uid = uid;
        this.customClaims = customClaims;
    }
}
