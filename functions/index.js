const functions = require('firebase-functions');
var express = require('express');
var router = express.Router();
var path = require('path');
var Twitter = require('twitter');

const app=express();
 
var client = new Twitter({
  consumer_key: 'N1DBiFzNylPROQGtl153wc15W',
  consumer_secret: 'enb0NzWur9FvjGFkkE7ZjAXThGoL60gXsDuXuSPO783sPcYDTP',
  access_token_key: '1252174080268283904-a7CaiEQJhBwWQm5vt63ZPQoHjsEmzM',
  access_token_secret: 'SaCC0gmWTjHuV8jE4C8ovpSxLSMCX8pJzGxpSTFVqjWed'
});


router.get('/', function(req, res, next) {
  console.log("sigh");
  res.sendfile(path.join(__dirname+'/../functions/views/index.html'));

  //res.end(__dirname);
});

router.post('/',function(req,res){
	var params = {screen_name: req.body.screen_name};
	console.log(params);
	console.log(req.body.screen_name);
	console.log(req.body);
	var oneway = [];
	var onewaystring;
	var users_to_display = [];

	client.get('followers/ids', params, function(error, follower_results, response){
		if (error){
			throw error;
		}
		var followers= follower_results.ids;
		client.get('friends/ids',params, function(error, following_results, response){
			if (error){
				throw error
			}
		var following = following_results.ids
		if (following!=undefined){
			following.forEach(function (person){
				if(followers.indexOf(person)===-1){
					oneway.push(person);
				}
			});
		}
			oneway =oneway.slice(0,99);
			var onewaystring = oneway.join();

			client.get('users/lookup',{user_id: onewaystring}, function(error, user_results,response){
				if(user_results!=undefined){
				user_results.forEach(function (user){
					var onewayfollower={
						id:user.id,
						name:user.name,
						screen_name: user.screen_name,
						avatar:user.profile_image_url
					};
				onewayfollower.avatar=onewayfollower.avatar.replace("normal","reasonably_small")
				users_to_display.push(onewayfollower);
				});	
			}
				res.end(JSON.stringify(users_to_display));
			})
		})
})

})
module.exports = router;



exports.app = functions.https.onRequest(app);

