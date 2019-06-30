let widthImage = 2000;
let heightImage = 667;
let pieceWidth = widthImage / 6;
let pieceHeight = heightImage / 2;

let size;
let chess;

let offset;
let pieceFrom;
let pieceTo;

let game;

const columnsLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const rowNumber = [8, 7, 6, 5, 4, 3, 2, 1];

function preload() {
    pieces = loadImage('resources/pieces/chess_pieces.png');
}
function setup() {
    createCanvas(500, 500);
    size = width / 8;
    chess = new Chess();
    frameRate(60);
}
function draw() {
    background('white');


    if (!chess.game_over()) {

        var rows = splitTokens(chess.fen(), '/');
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                showBoard(column, row);
                var move = { from: pieceFrom, to: pieceTo };
                chess.move(move);
            }
        }


        for (let row = 0; row < 8; row++) {
            offset = 0;
            for (let column = 0; column < 8; column++) {
                const element = rows[row][column];
                imageMode(CORNER);
                let fenNumber = parseInt(element);
                if (!isNaN(fenNumber)) {
                    offset = fenNumber-1 ;
                } else {
                    if (pieceFrom != columnsLetter[column] + rowNumber[row]) {
                        showPiece(element, (column + offset) * size, row * size);
                    } else {
                        movePieceWithMouse(element);
                    }
                }
            }
        }
    }
}



function boardPosition(x, y, column, row) {
    var result = null;
    if (x >= column * size && x <= column * size + size && y >= row * size && y <= row * size + size) {
        result = columnsLetter[column] + rowNumber[row];
    }
    return result;
}

function mouseClicked() {
    if (pieceFrom != undefined && pieceTo != undefined) {
        pieceFrom = undefined;
        pieceTo = undefined;
    }
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            if (boardPosition(mouseX, mouseY, column, row) != undefined && pieceFrom == undefined) {
                pieceFrom = boardPosition(mouseX, mouseY, column, row);
            } else if (boardPosition(mouseX, mouseY, column, row) != undefined && pieceTo == undefined) {
                pieceTo = boardPosition(mouseX, mouseY, column, row);
            }
        }
    }
}








function movePieceWithMouse(element) {
    imageMode(CENTER);
    showPiece(element, mouseX, mouseY);
}

function showPiece(char, x, y) {
    const black = 1;
    const white = 0;
    switch (char) {
        case 'k':
            king(x, y, black);
            break;
        case 'q':
            queen(x, y, black);
            break;
        case 'b':
            bischop(x, y, black);
            break;
        case 'n':
            knight(x, y, black);
            break;
        case 'r':
            rook(x, y, black);
            break;
        case 'p':
            pawn(x, y, black);
            break;
        case 'K':
            king(x, y, white);
            break;
        case 'Q':
            queen(x, y, white);
            break;
        case 'B':
            bischop(x, y, white);
            break;
        case 'N':
            knight(x, y, white);
            break;
        case 'R':
            rook(x, y, white);
            break;
        case 'P':
            pawn(x, y, white);
            break;
        default:
            break;
    }
}





function showBoard(column, row) {
    var darkGreen = '#769656';
    var lightGreen = '#eeeed2';
    var xPos = column * size;
    var yPos = row * size;
    if ((column + row) % 2 == 0) {
        fill(lightGreen);
    } else {
        fill(darkGreen);
    }
    rect(xPos, yPos, size, size);
}

function king(x, y, z) {
    image(pieces, x, y, size, size, 0, pieceHeight * z, pieceWidth, pieceHeight);
}

function queen(x, y, z) {
    image(pieces, x, y, size, size, pieceWidth, pieceHeight * z, pieceWidth, pieceHeight);
}

function bischop(x, y, z) {
    image(pieces, x, y, size, size, pieceWidth * 2, pieceHeight * z, pieceWidth, pieceHeight);
}

function knight(x, y, z) {
    image(pieces, x, y, size, size, pieceWidth * 3, pieceHeight * z, pieceWidth, pieceHeight);
}

function rook(x, y, z) {
    image(pieces, x, y, size, size, pieceWidth * 4, pieceHeight * z, pieceWidth, pieceHeight);
}

function pawn(x, y, z) {
    image(pieces, x, y, size, size, pieceWidth * 5, pieceHeight * z, pieceWidth, pieceHeight);
}
