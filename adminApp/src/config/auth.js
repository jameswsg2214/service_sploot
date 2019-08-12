// config/auth.js
// expose our config directly to our application using module.exports chupinchina tutorial follow ayya i want to give it in createUser API
module.exports = {

    'facebookAuth' : {
        'clientID'      : '434741197058-aubt03vk9p96akp019j9c3m6k2d7vct4.apps.googleusercontent.com', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '434741197058-aubt03vk9p96akp019j9c3m6k2d7vct4.apps.googleusercontent.com',
        'clientSecret'  : 'qSRfatdevyvWei3M72NCRJNy',
        'callbackURL'   : 'http://localhost:3001/auth/google/callback'
    }

};