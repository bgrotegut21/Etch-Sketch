let grid = document.querySelector(".grid");
let mode = document.querySelector(".mode");
let colorButton = document.querySelector(".color");
let colorPicker = document.querySelector(".color-picker");
let erase = document.querySelector(".erase");
let textBox = document.querySelector(".text-button");

let sizeButton = document.querySelector(".change-size");
let clear = document.querySelector(".clear");
let color = colorPicker.value;
let size = 400;
let initalSize = 400
let gridSize = 10;
let created = false;
let errorMessage = document.querySelector(".error");
let squaresArray;
let disableMode = false;
let eraserOn = false;

function changeMediaScreen(mediaQuery){
    if(mediaQuery.query.matches){
        size = mediaQuery.size
        enlargeSquares(size);
    } else {
        size += 100;
        enlargeSquares(size)
    }
}

function checkMediaMinScreen(mediaQuery){
    if (mediaQuery.query.matches){
        size = mediaQuery.size
        enlargeSquares(size)
    } else {
        size = 400
        enlargeSquares(size)
    }
}

function startMediaScreen(mediaQuery){
    if(mediaQuery.query.matches){
        size = mediaQuery.size
        enlargeSquares(size);
    }
}


let mediaQuerys = [ {query: window.matchMedia("(max-width:420px)"), size: 300},
                    {query: window.matchMedia("(max-width:320px)"), size: 200},
                    {query: window.matchMedia("(max-width:200px)"), size: 100}
]

let minQuery = {query: window.matchMedia("(min-width:950px)"),size:500}

mediaQuerys.map(media => {
    startMediaScreen(media);
})

minQuery.query.addEventListener("change",() => {
    checkMediaMinScreen(minQuery)
})

startMediaScreen(minQuery)

mediaQuerys.map(media => {
    media.query.addEventListener("change", () => {
        changeMediaScreen(media)
    })
})

createSquares(10);
colorPicker.addEventListener("change",action => {
    if(!eraserOn){
        color = action.target.value;     
    }
    colorButton.style.background = action.target.value;

})

function styleSquare(square,squareSize){
    square.style.background = "white";
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px"
}

function createSquares(gridSize) {
    let squareSize = size/gridSize;
    for (let size = 0; size < gridSize; size++){
        let row = document.createElement("div");
        row.setAttribute("class","row")
        row.style.display = "flex"
        grid.appendChild(row)
        for (let size = 0; size < gridSize; size ++){
            let square = document.createElement("div");
            square.setAttribute("class","square");
            styleSquare(square,squareSize);
            row.appendChild(square);
        }
         
    }
    addEventHandler();
} 

function addEventHandler(){
    let squares = document.querySelectorAll(".square");
    squaresArray = Array.from(squares);
    squaresArray.map(square => {
        square.addEventListener("mouseover", changeBackground)
        square.addEventListener("click",changePixelBackground);
    })
}

function changeBackground(event){
    if (!disableMode)event.target.style.background = color;
    else return;
}

function changePixelBackground(event){
    if (disableMode)event.target.style.background = color;
    else return;
}

function enlargeSquares(size){
    let squareSize = size/gridSize;
    for (let row of grid.children){
        for(let tile of row.children){
            tile.style.width = squareSize + "px";
            tile.style.height = squareSize + "px";
        }
    }
}

function timer() {
    errorMessage.style.display = "block"
    setTimeout(() => {
        errorMessage.style.display = "none";
    },1000)
}

clear.addEventListener("click",() => {
    squaresArray.map(square => {
        square.style.background = "white";
    })
})


function removeSquares(){
    let rows = document.querySelectorAll(".row")
    for (row of Array.from(rows)){
        row.remove();
    }
}

erase.addEventListener("click",() => {

    if (!eraserOn){
        eraserOn = true;
        color = "white";
        erase.style.background = "rgb(41, 41, 249)";
    } else {
        erase.style.background = "rgb(70, 70, 251)";
        eraserOn = false;
        color = colorPicker.value;
    }
})

sizeButton.addEventListener("click", () => {
    if (textBox.value < 65){
        if (/\D/.test(textBox.value) || textBox.value == 0)  gridSize = 1;
        else gridSize = Math.ceil(textBox.value);

        removeSquares();
        createSquares(gridSize);
    } else {
        timer();
    }
})

mode.addEventListener("click",() => {
    if(!disableMode){
        disableMode = true;
        mode.style.background = "rgb(41, 41, 249)";
        mode.textContent = "Etch Sketch Mode"
    } else {
        disableMode = false;
        mode.style.background = "rgb(70, 70, 251)";
        mode.textContent = "Pixel Mode"
    }
})