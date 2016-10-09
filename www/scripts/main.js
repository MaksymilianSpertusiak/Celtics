var server_url = "http://localhost:8080/Celtics_server/";
$(document).ready(function () {
    $("#touch_zone_start").click(function () {
        get_news_data();
    });
});

// NEWS FUNCTIONS

function get_news_data() {
    $("#back").css('visibility', 'hidden'); //hide news back button
    $.getJSON(server_url + 'index.php/Article/GetArticles', function (data) {
        display_news(data.articles);
    });
}

function display_news(articles) {
    $("#main_container").fadeOut(300);
    setTimeout(function () {
        var div_content = "";
        for (i = articles.length - 1; i >= 0; i--) {//Display from newest to oldest
            if (i == articles.length - 1) {
                $("#main_container").html("");
            }
            div_content = "<div id='news" + articles[i]['id'] + "' class='news'><p class='news_title'>" + articles[i]['title'] +
                "</p><div class='mini-img'><img src='" + server_url + "news/" + articles[i]['small_image_png'] + "' height='150' width='150'/></div>" +
                articles[i]['content'].substring(0, 200) + '...  <a href="#" onclick="display_specific_news(' + articles[i]['id'] + ')">Read More</a></div>';
            $("#main_container").append(div_content);
        }
        $(window).scrollTop(0);
    }, 310);
    $("#main_container").fadeIn(300);
}

function display_specific_news(id) {
    $("#back").unbind("click");
    $("#back").click(function () {
        back_news();
    });
    $("#main_container").fadeOut(300);
    var div_content = "";
    var url = server_url + "index.php/Article/GetArticle/" + id;
    setTimeout(function () {
    $.getJSON(url, function (data) {
        div_content = '<div class="full_news_content">' + "<div class='mini-img'><img src='" + server_url + "news/" + data.articles['small_image_png'] +
            "' height='150' width='150'/></div>" + data.articles['content'] +
            '</div>';
        load_news(div_content);
    });
    }, 310);
}
function load_news(content) {
    $("#back").css('visibility', 'visible');
    $("#main_container").html('');
    $("#main_container").html(content);
    $(window).scrollTop(0);
    $("#main_container").fadeIn(300);
}

function back_news() {
        get_news_data();
}

//PHOTOS FUNCTIONS

function get_gallery_data() {
    $.getJSON(server_url + 'index.php/Photos/GetPhotos', function (data) {
        display_gallery(data.photos);
    });
}

function display_gallery(photos) {
    $("#main_container").html("<div id='photos_container'><div>");
    for (i = 0; i < photos.length; i++) {
        var content = '<div class="photo_gallery"><a href="' + server_url + "gallery/" + photos[i]['big'] +
            '" class="swipebox" title="My Caption"><img src="' + server_url + "gallery/" + photos[i]['small'] + '" alt="' +
            photos[i]['name'] + '"></a>' + photos[i]['name'] + '</div>'
        $("#photos_container").append(content);
    }
}

function get_roster_data() {
    $.getJSON(server_url + 'index.php/Roster/GetPlayers', function (data) {
        display_roster(data.players);
    });
}

function display_roster(players) {
    $("#main_container").fadeOut(300);
    $("#main_container").fadeIn(300);
    setTimeout(function () {
        $("#main_container").html("");
        console.log(players);
        for (i = 0; i < players.length; i++) {
            console.log(players[i].name);
            var content = "<div class='roster_item'><img src='" + server_url + "roster/" + players[i].image +
            "' height='95' width='130'/>" + players[i].name + "</div>";
            $("#main_container").append(content);
        }
    }, 310);
}