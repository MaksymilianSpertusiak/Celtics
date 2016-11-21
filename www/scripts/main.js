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

 //ROSTER FUNCTIONS

function get_roster_data() {
    $.getJSON(server_url + 'index.php/Roster/GetPlayers', function (data) {
        display_roster(data.players);
    });
}

function display_roster(players) {
    $("#main_container").fadeOut(300);
    $("#main_container").fadeIn(300);
    setTimeout(function () {
        $("#main_container").html("<div id='roster_container'><div>");
        //console.log(players);
        for (i = 0; i < players.length; i++) {
            console.log(players[i].name);
            var content = "<div class='roster_item' id='player" + players[i].id + "' onclick='get_player_data(" + players[i].id + ")'><img src='" + server_url + "roster/" + players[i].image +
            "' height='95' width='130' style='float:left'/><div class='roster_number'>"
            + players[i].number + '</div><div class="roster_name">' + players[i].name + "</div><div class='roster_position'>"
            + players[i].position + "</div></div>";
            $("#roster_container").append(content);
        }
    }, 310);
}

function get_player_data(id) {
    $.getJSON(server_url + 'index.php/Roster/GetPlayer/' + id, function (data) {
        display_player(data.player);
    });
}

function display_player(player) {
    $("#roster_container").fadeOut(300);
    setTimeout(function () {
        $("#back").unbind("click");
        $("#back").click(function () {
            back_roster();
        });
        $("#back").css('visibility', 'visible');       
    }, 310);
    $("#roster_container").fadeIn(300);
    setTimeout(function () {
        console.log(player);
        $("#roster_container").html("<div class='roster_specific'><img src='" + server_url + "roster/" + player.image +
            "' height='95' width='130'/></div><div class='roster_bar'>PERSONAL INFORMATION</div><div class='roster_personal_inf'><p>Name: " + player.name + "</p><p>Country: " +
            player.country + "</p><p>Date of birth: " + player.date_of_birth + "</p><p>Height: " + player.height + " cm</p><p>Weight: " + player.weight + " kg</p><p>Number: " + 
            player.number + "</p><p>Prior to NBA: " + player.prior_to_nba + "</p><p>Years pro: " + player.years_pro + "</p></div>"
            + "<div class='roster_bar'>STATISTICS</div><div class='roster_statistics'>Statystyki gracza z obecnego sezonu</div><div class='roster_bar'>BIO</div><div class='bio'>" +
            player.bio + "</div>");
    }, 310);
}

function back_roster() {
    $("#back").css('visibility', 'hidden'); //hide news back button
    get_roster_data();
    //console.log("TEst back");
}

//SCHEDULE FUNCTIONS
function get_schedule_data() {
    $.getJSON(server_url + 'index.php/Schedule/GetSchedule', function (data) {
        display_schedule(data.game);
    });
}

function display_schedule(game) {
    $("#main_container").fadeOut(300);
    setTimeout(function () {
        $("#main_container").html("<div id='schedule_container'><div>");
        for (i = 0; i < game.length;i++){
            $("#schedule_container").append("<div class='schedule_game'><div class='game_date'>" + game[i].date +
                "</div><div class='schedule_team'>"
                + "<img src='" + server_url + "assets/schedule/" + game[i].opponent_logo +
            "' height='64' width='80'/>" + game[i].opponent + "</div><div class='schedule_arena'>Arena: " + game[i].arena + " </div></div>");
        }
    }, 310);
    $("#main_container").fadeIn(300);
    console.log(game);
}