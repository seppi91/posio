var progressBar = null
var socket = io.connect('//' + document.domain + ':' + location.port);


$(document).ready(function () {
    // Create the progress bar
    progressBar = new ProgressBar.Line('#progress', {
        color: '#FCB03C',
        duration: $('#progress').data('max-response-time') * 1000
    });

    socket.on('end_of_turn', showPlayerResults);
    // socket.on('new_turn', handleNewTurn);
    // socket.on('leaderboard_update', updateLeaderboard);
    // join_admin();
});

function join_admin() {
    setTimeout(function() {
        socket.on('end_of_turn', showPlayerResults);
    }, 600)
}

function start_turn(gameId) {
    socket.emit('start_turn', gameId)
    progressBar.animate(1);
}

function end_turn(gameId) {
    socket = io.connect('//' + document.domain + ':' + location.port);
    socket.emit('end_turn', gameId)
    progressBar.set(0);
}

function showPlayerResults(data) {
    if ("p1" in data || "p2" in data) {
        $("#result1").html(data.p1);
        $("#result2").html(data.p2);
    }
}