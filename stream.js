var Twit = require('twit'); 

module.exports = exports = function(terms, keys) {
    
    var T = new Twit(keys);

    var stream = T.stream('nytimes', { replies: false });

    var badtweetReg = /^[RT|@]/;

    var isRetweet = function isRetweetOrReply (tweet){
        return  tweet.retweeted_status || badtweetReg.test( tweet.text);
    };

    var handleTweet = function handleTweet (tweet){
        console.log('├ User: ' + tweet.user.name);
        console.log('├ Handle: @' + tweet.user.screen_name);
        console.log('├ Message: ' + tweet.text);
        console.log('│')
    };

    stream.on('connect', function(request){
        console.log('┌ TWITTER STREAMING API');
        console.log('├ Attempting to connect to Twitter...');
        console.log('├╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶');
    });

    stream.on('connected', function(request){
        console.log('└ ✔ Successfully connected to endpoint');
        console.log('┌ TWEETS');
    });

    stream.on('limit', function (limitMessage) {
        console.log('├ Limit message received');
        console.log('└  ' + limitMessage);
    });

    stream.on('disconnect', function (disconnectMessage){
        console.log("├ ⚠ Disconnected with the following message:")
        console.log('└ ' + diconnectMessage);
        return 1;
    });

    stream.on('warning', function (warning){
        console.log('├ Warning received');
        console.log('└  ' + warning);
    });

    stream.on('tweet', function (tweet){
        if(!isRetweet(tweet)){
            handleTweet(tweet);
        } else{
            console.log('┌ ');
            console.log('├ Retweet or @message rejected: ' + tweet.text);
            console.log('└ ');
        }
    });
};