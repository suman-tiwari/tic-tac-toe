var cells = document.querySelectorAll('.cell');
var player = "O";
var clickCount = 0;
var winner;
displayCurrentPlayer();
selectPlayer();

$(cells).each(function (index, box) {
    $(box).one('click', function () {
        $('#choose-player').addClass('d-none');
        cell = this;
        this.innerText = player;

        clickCount += 1;
        setPlayer();

        // if number of clicks is 5 or more then only check the winner
        setTimeout(function () {
            if (clickCount >= 5) {
                checkRow(getBoxDataValue(cell));
                checkColumn(getBoxDataValue(cell));
                checkDiagonal(getBoxDataValue(cell));
            }

            if (winner == undefined && clickCount == 9) {
                displayAlert("Game is tie.");
            }
        }, 100);


    });
});

// get data position value of an element
function getBoxDataValue(elem){
    return $(elem)[0].getAttribute('data-value')
}

// function to set players and display player text
function setPlayer() {
    if (player==='O') {
        player = 'X';
    } else {
        player = 'O';
    }
    // display current player
    displayCurrentPlayer();
}

// select a player
function selectPlayer() {
    $('.xplayer').one('click', function () {
        player = 'X';
        $('#choose-player').addClass('d-none');
        displayCurrentPlayer();
    });
}

// append current player
function displayCurrentPlayer() {
    $('#current-player')[0].innerText = player + " )";
}

// check winner
function checkWinner(a, b, c) {
    if (a === b && b===c && a != null) {
        winner = a;
        displayAlert("Winner is: " + winner);
    }
}

// display alert message and load page
function displayAlert(msg) {

    alert(msg);
    window.location.reload();
}

// get rowise box value
function getBoxValue(dataVal){
    return $('[data-value="'+dataVal+'"]').text()
}
// check row
function checkRow(dataValue) {
    let i = dataValue.split('')[0];
    checkWinner(getBoxValue(i+'1'), getBoxValue(i+'2'), getBoxValue(i+'3'))
}

// check column
function checkColumn(dataValue) {
    let i = dataValue.split('')[1];
    checkWinner(getBoxValue('1'+i), getBoxValue('2'+i), getBoxValue('3'+i))
}

// check diagonal
function checkDiagonal(dataValue) {
    let i = dataValue.split('')[0];
    let j = dataValue.split('')[1];
    if (i === j) {
        checkWinner(getBoxValue('11'), getBoxValue('22'), getBoxValue('33'))
    } else {
        checkWinner(getBoxValue('13'), getBoxValue('22'), getBoxValue('31'))
    }
}