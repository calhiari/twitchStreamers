$(document).ready( function()
{
	//creating the matrix with the channel names
	var streamPpl = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

	//fetch info about each channel
	for (var i = 0; i < streamPpl.length; i++){
		$.ajax({
			url: "https://wind-bow.glitch.me/twitch-api/streams/" + streamPpl[i],
			async: false,
			dataType: 'json',
			success: function(data)
			{
				//if the channel is not streaming, do this
				if (data.stream === null){
					$.ajax({
						url: "https://wind-bow.glitch.me/twitch-api/channels/" + streamPpl[i],
						async: false,
						dataType: 'json',
						success: function(offlineData)
						{
							//if the channel does not exist, or was closed, do this
							if (offlineData.status === 404 || offlineData.status === 422){
								if (offlineData.status === 404){
									$(".container").append('<div class="row row-div"><div class="col-xs-2 logo"><img class="img-small img-responsive" src="' + "https://owensboro.kyschools.us/portals/0/Sutton/Images/StaffMembers/No%20Image.jpg?ver=2016-11-19-211337-060" + '"></div><div class="col-xs-4 name"><a href="https://www.twitch.tv/' + streamPpl[i] + '" target="null">' + streamPpl[i] + ' <i class="fa fa-external-link" aria-hidden="true"></i></a></div><div class="col-xs-6 status">DOES NOT EXIST</div></div>');
								}
								else {
									$(".container").append('<div class="row row-div"><div class="col-xs-2 logo"><img class="img-small img-responsive" src="' + "https://owensboro.kyschools.us/portals/0/Sutton/Images/StaffMembers/No%20Image.jpg?ver=2016-11-19-211337-060" + '"></div><div class="col-xs-4 name"><a href="https://www.twitch.tv/' + streamPpl[i] + '" target="null">' + streamPpl[i] + ' <i class="fa fa-external-link" aria-hidden="true"></i></a></div><div class="col-xs-6 status">CLOSED</div></div>');
								}
							}
							//if the channel is just not streaming, do this
							else {
								$(".container").append('<div class="row row-div"><div class="col-xs-2 logo"><img class="img-small img-responsive" src="' + offlineData.logo + '"></div><div class="col-xs-4 name"><a href="https://www.twitch.tv/' + streamPpl[i] + '" target="null">' + offlineData.display_name + ' <i class="fa fa-external-link" aria-hidden="true"></i></a></div><div class="col-xs-6 status">OFFLINE</div></div>');
							}
						} //end of function(offlineData)
					});
				} //end of if (data.stream === null)

				//if the channel is streaming, do this
				else{
					$(".container").append('<div class="row row-div"><div class="col-xs-2 logo"><img class="img-small img-responsive" src="' + data.stream.channel.logo + '"></div><div class="col-xs-4 name"><a href="https://www.twitch.tv/' + streamPpl[i] + '" target="null">' + data.stream.channel.display_name + ' <i class="fa fa-external-link" aria-hidden="true"></i></a></div><div class="col-xs-6 status">' + data.stream.channel.status + '</div></div>');
				}
			} //end of function(data)
		});
	} //end of the for loop
}); //end of $(document).ready()
