const emojiPool = ["😀","😎","🐶","🐱","🍕","🌈","🚀","🎸","🍩","⚽","🐸","🦄","🐼","🐧"];
let selected = [];
let selectedCell = null;

const emojiList = document.getElementById("emojiList");

emojiPool.forEach(e => {
  const span = document.createElement("span");
  span.textContent = e;
  span.onclick = () => toggleEmoji(e, span);
  emojiList.appendChild(span);
});

function toggleEmoji(e, el){
  if(selected.includes(e)){
    selected = selected.filter(x => x !== e);
    el.style.background = "";
  } else if(selected.length < 9){
    selected.push(e);
    el.style.background = "#aee";
  }
}

function startGame(){
  if(selected.length !== 9) return alert("Pick 9 emojis!");
  document.getElementById("picker").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  buildGrid();
  buildPalette();
}

function buildGrid(){
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for(let i=0;i<81;i++){
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.onclick = () => selectCell(cell);
    grid.appendChild(cell);
  }
}

function selectCell(cell){
  document.querySelectorAll(".cell").forEach(c=>c.classList.remove("active"));
  selectedCell = cell;
  cell.classList.add("active");
}

function buildPalette(){
  const palette = document.getElementById("palette");
  palette.innerHTML = "";
  selected.forEach(e=>{
    const span = document.createElement("span");
    span.textContent = e;
    span.onclick = () => {
      if(selectedCell){
        selectedCell.textContent = e;
      }
    };
    palette.appendChild(span);
  });
}
