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

function addNewRandomBlock(Num) {
    for (let i = 0; i < Num; i++){
        let emptyCells = document.querySelectorAll('.empty');
        let posRandom = Math.floor((Math.random()) * (emptyCells.length-1));
        let cell = emptyCells[posRandom];
        addBlock(cell);
    }
}
function addBlock(elCell) {
    let gb = document.createElement('div');
    gb.innerHTML = '2';
    gb.classList.add('grid-block');
    elCell.appendChild(gb);
    elCell.classList.remove('empty');
}
function deleteBlock (elCell) {
    elCell.innerHTML = '';
    elCell.classList.add('empty');
}
// MOVING FUNCTIONS

// inner function
// Syarat block bisa geser :
// 1. Gak dipojok,
// 2. Sebelahnya kosong,
// 3. Kalo ga kosong, val disebelahnya sama.
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
function isNextBlockEqual(elList, idx, dir) {
    let thisBlockVal = elList[idx].firstElementChild.innerHTML;
    let nextBlockVal;
    if (dir == 'right' || dir == 'down'){
        nextBlockVal = elList[idx+1].firstElementChild.innerHTML;
    } else if (dir == 'up' || dir == 'left'){
        nextBlockVal = elList[idx-1].firstElementChild.innerHTML;
    }
    
    return (thisBlockVal == nextBlockVal);
}

function animateBlock(elList, remDir1,remDir2,remDir3, addDir4) {
    
    
    // for (let i = 0; i < elList.length; i++){
    //     let tile = elList[i].children[0];
    //     tile.classList.remove(remDir1, remDir2, remDir3);
    //     tile.classList.add(addDir4);
    //     elList[i].innerHTML = '';
    //     elList[i].classList.add('.empty');
    //     console.log(tile);
    //     elList[i].nextSibling.class.remove('.empty');
    //     elList[i].nextSibling.innerHTML = tile;
    //     // tile.classList.remove(addDir4);
    // }
}
function isArrowKey (key) {
    return (key >= 37 && key <= 40);
}
function move(){
    window.addEventListener('keydown', function(e){
        key = e.which;
        if (isArrowKey(key)){
            let r1List = document.querySelectorAll('.row1');
            let r2List = document.querySelectorAll('.row2');
            let r3List = document.querySelectorAll('.row3');
            let r4List = document.querySelectorAll('.row4');
            let c1List = document.querySelectorAll('.col1');
            let c2List = document.querySelectorAll('.col2');
            let c3List = document.querySelectorAll('.col3');
            let c4List = document.querySelectorAll('.col4');
            rowList = [r1List,r2List,r3List,r4List];
            colList = [c1List, c2List, c3List, c4List];
            if (key == 39){ //right
                    for (let i = 0,erl; erl = rowList[i]; i++){
                        for (let j = (erl.length - 1);j >= 0; j--){ //iterate backwards
                            if (!isCellEmpty(erl[j])){
                                if (!isCellOnEdge(erl[j], "right")) {
                                    if (isCellEmpty(erl[j+1])){
                                        console.log("next is empty");
                                        //Animate
                                    } else if (isNextBlockEqual(erl, j, "right")) {
                                        console.log("next is equal");
                                        // Animate juga, tapi delete yang lama
                                    }
                                } else console.log('pojok');
                            }
                        }
                    }
            } else if (key == 37) { //left
                for (let i = 0,erl; erl = rowList[i]; i++){
                    for (let j = 0;j <= (erl.length - 1); j++){ //iterate normal
                        if (!isCellEmpty(erl[j])){
                            if (!isCellOnEdge(erl[j], "left")) {
                                if (isCellEmpty(erl[j-1])){
                                    console.log("next is empty");
                                    //Animate
                                } else if (isNextBlockEqual(erl, j, "left")) {
                                    console.log("next is equal");
                                    // Animate juga, tapi delete yang lama
                                }
                            } else console.log('pojok');
                        }
                    }
                }
            } else if (key == 38) { //up
                for (let i = 0,ecl; ecl = colList[i]; i++){
                    for (let j = 0;j <= (ecl.length - 1); j++){ //iterate normal
                        if (!isCellEmpty(ecl[j])){
                            if (!isCellOnEdge(ecl[j], "up")) {
                                if (isCellEmpty(ecl[j-1])){
                                    console.log("next is empty");
                                    //Animate
                                } else if (isNextBlockEqual(ecl, j, "up")) {
                                    console.log("next is equal");
                                    // Animate juga, tapi delete yang lama
                                }
                            } else console.log('pojok');
                        }
                    }
                }
            } else if (key == 40) { //down
                for (let i = 0,ecl; ecl = colList[i]; i++){
                    for (let j = (ecl.length - 1);j >= 0; j--){ //iterate backwards
                        if (!isCellEmpty(ecl[j])){
                            if (!isCellOnEdge(ecl[j], "down")) {
                                if (isCellEmpty(ecl[j+1])){
                                    console.log("next is empty");
                                    //Animate
                                } else if (isNextBlockEqual(ecl, j, "down")) {
                                    console.log("next is equal");
                                    // Animate juga, tapi delete yang lama
                                }
                            } else console.log('pojok');
                        }
                    }
                }
            }
            console.log(key);
            addNewRandomBlock(1);
        }
    });
}


setCells();
move();
// addNewRandomBlock(2);
setTimeout(addNewRandomBlock(2), 300);