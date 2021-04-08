document.addEventListener('DOMContentLoaded', () => {


    const grid = document.querySelector(".MagicGrid");
    const width = 8;
    const matchSize = 3;
    let score = 0;
    let pointPerField = 1;
    const  scoreDisplay = document.getElementById("score");
    const squares = [];
    const candyColors = [
        'red',
        'yellow',
        'orange',
        'green',
        'blue']

    function createBoard() {

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            let randColor = Math.floor(Math.random() * candyColors.length);
            square.style.backgroundColor = candyColors[randColor];
            square.setAttribute('draggable', true);
            square.setAttribute('id', i);
            grid.appendChild(square);
            squares.push(square);

        }
    }
    createBoard();

    //add event Listener
    squares.forEach(squares => squares.addEventListener('dragstart', dragStart));
    squares.forEach(squares => squares.addEventListener('dragend', dragEnd));
    squares.forEach(squares => squares.addEventListener('dragover', dragOver));
    squares.forEach(squares => squares.addEventListener('dragenter', dragEnter));
    squares.forEach(squares => squares.addEventListener('drop', dragDrop));


    let colorBeingDragged;
    let colorBeingReplaced;
    let draggedId;
    let replacedId;

    function dragStart() {
        colorBeingDragged = this.style.backgroundColor;
        draggedId = parseInt(this.id);
    }


    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter() {
    }

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundColor;
        replacedId = parseInt(this.id);
        squares[draggedId].style.backgroundColor = colorBeingReplaced;
        squares[replacedId].style.backgroundColor = colorBeingDragged;
    }

    //check that moves are allowed
    function dragEnd() {
        let validMoves = [
            draggedId - 1,
            draggedId - width,
            draggedId + width,
            draggedId + 1
        ];
        let validMove = validMoves.includes(replacedId);
        if (replacedId && validMove) {
            replacedId = null;
        } else if (replacedId && !validMove) {
            squares[replacedId].style.backgroundColor = colorBeingReplaced;
            squares[draggedId].style.backgroundColor = colorBeingDragged;
        } else {
            squares[draggedId].style.backgroundColor = colorBeingDragged;
        }
    }


    //matches 3 in a row
    function checkRow() {
        for (let i = 0; i <= width * width - matchSize; i++) {
            let rowToCheck = [i, i + 1, i + 2];
            const notValid = [width - 2, width - 1, 2 * width - 2, 2 * width - 1, 3 * width - 2, 3 * width - 1, 4 * width - 2, 4 * width - 1, 5 * width - 2, 5 * width - 1, 6 * width - 2, 6 * width - 1, 7 * width - 2, 6 * width - 1, 7 * width - 2, 7 * width - 1];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';
            if(notValid.includes(i)){continue}
            if (rowToCheck.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                let lowerBound = rowToCheck[0];
                let upperBound = rowToCheck[rowToCheck.length-1];

                for(lowerBound;lowerBound>=0;lowerBound--){
                    if(squares[lowerBound].style.backgroundColor===decidedColor){
                        rowToCheck.push(lowerBound);
                    }else {
                        break;
                    }
                }
                for(upperBound;upperBound<width*width;upperBound++){
                    if(squares[upperBound].style.backgroundColor===decidedColor){

                        rowToCheck.push(upperBound);
                    }else {
                        break;
                    }
                }
                rowToCheck.forEach(index => {
                    squares[index].style.backgroundColor = '';
                    score+=pointPerField;
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
                let lowerBound = rowToCheck[0];
                let upperBound = rowToCheck[rowToCheck.length-1];

                for(upperBound;upperBound<width*(width-1);upperBound+=width){
                    if(squares[upperBound].style.backgroundColor===decidedColor){

                        rowToCheck.push(upperBound);
                    }else {
                        break;
                    }
                }





                rowToCheck.forEach(index => {
                    squares[index].style.backgroundColor = '';
                    score+=pointPerField;
                });
            }

        }
    }


    function moveDown(){
        for(i=0;i<(width*(width-1))-1;i++){
            if(squares[i+width].style.backgroundColor === ''){
                squares[i+width].style.backgroundColor = squares[i].style.backgroundColor;
                squares[i].style.backgroundColor='';
            }
            const isFirstRow = i<width;
            if(isFirstRow &&squares[i].style.backgroundColor===''){
                let randomColor = Math.floor(Math.random()*candyColors.length);
                squares[i].style.backgroundColor = candyColors[randomColor];
            }
        }
    }


    window.setInterval(function () {
        moveDown();
        checkRow();
        checkColumn();
    }, 100)
    window.setInterval(function (){
        scoreDisplay.innerHTML=score;
    },400)


})