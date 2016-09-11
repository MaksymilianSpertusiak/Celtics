$(document).ready(function () {
    $("#touch_zone_start").click(function () {
        get_news();
    });
});

// NEWS FUNCTIONS

function get_news() {
    $("#back").css('visibility', 'hidden'); //hide news back button
    $.getJSON('http://celtics.spertusiak.com.pl/index.php/Article/GetArticles', function (data) {
        display_news(data.articles);
    });
}

function display_news(articles) {
    var div_content = "";
    for (i = articles.length - 1; i >= 0; i--) {//Display from newest to oldest
        if (i == articles.length - 1) {
            $("#main_container").html("");
        }
        div_content = "<div id='news" + articles[i]['id'] + "' class='news'><p class='news_title'>" + articles[i]['title'] +
            "</p><div class='mini-img'><img src='http://spertusiak.com.pl/" + articles[i]['small_image_png'] + "' height='150' width='150'/></div>" +
            articles[i]['content'].substring(0, 200) + '...  <a href="#" onclick="read_news(' + articles[i]['id'] + ')">Read More</a></div>';
        $("#main_container").append(div_content);
    }
}

function read_news(id) {
    $("#main_container").fadeOut(500);
    var div_content = "";
    var url = "http://celtics.spertusiak.com.pl/index.php/Article/GetArticle/" + id;
    setTimeout(function () {
    $.getJSON(url, function (data) {
        div_content = '<div class="full_news_content">' + "<div class='mini-img'><img src='http://spertusiak.com.pl/" + data.articles['small_image_png'] +
            "' height='150' width='150'/></div>" + data.articles['content'] +
            '</div>';
        load_news(div_content);
    });
    }, 510);
}
function load_news(content) {
    $("#back").css('visibility', 'visible');
    $("#main_container").html('');
    $("#main_container").html(content);
    $(window).scrollTop(0);
    $("#main_container").fadeIn(500);
}

//PHOTOS FUNCTIONS

function get_gallery() {
    $.getJSON('http://celtics.spertusiak.com.pl/index.php/Photos/GetPhotos', function (data) {
        display_gallery(data.photos);
    });
}

function display_gallery(photos) {
    for (i = 0; i < photos.length; i++) {
        var content = '<a href="http://celtics.spertusiak.com.pl/gallery/' + photos[i]['big'] +
            '" class="swipebox" title="My Caption"><img src="http://celtics.spertusiak.com.pl/gallery/' + photos[i]['small'] + '" alt="' + photos[i]['name'] + '"></a>'
        $("#photos_container").append(content);
    }
}