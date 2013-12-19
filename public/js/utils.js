var GUIutils = {

	getNormalFbPic : function (fbid, picElementId) {

		$.getJSON('http://graph.facebook.com/'+fbid+'/picture?type=normal&redirect=false', function(pic){
			console.log(pic.data.url);
			$('#'+picElementId).attr('src', pic.data.url);
		});

	},

	getLargeFbPic : function (fbid, picElementId) {

		$.getJSON('http://graph.facebook.com/'+fbid+'/picture?type=large&redirect=false', function(pic){
			console.log(pic.data.url);
			$('#'+picElementId).attr('src', pic.data.url);
		});

	},
	getSmallFbPic : function (fbid, picElementId) {

		$.getJSON('http://graph.facebook.com/'+fbid+'/picture?type=small&redirect=false', function(pic){
			console.log(pic.data.url);
			$('#'+picElementId).attr('src', pic.data.url);
		});

	}
};
