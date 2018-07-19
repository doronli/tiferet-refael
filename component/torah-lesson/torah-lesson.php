
<?php
echo "<h1>hello world</h1>"
     header("Access-Control-Allow-Origin: *");
     //Get videos from channel by YouTube Data API
    $API_key    = 'AIzaSyBqrf7yTHMdrSRXAFW40n9i69GCj3V5uCM';
    $channelID  = 'UC7ENUB5fJwOfraFqLi4oEJA';
    $videoList = json_decode(file_get_contents('https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId='.$channelID.'&maxResults='.$maxResults.'&key='.$API_key.''));
    
     echo '<div class="youtube-video">vldkslds</div>'
    foreach($videoList->items as $item){
    //Embed video
    if(isset($item->id->videoId)){
        echo '<div class="youtube-video">
                <iframe width="280" height="150" src="https://www.youtube.com/embed/'.$item->id->videoId.'" frameborder="0" allowfullscreen></iframe>
                <h2>'. $item->snippet->title .'</h2>
            </div>';
    }
}
?>
