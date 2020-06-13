/*Both 'googleApiClient', 'googleApiKey' functions and 'var request = ...' aren't really necessary. You could simple include this:
src="https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=4&playlistId={YOUR_PLAYLIST_ID}&key={YOUR_API_KEY}"
before </body>"*/

//Create script to google api

var listPlaylist = [
    {
        id: "PLmEkPiivqLRXos72fznKVJYOQ7GvRV4Ex",
        title: "דף יומי",
        maxResult: 6,
        divId: "daf-yomi"
    },
    {
        id: "PLmEkPiivqLRWUcy4K1Is8DlAY1hqoS_Xc",
        title: "שיעור מרכזי",
        maxResult: 6,
        divId: "main-torah-lesson"
    },
    {
        id:"PLmEkPiivqLRW7QbBzg75-lDkbPRkedNSg",
        title: "שיעור בצרפתית",
        maxResult: 3,
        divId: "french-torah-lesson"
    }
];
function googleApiClient() {
    var script = document.createElement('script');
    script.src = "https://apis.google.com/js/client.js?onload=googleApiKey";
    document.getElementsByTagName('body')[0].appendChild(script);
  }
  
  //Load and grant access to youtube api
  function googleApiKey() {
    //Put your Api Key here
    var apiKey = 'AIzaSyCNJf1KkOjXqBIP8J7x1gKPGdxWFPnbf_Q';
    gapi.client.setApiKey(apiKey);
    gapi.client.load('youtube', 'v3', function() {
        listPlaylist.forEach(playlistItem);
    //   playlistItem();
    });
  }



  var allVideo=[];

  //request playlistItem data
  function playlistItem(list, index) {
    var request = gapi.client.youtube.playlistItems.list({
      part: 'snippet',
      playlistId: list.id,
      maxResults: list.maxResult
    });
    //Get reponse(data.json) from request
    request.execute(function(response) {
      //Verify any error and display
      if ('error' in response) {
        console.log(response.error.message);
      } 
      //OK - show especify data.json
      else {
          for (var i = 0; i < response.items.length; i++) {
            var objVideo = {};
            objVideo.videoId = response.items[i].snippet.resourceId.videoId;
            objVideo.title = response.items[i].snippet.title;
            objVideo.date = response.items[i].snippet.publishedAt;
            allVideo.push(objVideo);
        }
      }
      showVideo(list.divId);
    });
  }
  
  //Display Video in html
  function showVideo(divId) {

    var container = document.getElementById(divId);
    for (var i = 0; i < allVideo.length; i++) {
      var videoDiv = document.createElement("div");
      videoDiv.className = "col-lg-4 my-lg-4";
      var iframe = document.createElement("iframe"); 
      iframe.setAttribute("src", "https://www.youtube.com/embed/" + allVideo[i].videoId);
      $(videoDiv).append(`<p class="text-center">${allVideo[i].title}</p>`);
      container.appendChild(videoDiv);
      videoDiv.appendChild(iframe);
    }
    allVideo = [];
  }
  
  
  googleApiClient();
  
  