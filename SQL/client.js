var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var headers = defaultCorsHeaders;


var getMessages = function(roomName){
    roomName = roomName || "messages";
    $.ajax('http://127.0.0.1:8080/classes/' + roomName, {
      contentType: 'application/json',
      headers: headers,
      success: function(data){

        var dataChunk = JSON.parse(data);
        $('#message-list').empty();
        for (var i = 0; i < dataChunk.length; i++){
          $('#message-list').append('<li><span class="username">' + dataChunk[i].username + ': </span>' + dataChunk[i].message + '</li>');
        }
      },
      error: function(data) {
        console.log('Ajax request failed');
      }
    });
};

var refreshMessages = function(roomName){
  setInterval(function(){
    getMessages(roomName);
  }, 5000);
};

var sendMessage = function(user, string, roomName){
  // var userNameEncode = window.location.search.substr(window.location.search.indexOf("=") + 1);
  // var userNameString = decodeURIComponent(userNameEncode);
  // var userNameString = sessionStorage.username;
  roomName = roomName || "messages";
  $.ajax('http://127.0.0.1:8080/classes/' + roomName,{
    type: "POST",
    contentType: 'application/json',
    data: JSON.stringify({ message: string, username: user, roomname: roomName})
  });
};

// var createUser = function(username, password) {
//   $.ajax('https://api.parse.com/1/users',{
//     type: "POST",
//     contentType: 'application/json',
//     data: JSON.stringify({username: username, password: password, friendList: {} })
//   });
// };

// var loginUser = function(username, password) {
//   $.ajax('https://api.parse.com/1/login?username=' + username + "&password=" + password, {
//     type: "GET",
//     contentType: 'application/json',
//     success: function(data){
//       for(var key in data.friendList){
//         // var sessionFriends = jQuery.parseJSON(sessionStorage);
//         sessionStorage[key] = true;
//       }
//       sessionStorage.authToken = data.sessionToken;
//       sessionStorage.userId = data.objectId;
//       sessionStorage.username = data.username;
//     }
//   });
// };


// var addFriend = function(friendName) {
//   sessionStorage.setItem(friendName, true);
//   friends = sessionStorage;
//   console.log('https://api.parse.com/1/users/' + sessionStorage.userId);
//   $.ajax('https://api.parse.com/1/users/' + sessionStorage.userId, {
//     type: "PUT",
//     contentType: 'application/json',
//     data: JSON.stringify({friendList: friends})
//   });
// };

$(document).ready(function(){
  $('body').on('click', '.username', function(event){
      event.preventDefault();
      var friendName = $(this).text();
      console.log(friendName);
      $(this).css('color', 'green');
      console.log("yes");
      addFriend(friendName);

  });
});

setInterval(function(){
  var colorArray = [0,1,2,3,4,5,6,7,8,9, "a", "b", "c", "d", "e", "f"];
  var getRandomColor = function(colorArray){return colorArray[Math.floor(Math.random()*colorArray.length)]; };
  var randomColors = "#" + getRandomColor(colorArray) + getRandomColor(colorArray) + getRandomColor(colorArray) + getRandomColor(colorArray) + getRandomColor(colorArray) + getRandomColor(colorArray);

  $('.friend').css('background-color', randomColors);
}, 1000);
