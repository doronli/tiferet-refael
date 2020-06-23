/*Both 'googleApiClient', 'googleApiKey' functions and 'var request = ...' aren't really necessary. You could simple include this:
src="https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=4&playlistId={YOUR_PLAYLIST_ID}&key={YOUR_API_KEY}"
before </body>"*/

//Create script to google api

//
var favoriteVideos = [];
var allVideo = [];
var listPlaylist = [
  {
    id: "PLmEkPiivqLRXos72fznKVJYOQ7GvRV4Ex",
    title: "דף יומי",
    maxResult: 6,
    divId: "daf-yomi",
  },
  {
    id: "PLmEkPiivqLRWUcy4K1Is8DlAY1hqoS_Xc",
    title: "שיעור מרכזי",
    maxResult: 8,
    divId: "main-torah-lesson",
  },
  {
    id: "PLmEkPiivqLRW7QbBzg75-lDkbPRkedNSg",
    title: "שיעור בצרפתית",
    maxResult: 3,
    divId: "french-torah-lesson",
  },
];

function googleApiClient() {
  var script = document.createElement("script");
  script.src = "https://apis.google.com/js/client.js?onload=googleApiKey";
  document.getElementsByTagName("body")[0].appendChild(script);
}

// Load and grant access to youtube api
function googleApiKey() {
  //Put your Api Key here
  var apiKey = "AIzaSyCNJf1KkOjXqBIP8J7x1gKPGdxWFPnbf_Q";
  gapi.client.setApiKey(apiKey);
  gapi.client.load("youtube", "v3", function () {
    if (window.location.href.indexOf("torahvideos") > -1) {
      // torah videos page
      const listObj = getListObject();
      playlistItem(listObj);

    } else if (window.location.href.indexOf("favoritelesson") > -1) {
      // favorite lesson page
      favoriteVideos = localStorage.getItem("allFavoriteVideoes");
      if (favoriteVideos) {
        favoriteVideos = JSON.parse(favoriteVideos);
        loadFavoriteVideos();
      }
    } else {
      favoriteVideos = localStorage.getItem("allFavoriteVideoes");
      if (favoriteVideos > 0) {
        favoriteVideos = JSON.parse(favoriteVideos);
      }
      else{
        favoriteVideos = [];
      }
      listPlaylist.forEach(playlistItem);
    }
  });
}

//
function loadFavoriteVideos() {
  $("#favorite-lesson-list").html("");

  for (let i = 0; i < favoriteVideos.length; i++) {
    creatYoutubeVideoContainer("favorite-lesson-list", favoriteVideos[i], "");
  }
  $(".fa-star").addClass("checked");
}

// get object of list ID when we are in torahvideos.html page
function getListObject() {
  const currentLocation = window.location.href;
  const index = currentLocation.indexOf("listId=");
  let listId;
  index > -1
    ? (listId = currentLocation.substring(index + 7, currentLocation.length))
    : (listId = "PLmEkPiivqLRWUcy4K1Is8DlAY1hqoS_Xc");
  return {
    id: listId,
    title: "",
    maxResult: 50,
    divId: "all-lesson-list",
  };
}

// request playlistItem data
function playlistItem(list, index) {
  var request = gapi.client.youtube.playlistItems.list({
    part: "snippet",
    playlistId: list.id,
    maxResults: list.maxResult,
  });
  //Get reponse(data.json) from request
  request.execute(function (response) {
    //Verify any error and display
    if ("error" in response) {
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

// Display Video in html
function showVideo(divId) {
  for (var i = 0; i < allVideo.length; i++) {
    if (allVideo[i].title !== "Deleted video") {
      creatYoutubeVideoContainer(divId, allVideo[i].videoId, allVideo[i].title);
    }
  }
  allVideo = [];
}

// create youtube video container
function creatYoutubeVideoContainer(divId, videoId, videoTitle) {
  var container = document.getElementById(divId);
  var videoDiv = document.createElement("div");
  videoDiv.className = "col-lg-4 my-lg-4 youtube-video";
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src", "https://www.youtube.com/embed/" + videoId);
  $(videoDiv).append(
    `<p class="text-center youtube-video-title">${videoTitle}</p>`
  );
  container.appendChild(videoDiv);
  videoDiv.appendChild(iframe);
  if (favoriteVideos.indexOf(videoId) === -1) {
    $(videoDiv).append(`<p class=" w-100 text-center"> 
      <span class="fa fa-star" data-video-id="${videoId}"></span>
      </p>`);
  } else {
    $(videoDiv).append(`<p class=" w-100 text-center"> 
      <span class="fa fa-star checked" data-video-id="${videoId}"></span>
      </p>`);
  }
}

// click on star (favorite video)
$("#all-torah-lesson-section").on("click", ".fa-star", function () {
  const videoId = $(this).data("video-id");

  if ($(this).hasClass("checked")) {
    $(this).removeClass("checked");
    removeVideoToFavorite(videoId);
  } else {
    $(this).addClass("checked");
    addVideoToFavorite(videoId);
  }
  localStorage.setItem("allFavoriteVideoes", JSON.stringify(favoriteVideos));
});

// uncheck favorite lesson from favorite lesson
$("#favorite-lesson-list").on("click", ".fa-star", function () {
  const videoId = $(this).data("video-id");
  $(this).removeClass("checked");
  removeVideoToFavorite(videoId);
  localStorage.setItem("allFavoriteVideoes", JSON.stringify(favoriteVideos));
  $("#favorite-lesson-list").html("");
  loadFavoriteVideos();
});

// add video to local storage
function addVideoToFavorite(videoId) {
  if (favoriteVideos.indexOf(videoId) === -1) {
    favoriteVideos.push(videoId);
  }
  $("#success-alert").show(300);
  setTimeout(() => $("#success-alert").hide(300), 4000);
}

// remove video from local storage
function removeVideoToFavorite(videoId) {
  const index = favoriteVideos.indexOf(videoId);
  if (index > -1) {
    favoriteVideos.splice(index, 1);
    $("#danger-alert").show(300);
    setTimeout(() => $("#danger-alert").hide(300), 2000);
  }
}

$(document).ready(() => {
  googleApiClient();

});
