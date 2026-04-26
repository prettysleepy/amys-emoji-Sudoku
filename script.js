const EMOJI_POOL = [
  '😀','😎','😂','😍','🥳','🤓','😇','😉','😋','😭','😴','🤩','😜','🥰','🤠','🙃','😮','😌',
  '🐶','🐱','🐵','🐼','🐧','🐻','🦊','🦄','🐸','🐙','🦋','🐢','🐳','🦁','🐯','🐨',
  '⭐','🔥','🌈','🍀','🌸','🌻','🌙','☀️','⚡','💧','🍄','🌵','🌊','❄️','🌺','🌍',
  '🍕','🍓','🍩','🍪','🍉','🍒','🥑','🍔','🍟','🌮','🍭','🍦','🥨','🍎','🍋','🥐',
  '⚽','🏀','🏈','🎾','🎲','🎯','🎨','🎸','🚀','✈️','🚲','🚗','💎','🎁','🏆','📚'
];

const bgColors = ['#fff0f3','#fff3bf','#d8f3dc','#caf0f8','#e0c3fc','#ffd6a5','#caffbf','#bde0fe','#ffc8dd'];
const difficultyHoles = { easy: 36, medium: 43, hard: 50, expert: 56 };
const difficultyLabels = { easy: 'Easy', medium: 'Medium', hard: 'Hard', expert: 'Expert' };

const baseSolution = [
  [1,2,3,4,5,6,7,8,9], [4,5,6,7,8,9,1,2,3], [7,8,9,1,2,3,4,5,6],
  [2,3,1,5,6,4,8,9,7], [5,6,4,8,9,7,2,3,1], [8,9,7,2,3,1,5,6,4],
  [3,1,2,6,4,5,9,7,8], [6,4,5,9,7,8,3,1,2], [9,7,8,3,1,2,6,4,5]
];

let selectedEmojis = ['😀','😍','😎','😂','😋','😉','😭','🔥','⭐'];
let solution = [];
let puzzle = [];
let selectedCell = null;
let selectedValue = null;
let currentDifficulty = 'medium';
let hasStarted = false;

const grid = document.getElementById('sudokuGrid');
const palette = document.getElementById('palette');
const library = document.getElementById('emojiLibrary');
const strip = document.getElementById('selectedStrip');
const message = document.getElementById('message');
const selectionCount = document.getElementById('selectionCount');
const setupPanel = document.getElementById('setupPanel');
const playPanel = document.getElementById('playPanel');
const activeDifficulty = document.getElementById('activeDifficulty');

document.getElementById('newPuzzle').addEventListener('click', newPuzzle);
document.getElementById('startPuzzle').addEventListener('click', startPuzzle);
document.getElementById('checkPuzzle').addEventListener('click', checkPuzzle);
document.getElementById('changeEmojis').addEventListener('click', showSetupPanel);
document.getElementById('randomizeEmojis').addEventListener('click', () => {
  selectedEmojis = shuffle([...EMOJI_POOL]).slice(0, 9);
  renderEmojiChooser();
  message.textContent = 'Great set — choose a difficulty and start playing.';
});

document.querySelectorAll('input[name="difficulty"]').forEach(input => {
  input.addEventListener('change', event => {
    currentDifficulty = event.target.value;
    activeDifficulty.textContent = `Difficulty: ${difficultyLabels[currentDifficulty]}`;
  });
});

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function makeSolution() {
  const map = shuffle([1,2,3,4,5,6,7,8,9]);
  return baseSolution.map(row => row.map(n => map[n - 1]));
}

function startPuzzle() {
  if (selectedEmojis.length !== 9) {
    message.textContent = 'Choose exactly 9 emojis before starting.';
    return;
  }
  hasStarted = true;
  setupPanel.classList.add('hidden');
  playPanel.classList.remove('hidden');
  activeDifficulty.textContent = `Difficulty: ${difficultyLabels[currentDifficulty]}`;
  newPuzzle();
  message.textContent = 'Puzzle started. Select an empty square, then choose an emoji below.';
}

function showSetupPanel() {
  setupPanel.classList.remove('hidden');
  playPanel.classList.add('hidden');
  message.textContent = 'Choose your emojis and difficulty, then start again.';
}

function newPuzzle() {
  solution = makeSolution();
  puzzle = solution.map(row => [...row]);
  const holes = shuffle([...Array(81).keys()]).slice(0, difficultyHoles[currentDifficulty]);
  holes.forEach(i => puzzle[Math.floor(i / 9)][i % 9] = 0);
  selectedCell = null;
  selectedValue = null;
  renderGrid();
  renderPalette();
  if (hasStarted) message.textContent = `${difficultyLabels[currentDifficulty]} puzzle ready.`;
}

function renderGrid() {
  grid.innerHTML = '';
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cell';
      cell.dataset.row = r;
      cell.dataset.col = c;
      const value = puzzle[r][c];
      if (value) {
        cell.textContent = selectedEmojis[value - 1];
        cell.style.background = bgColors[value - 1];
        cell.classList.add('given');
      } else {
        cell.style.background = '#ffffff';
      }
      cell.addEventListener('click', () => handleCellClick(cell, r, c));
      grid.appendChild(cell);
    }
  }
}

function handleCellClick(cell, r, c) {
  if (cell.classList.contains('given')) return;
  document.querySelectorAll('.cell').forEach(el => el.classList.remove('active'));
  cell.classList.add('active');
  selectedCell = { r, c, cell };
  if (selectedValue) fillSelectedCell();
}

function renderPalette() {
  palette.innerHTML = '';
  selectedEmojis.forEach((emoji, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = emoji;
    btn.style.background = bgColors[index];
    btn.addEventListener('click', () => {
      selectedValue = index + 1;
      fillSelectedCell();
    });
    palette.appendChild(btn);
  });
}

function fillSelectedCell() {
  if (!selectedCell || !selectedValue) return;
  puzzle[selectedCell.r][selectedCell.c] = selectedValue;
  selectedCell.cell.textContent = selectedEmojis[selectedValue - 1];
  selectedCell.cell.style.background = bgColors[selectedValue - 1];
  selectedCell.cell.classList.remove('wrong');
}

function checkPuzzle() {
  let complete = true;
  let correct = true;
  document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('wrong'));
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (!puzzle[r][c]) complete = false;
      if (puzzle[r][c] && puzzle[r][c] !== solution[r][c]) {
        correct = false;
        document.querySelector(`[data-row="${r}"][data-col="${c}"]`).classList.add('wrong');
      }
    }
  }
  message.textContent = correct && complete ? 'Perfect puzzle!' : correct ? 'So far, so good. Keep going!' : 'Some emojis need another look.';
}

function renderEmojiChooser() {
  strip.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const span = document.createElement('span');
    span.textContent = selectedEmojis[i] || '';
    if (!selectedEmojis[i]) span.classList.add('empty');
    strip.appendChild(span);
  }
  selectionCount.textContent = `${selectedEmojis.length} of 9 selected`;
  document.getElementById('startPuzzle').disabled = selectedEmojis.length !== 9;

  library.innerHTML = '';
  EMOJI_POOL.forEach(emoji => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = emoji;
    if (selectedEmojis.includes(emoji)) btn.classList.add('selected');
    btn.addEventListener('click', () => toggleEmoji(emoji));
    library.appendChild(btn);
  });
}

function toggleEmoji(emoji) {
  if (selectedEmojis.includes(emoji)) {
    selectedEmojis = selectedEmojis.filter(e => e !== emoji);
  } else if (selectedEmojis.length < 9) {
    selectedEmojis.push(emoji);
  } else {
    message.textContent = 'You already have 9 emojis. Remove one before adding another.';
    return;
  }
  message.textContent = selectedEmojis.length === 9 ? 'Ready — choose a difficulty and start playing.' : 'Choose exactly 9 emojis.';
  renderEmojiChooser();
}

renderEmojiChooser();
newPuzzle();
