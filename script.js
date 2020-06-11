function onGoogleLoad() {
    gapi.client.setApiKey('AIzaSyCNJf1KkOjXqBIP8J7x1gKPGdxWFPnbf_Q');
    gapi.client.load('youtube', 'v3', function() {

        var request = gapi.client.youtube.playlistItems.list({
            part: 'snippet',
            playlistId: 'PLmEkPiivqLRW7QbBzg75-lDkbPRkedNSg',
            maxResults: 50
        });

        request.execute(function(response) {
            for (var i = 0; i < response.items.length; i++) {
                console.log(response.items[i].snippet.title + " published at " + response.items[i].snippet.publishedAt)
            }
        });
    });
}