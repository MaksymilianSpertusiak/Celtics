$(document).ready(function () {
    $("#touch_zone_start").click(function () {
        $.getJSON('http://celtics.spertusiak.com.pl/index.php/Article/GetArticle', function (data) {
            display_News(data.articles);
        });
    });
});

function display_News(articles) {
        var div_content = "";
        for (i = 0; i < articles.length; i++) {
            if (i == 0) {
                $("#news_container").html("");
            }
            div_content = "<div id='news" + articles[i]['id'] + "' class='news'><p class='news_title'>" + articles[i]['title'] +
                "</p><div class='mini-img'><img src='http://spertusiak.com.pl/" + articles[i]['small_image_png'] + "' height='150' width='150'/></div>" +
                articles[i]['content'].substring(0, 200) + "...  <a href='#fullnews" + articles[i]['id'] + "'>Read More</a></div>";
            $("#news_container").append(div_content);
            //add news pages with full content
            remove_news('fullnews' + articles[i]['id']);
            var news_page = '<div data-role="page" id="fullnews' + articles[i]['id'] + '">' +
            '<div data-role="header" data-position="fixed" class="main_bar">' +
                '<a href="#side_menu' + articles[i]['id'] + '" class="ui-btn ui-icon-bars ui-btn-icon-notext ui-nodisc-icon" id="hamburger">Menu</a>' +
                '<a href="#" class="ui-btn ui-icon-back ui-btn-icon-right ui-btn-icon-notext ui-nodisc-icon" id="back" data-rel="back">back</a>' +
                '<h1>News</h1>' +
            '</div>' +
            '<div role="main" class="ui-content">' +
            '<div class="full_news_content">' + "<div class='mini-img'><img src='http://spertusiak.com.pl/" + articles[i]['small_image_png'] + "' height='150' width='150'/></div>" + articles[i]['content'] +
            '</div>' +
                '<div data-role="panel" id="side_menu' + articles[i]['id'] + '" data-display="overlay" data-position="left">' +
                    '<ul data-role="listview" data-icon="false">' +
                        '<li data-role="list-divider">News</li>' +
                        '<li><a href="#news" data-rel="close">Latest news</a></li>' +
                        '<li><a href="#" data-rel="close">Photos</a></li>' +
                        '<li><a href="#" data-rel="close">Video</a></li>' +
                        '<li data-role="list-divider">Team</li>' +
                        '<li><a href="#">Roster</a></li>' +
                        '<li><a href="#">Stats</a></li>' +
                        '<li data-role="list-divider">Season</li>' +
                        '<li><a href="#">Schedule</a></li>' +
                        '<li><a href="#">Standings</a></li>' +
            '</ul>' +
                '</div>' +
            '</div>' +
            '<div data-role="footer" data-position="fixed" class="main_bar">' +
                '<h4>Celtics</h4>' +
            '</div>' +
        '</div>';
            $("body").append(news_page);
        }
}

function remove_news(id) { //function to avoid duplication of news, when reload resources
    element = document.getElementById(id);
    if (element) {
        element.parentNode.removeChild(element);
    }
}