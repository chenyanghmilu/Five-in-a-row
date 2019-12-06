/*----- variables -----*/
var chessboard = document.getElementsByClassName('chessboard')[0];
var button = document.getElementsByClassName('reset')[0];
var msgEl = document.getElementById('msg');
var color = 'black';
var dataArr = [];
var win = false;
var chessSound = document.getElementsByClassName('chessboard')[0];

/*----- event listeners -----*/
createBoard();
chessboard.addEventListener('click', setChess);
button.addEventListener('click', reset);
chessSound.addEventListener('click', playSound);

/*----- functions -----*/
//create chessboard
function createBoard() {
    for (let i = 0; i < 15; i++) {
        dataArr[i] = [];
        for (let j = 0; j < 15; j++) {
            let subdiv = document.createElement('div');
            subdiv.className = 'chess';
            subdiv.id = i + '-' + j;
            chessboard.appendChild(subdiv);
            if (i == 0) {
                subdiv.className += ' top';
            }
            if (i == 14) {
                subdiv.className += ' bottom';
            }
            if (j == 0) {
                subdiv.className += ' left';
            }
            if (j == 14) {
                subdiv.className += ' right';
            }
        }
    }
}

//create chess and set chess location
function setChess(event) {
    let setchess = event.target;
    let location = setchess.id.split('-');
    let i = parseInt(location[0]),//convert string to num
        j = parseInt(location[1]);        
    if (setchess.className !== 'chessboard') {
        if (setchess.className.indexOf('set') == -1) {
            setchess.className += ' set ' + color;            
            dataArr[i][j] = color;
            getWinner(i, j, color);
            color = color == 'black' ? 'white' : 'black';
            if (!win) {
                getColor(color);
            }
        }
    }
}

//get player's color
function getColor(color) {
    if (color == 'black') {
        msgEl.innerHTML = '<h3 id="black">BLACK TURN</h3>';
    } else {
        msgEl.innerHTML = '<h3 id="white">WHITE TURN</h3>';
    }
}

//win algorithm
function getWinner(i, j, color) {
    let count = 1;
    let row;
    let column;

    //check vertically
    for (row = i + 1; row < 15 && row < i + 5; row++) {
        if (dataArr[row] && dataArr[row][j] == color) {
            count++;
            render(count, color);
        } else {
            break;
        }
    }
    for (row = i - 1; row >= 0 && row > i - 5; row--) {
        if (dataArr[row] && dataArr[row][j] == color) {
            count++;
            render(count, color);
        } else {
            break;
        }
    }

    //check horizontal
    count = 1;
    for (column = j + 1; j < 15 && j < j + 5; column++) {
        if (dataArr[i] && dataArr[i][column] == color) {
            count++;
            render(count, color);
        } else {
            break;
        }
    }
    for (column = j - 1; j >= 0 && j > j - 5; column--) {
        if (dataArr[i] && dataArr[i][column] == color) {
            count++;
            render(count, color);
        } else {
            break;
        }
    }

    //check diagonal 135degree \
    count = 1;
    for (row = i + 1, column = j + 1; row < 15 && column < 15 && row < i + 5 && column < j + 5; row++, column++) {
        if (dataArr[row] && dataArr[row][column] == color) {
            count++;
            render(count, color);
        } else {
            break;
        }
    }
    for (row = i - 1, column = j - 1; row >= 0 && column >= 0 && row > i - 5 && column > j - 5; row--, column--) {
        if (dataArr[row] && dataArr[row][column] == color) {
            count++;
            render(count, color);
        } else {
            break;
        }
    }

    //check diagonal 45degree /
    count = 1;
    for (row = i - 1, column = j + 1; row >= 0 && column < 15 && row > i - 5 && column < j + 5; row--, column++) {
        if (dataArr[row] && dataArr[row][column] == color) {
            count++;
            render(count, color);
        } else {
            break;
        }
    }

    for (row = i + 1, column = j - 1; row < 15 && column >= 0 && row < i + 5 && column > j - 5; row++, column--) {
        if (dataArr[row] && dataArr[row][column] == color) {
            count++;
            render(count, color);
        } else {
            break;
        }
    }
}

//render
function render(num, color) {
    if (num == 5) {
        if (color == 'black') {
            alert("BLACK WIN");
        } else {
            alert("WHITE WIN");
        }
        win = true;
        chessboard.removeEventListener('click', setChess);//click involid when got winner
    } else {
        win = false;
    }
}

function reset() {
    //format data
    for (let i = 0; i < 15; i++) {
        let resetArr = [];
        for (let j = 0; j < 15; j++) {
            resetArr.push('');
        }
        dataArr[i] = resetArr;
    }
    //recover inital setting
    color = 'black';
    msgEl.innerHTML = '<h3 id="msg"></h3>';
    chessboard.addEventListener('click', setChess);
    //clear chess
    let divCollection = chessboard.getElementsByTagName('div');
    let len = divCollection.length;
    let divClassName;
    for (let i = 0; i < len; i++) {
        divClassName = divCollection[i].className;
        //clear chess visually
        if (divClassName.indexOf('set black') != -1) {
            divClassName = divClassName.replace('set black', '');
            divCollection[i].className = divClassName;
        }
        if (divClassName.indexOf('set white') != -1) {
            divClassName = divClassName.replace('set white', '');
            divCollection[i].className = divClassName;
        }
    }
}

function playSound(){
    let audio = document.getElementById('audio');
    audio.play();
}