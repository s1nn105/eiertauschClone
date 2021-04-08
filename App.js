document.addEventListener('DOMContentLoaded', () => {


    const grid = document.querySelector(".MagicGrid");
    const width = 8;
    const matchSize = 3;
    let score = 0;
    let timeLeft = 10000;
    let decreaseModifier = 1;
    let statusDecrease = 10;//the decrease every second
    const statusBar = document.getElementById("statusBar")
    let pointPerField = 1;
    const timePerField = 20;
    const MAIN_SELECTED_BORDER = "3px solid #d6ff08";
    const DEFAULT_BORDER = "3px solid black";//this needs to match with the CSs Default border !! elf
    const SELECTED_ADJACENT_BORDER = "3px solid #d6ff08";

    let firstSelected = null;
    const scoreDisplay = document.getElementById("ScoreDisplay");
    const squares = [];
    const colorImageDict = {
        'red': "eggRed.png",
        'yellow': 'eggYellow.png',
        'orange': 'eggOrange.png',
        'green': 'eggBlack.png',
        'blue': 'eggBlue.png'
    }
    const candyImages = [
        'eggRed.png',
        'eggYellow.png',
        'eggOrange.png',
        'eggBlack.png',
        'eggBlue.png'
    ]
    const candyColors = [
        'red',
        'yellow',
        'orange',
        'green',
        'blue']

    function createBoard() {

        for (let i = 0; i < width * width; i++) {
            /* const square = document.createElement('div');
            let randColor = Math.floor(Math.random() * candyColors.length);
            square.style.backgroundColor = candyColors[randColor];*/
            const square = createTile();
            square.setAttribute('id', i);
            grid.appendChild(square);
            squares.push(square);

        }
    }

    createBoard();

    function createTile() {
        const square = document.createElement('div');
        let randColor = Math.floor(Math.random() * candyColors.length);
        console.log(candyImages[randColor])
        square.style.backgroundImage = `url(${candyImages[randColor]})`;
        console.log(randColor)
        return square;
    }

    function setAdjacentBorder(center, newStyle) {
        let possibleMoves = [
            center - 1,
            center - width,
            center + width,
            center + 1
        ];

        possibleMoves = possibleMoves.filter(index => index >= 0 && index <= width * width);
        possibleMoves = possibleMoves.filter(pos => Math.abs(Math.abs(pos%width) - Math.abs(center %width))<2 || Math.abs(center-pos)===width);//check for row break
        possibleMoves.forEach(ppos => squares[ppos].style.border = newStyle);
    }

    function clickEvent(tile) {

//case one we have nothing selected
        if (firstSelected == null) {
            firstSelected = parseInt(tile.path[0].id);
            colorBeingDragged = squares[firstSelected].style.backgroundColor;
            squares[firstSelected].style.border = MAIN_SELECTED_BORDER;
            setAdjacentBorder(firstSelected, SELECTED_ADJACENT_BORDER);
            return;
        }
        //if we are here one is already selected
        let validMoves = [
            firstSelected - 1,
            firstSelected - width,
            firstSelected + width,
            firstSelected + 1
        ];

        let secondSelected = parseInt(tile.path[0].id);


        //case 2 we want to unselect one tile
        //we need to be able to unselect
        if (secondSelected === firstSelected) {
            squares[firstSelected].style.border = "";
            setAdjacentBorder(firstSelected, DEFAULT_BORDER)


            firstSelected = null
            return;
        }
        console.log(secondSelected)
        colorBeingReplaced = squares[secondSelected].style.backgroundColor;
        validMoves= validMoves.filter(pos => Math.abs(pos%width - firstSelected %width)<2 || Math.abs(firstSelected-pos)===width);//check for row break

        let validMove = validMoves.includes(secondSelected);

        //case 3 we want to select a other first tile by clicking a tile that is out of reach
        if (!validMove) {
            setAdjacentBorder(firstSelected, DEFAULT_BORDER);
            squares[firstSelected].style.border =DEFAULT_BORDER;
            secondSelected = null;
            firstSelected = null;
            clickEvent(tile)
//case 4 we swap
        } else if (secondSelected && validMove) {
            console.log("success")
            setTileColor(squares[secondSelected], colorBeingDragged);
            setTileColor(squares[firstSelected], colorBeingReplaced)
            setAdjacentBorder(firstSelected, DEFAULT_BORDER)
            squares[firstSelected].style.border = DEFAULT_BORDER;
            firstSelected = null;
            secondSelected = null;
        }


    }

    function setTileColor(tile, color) {
        tile.style.backgroundColor = color;
        console.log(color)
        if (color) {
            tile.style.backgroundImage = `url(${colorImageDict[color]})`

        }
        console.log(colorImageDict[color])
    }


    squares.forEach(square => square - addEventListener("click", clickEvent))
    //anything commented out is the drag and drop thingy


    //matches 3 in a row
    function checkRow() {
        for (let i = 0; i <= width * width - matchSize; i++) {
            let rowToCheck = [i, i + 1, i + 2];
            const notValid = [width - 2, width - 1, 2 * width - 2, 2 * width - 1, 3 * width - 2, 3 * width - 1, 4 * width - 2, 4 * width - 1, 5 * width - 2, 5 * width - 1, 6 * width - 2, 6 * width - 1, 7 * width - 2, 6 * width - 1, 7 * width - 2, 7 * width - 1];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';
            if (notValid.includes(i)) {
                continue
            }
            if (rowToCheck.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                let lowerBound = rowToCheck[0];
                let upperBound = rowToCheck[rowToCheck.length - 1];

                for (lowerBound; lowerBound >= 0; lowerBound--) {
                    if (squares[lowerBound].style.backgroundColor === decidedColor) {
                        rowToCheck.push(lowerBound);
                    } else {
                        break;
                    }
                }
                for (upperBound; upperBound < width * width; upperBound++) {
                    if (squares[upperBound].style.backgroundColor === decidedColor) {

                        rowToCheck.push(upperBound);
                    } else {
                        break;
                    }
                }
                rowToCheck.forEach(index => {
                    squares[index].style.backgroundColor = '';
                    score += pointPerField;
                });

            }

        }
    }

    //matches 3 in a column
    function checkColumn() {
        for (let i = 0; i < width * (width - matchSize + 1); i++) {
            let rowToCheck = [i, i + width, i + 2 * width];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';
            if (rowToCheck.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                let upperBound = rowToCheck[rowToCheck.length - 1];

                for (upperBound; upperBound < width * (width - 1); upperBound += width) {
                    if (squares[upperBound].style.backgroundColor === decidedColor) {

                        rowToCheck.push(upperBound);
                    } else {
                        break;
                    }
                }


                rowToCheck.forEach(index => {
                    squares[index].style.backgroundColor = '';
                    score += pointPerField;
                    timeLeft += timePerField;
                    decidedColor += (1 / 100) * (1 / timePerField)
                });
            }

        }
    }


    function moveDown() {
        for (i = 0; i < (width * (width - 1)) - 1; i++) {
            if (squares[i + width].style.backgroundColor === '') {
                setTileColor(squares[i + width], squares[i].style.backgroundColor);
                squares[i].style.backgroundColor = '';
            }
            const isFirstRow = i < width;
            if (isFirstRow && squares[i].style.backgroundColor === '') {
                let randomColor = Math.floor(Math.random() * candyColors.length);
                setTileColor(squares[i], candyColors[randomColor]);
            }
        }
    }

    function updateTime() {

        if (timeLeft > 10000) {
            timeLeft = 10000;
        } else {
            timeLeft -= statusDecrease * decreaseModifier;

        }
        statusBar.style.width = timeLeft / 100 + "%";
        if (timeLeft <= 0) {
            console.log("game End")
            alert("GameEnded")
            window.clearInterval(intervals)
        }
    }


    var intervals = window.setInterval(function () {
        moveDown();
        checkRow();
        checkColumn();
        updateTime();
    }, 100)
    window.setInterval(function () {
        scoreDisplay.innerHTML = `Punkte: ${score}`;
    }, 400)


})