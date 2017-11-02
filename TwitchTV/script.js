let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let result = [];
let fetchAPI = (type,channel) => {
    let url = `http://wind-bow.glitch.me/twitch-api/${type}/${channel}`;
    // console.log(url);
    fetch(url).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
        type === 'channels' ? sortChannelData(data) : jasofj(data)
    });
};

channels.forEach(function(channelName){
    fetchAPI('channels',channelName);
});

let sortChannelData = (data) => {
    result.push({"name" : data.display_name, "description" : data.status, "logo" : data.logo, "url" : data.url});
};
