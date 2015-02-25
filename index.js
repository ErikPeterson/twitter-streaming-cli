var prompt = require('prompt');
var stream = require('./stream');
var fs = require('fs');
var keys = {};

var saveKeys = function saveKeys(keystore) {
    var filestr = "module.exports = exports = " + keystore.toString() + ";"
    fs.write('./keyStore.js', filestr, function (err) {
        if (err) throw err;
    });
};

fs.exists('./keyStore.js', function(exists){
    
    if (exists) {
        keys = require('./keyStore.js');
    } else {
        keys = {};
    }


var getKeysAndTermsThenStream = function getKeysAndTermsThenStream (){
    prompt.start();

    prompt.get({ 
        
        properties: {
            consumer_key: {
                description: 'Consumer Key:',
                type: 'string',
                required: true
            },
            consumer_secret: {
                description: 'Consumer Key:',
                type: 'string',
                required: true
            },
            access_token: {
                description: 'Consumer Key:',
                type: 'string',
                required: true
            },
            access_token_secret: {
                description: 'Consumer Key:',
                type: 'string',
                required: true
            },
            searchterms: {
                type: 'array',
                required: true,
                maxItems: 5
            }
        }

    }, function(err, result){
        if(err) throw err;
        
        keys = {
            consumer_key: result.consumer_key, 
            consumer_secret: result.consumer_secret, 
            access_token: result.access_token, 
            access_token_secret: result.access_token_secret
        };

        saveKeys(keys);

        stream(result.searchterms, keys);
    });

};

var getTermsThenStream = function getTermsThenStream (){
    prompt.start();
    
    prompt.get({
        properties: {
            searchterms: {
                type: 'array',
                required: true,
                maxItems: 5
            }
        }
    }, function(err, result){
        stream(result.searchterms, keys);                              
    });
};

if(!keys.consumer_key || !keys.consumer_secret || !keys.access_token || !keys.access_token_secret){
    getKeysAndTermsThenStream();
} else {
    getTermsThenStream();
}


});