let score = Number(document.getElementById('score-number').innerText);
let highscore = Number(document.getElementById('best-number').innerText);



// Set grid pada awal game
function setCells() {
    let cellList = document.querySelectorAll('.grid-cell');
    // Add row and col classes to all cells
    let row = 1;
    let col = 1;
    for (let i = 0,cell; cell = cellList[i]; i++) {
        let rc = 'row'+row;
        let cc = 'col'+col;
        cell.classList.add(rc, cc);
        col += 1 ;
        if (col > 4){
            col = 1;
            row += 1;
        }
    }
}

function addNewRandomBlock(numOfBlock) {
    for (let i = 0; i < numOfBlock; i++){
        let emptyCells = document.querySelectorAll('.empty');
        let posRandom = Math.floor((Math.random()) * (emptyCells.length-1));
        let cell = emptyCells[posRandom];
        addBlock(cell, 2);
    }
}
function addBlock(elCell, blockNumVal) {
    let gb = document.createElement('div');
    gb.innerText = blockNumVal;
    gb.classList.add('grid-block');
    let sLen =  blockNumVal.toString().length;
    // Font-size scaling
    if ( sLen > 3){
        let scale = 0.85;
        let factor = (sLen - 3);
        let initialFontSize = 55;
        let finalFontSize = initialFontSize*(scale**factor);
        strFontSize = finalFontSize.toString() + 'px';
        gb.style.fontSize = strFontSize;
    }
    elCell.appendChild(gb);
    elCell.classList.remove('empty');
}
function deleteFirstElBlock (elCell) {
// yang didelete firstChild buat ngatasin yang merge block
    let deleted = elCell.firstElementChild;
    elCell.removeChild(deleted);
    if (elCell.childNodes.length == 0){
        elCell.classList.add('empty');
    }
}
function updateScore(addPts){
    score += addPts;
    if (score > highscore) {
        highscore = score;
    }
    document.getElementById('score-number').innerText = score;
    document.getElementById('best-number').innerText = highscore;
}
function getAllRows() {
    let r1List = document.querySelectorAll('.row1');
    let r2List = document.querySelectorAll('.row2');
    let r3List = document.querySelectorAll('.row3');
    let r4List = document.querySelectorAll('.row4');
    let rows = [r1List,r2List,r3List,r4List];
    return rows;
}
function getAllCols(){
    let c1List = document.querySelectorAll('.col1');
    let c2List = document.querySelectorAll('.col2');
    let c3List = document.querySelectorAll('.col3');
    let c4List = document.querySelectorAll('.col4');
    let cols = [c1List, c2List, c3List, c4List];
    return cols;
}
function isGameOver(){
    if (document.querySelectorAll('.empty').length > 0){
        return false;
    } else {
        let rows = getAllRows();
        let cols = getAllCols();
        let found = false;
        let i = 0;
        while (!found && i < 4) {
            let row = rows[i], col = cols[i];
            let j = 0;
            while ( !found && j < 3) {
                if ( (isBlockValEqual(row[j],row[j+1])) || (isBlockValEqual(col[j],col[j+1])) ){
                    found = true;
                } else {
                    j++;
                }
            }
            if (!found) {
                i++;
            }
        }
        if (!found){
            return true;
        } else {
            return false;
        }
    }
}
// MOVING FUNCTIONS

function isCellOnEdge(elCell, dir) {
    if (dir == 'right') {
        return (elCell.classList.contains('col4'));
    } else if (dir == 'left') {
        return (elCell.classList.contains('col1'));
    } else if (dir == 'up') {
        return (elCell.classList.contains('row1'));
    } else if (dir == 'down') {
        return (elCell.classList.contains('row4'));
    }
}
function isCellEmpty (elCell) {
    return (elCell.classList.contains('empty'));
}
function isBlockValEqual(elList1,elList2) {
    // I.S Input Cell tidak boleh kosong dan harus hanya berisi 1 block
    let val1 = Number(elList1.firstElementChild.innerText);
    let val2 = Number(elList2.firstElementChild.innerText);
    return (val1 === val2);
}

function animateBlock (rowColList, startPos, distToLastEmptyCell, dir, blockMoved){
    let moved = false;
    let mvClass = "move" + dir;
    let lastEmptyPos, lastPos;
    if (dir == "right" || dir == "down"){
        lastEmptyPos = startPos+distToLastEmptyCell;
        lastPos = lastEmptyPos+1;
    } else if (dir == "up" || dir == "left"){
        lastEmptyPos = startPos-distToLastEmptyCell;
        lastPos = lastEmptyPos-1;
    }
    if (!isCellOnEdge(rowColList[lastEmptyPos], dir)){
        if (isBlockValEqual(rowColList[startPos],rowColList[lastPos])){
            let val1, val2, newVal;
            val1 = Number(rowColList[startPos].firstElementChild.innerText);
            deleteFirstElBlock(rowColList[startPos]);
            val2 = Number(rowColList[lastPos].firstElementChild.innerText);
            newVal = val1+val2;
            var strNewVal = newVal.toString();
            addBlock(rowColList[lastPos], strNewVal);
            mvClass += (distToLastEmptyCell+1);
            rowColList[lastPos].lastElementChild.classList.add(mvClass);
            deleteFirstElBlock(rowColList[lastPos]);
            setTimeout(function(){
                rowColList[lastPos].lastElementChild.classList.remove(mvClass);
            },100);
            rowColList[lastPos].firstElementChild.classList.add("enlarge");
            moved = true;
            blockMoved.num += 1;
            updateScore(newVal);
        } 
    } 
    if (!moved && distToLastEmptyCell>0) { //sebelahnya kosong semua
        currentVal = rowColList[startPos].innerText;
        deleteFirstElBlock(rowColList[startPos]);
        addBlock(rowColList[lastEmptyPos], currentVal);
        mvClass += distToLastEmptyCell;
        rowColList[lastEmptyPos].lastElementChild.classList.add(mvClass);
        blockMoved.num += 1;
    }
}

function isArrowKey (key) {
    return (key >= 37 && key <= 40);
}

function move(){
    window.addEventListener('keydown', function(e){
        let gameOver = isGameOver();
        if (!gameOver){
            key = e.which;
            if (isArrowKey(key)){
                rowList = getAllRows();
                colList = getAllCols();
                let blockMoved = {num: 0};
                if (key == 39 || key == 40){
                    let currentList;
                    let dir;
                        if (key == 39){
                            currentList = rowList;
                            dir = "right";
                        } else if (key == 40) {
                            currentList = colList;
                            dir = "down";
                        }
                        for (let i = 0,erl; erl = currentList[i]; i++){
                            for (let j = (erl.length - 1);j >= 0; j--){ //iterate backward
                                if (!isCellEmpty(erl[j])){
                                    if (!isCellOnEdge(erl[j], dir)) {
                                        let moveDistance = 0;
                                        while((j+moveDistance+1 <= erl.length-1)  && isCellEmpty(erl[j + moveDistance + 1])){
                                            moveDistance++;
                                        }
                                        animateBlock(erl, j, moveDistance, dir, blockMoved);
                                    }
                                }
                            }
                        }
                } else if (key == 37 || key == 38){
                    let currentList;
                    let dir;
                        if (key == 37){
                            currentList = rowList;
                            dir = "left";
                        } else if (key == 38) {
                            currentList = colList;
                            dir = "up";
                        }
                        for (let i = 0,erl; erl = currentList[i]; i++){
                            for (let j = 0;j <= (erl.length - 1); j++){ //iterate forward
                                if (!isCellEmpty(erl[j])){
                                    if (!isCellOnEdge(erl[j], dir)) {
                                        let moveDistance = 0;
                                        while((j-moveDistance-1 >= 0)  && isCellEmpty(erl[j - moveDistance - 1])){
                                            moveDistance++;
                                        }
                                        animateBlock(erl, j, moveDistance, dir, blockMoved);
                                    }
                                }
                            }
                        }
                    }
                if (blockMoved.num > 0){
                    addNewRandomBlock(1);
                }
            }
        } else {
            showGameOverScr();
        }
    });
}
function bestTile(){
    let rows = getAllRows();
    let best = 2;
    for (let i = 0,erl; erl = rows[i]; i++){
        for (let j = 0;j <= (erl.length - 1); j++){
            if (Number(erl[j].innerText) > best){
                best = Number(erl[j].innerText);
            }
        }
    }
    return best;
}
function showGameOverScr(){
    let tileContent = 'YOUR BEST TILE : ' + bestTile().toString();
    let content = document.getElementById("best-tile");
    let screenOver = document.getElementById("gameover-scr");
    content.innerText = tileContent;
    content.classList.add('flydown');
    screenOver.classList.remove('restart');
    screenOver.classList.add("over");
    document.getElementById('start-btn').innerText = 'Restart';
    document.getElementById('start').classList.add('wiggle');
    document.getElementById("best-tile").style.display = "block";
}
function hideGameOverScr(){
    if (document.getElementById("gameover-scr").classList.contains('over')){
        document.getElementById("gameover-scr").classList.add('restart');
    }
    setTimeout(function(){
        document.getElementById("gameover-scr").classList.remove('over');
    },200);
    document.getElementById("best-tile").style.display = "none";
}
function resetGame(){
    document.getElementById('start').addEventListener('click', function(e){
        e.preventDefault();
        hideGameOverScr();
        cellList = document.querySelectorAll('.grid-cell');
        for (let i = 0, cell; cell = cellList[i]; i++){
            cell.innerHTML = '';
            cell.classList.add('empty');
        }
        score = 0;
        document.getElementById('score-number').innerText = score;
        setTimeout(function(){
            addNewRandomBlock(2);
        },200);
        document.getElementById('start-btn').innerText = 'New Game';
        document.getElementById('start').classList.remove('wiggle');
    })
}



resetGame();
setCells();
move();
setTimeout(addNewRandomBlock(2), 300);
