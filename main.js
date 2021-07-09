let grid = document.querySelector(".grid");
let mode = document.querySelector(".mode");
let colorButton = document.querySelector(".color");
let colorPicker = document.querySelector(".color-picker");
let erase = document.querySelector(".erase");
let textBox = document.querySelector(".text-button");

let sizeButton = document.querySelector(".change-size");
let clear = document.querySelector(".clear");

let size  = 400;
let gridSize = 10;
let created = false;

createSquares(gridSize);


function checkMediaQuery (mediaQuery){
    console.log(mediaQuery)
    if (mediaQuery.query.matches){
        size = mediaQuery.size;
        enlargeSquares(size)
    } else {
        size = 400;
        enlargeSquares(size)
    }
}

let mediaQuerys = [{query: window.matchMedia("(max-width:420px)"),size:300},
                    {query: window.matchMedia("(max-width:320px)"),size:200},
                    {query: window.matchMedia("(min-width:950px)"),size:500},
                    {query: window.matchMedia("(max-width:200px)"),size:100},
]

mediaQuerys.map(mediaQuery => {
    mediaQuery.query.addEventListener("change", () =>{
        checkMediaQuery(mediaQuery)
    })
})
colorPicker.addEventListener("change",action => {
    colorButton.style.background = action.target.value;
})

function styleSquare(square,squareSize){
    square.style.background = "red";
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";
    square.style.border = "0.5px solid black"

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
            square.setAttribute("class","div");
            styleSquare(square,squareSize);
            row.appendChild(square);
        }
         
    }
} 

function enlargeSquares(size){
    let squareSize = size/gridSize;
    for (let row of grid.children){
        console.log(row)
    }
}
