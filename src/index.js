import './generateField';
import './index.css';

const slots = document.querySelectorAll('div.cell');
const undoBotton = document.querySelector('button.undo-btn.btn');
const redoBotton = document.querySelector('button.redo-btn.btn');
const wonTitle = document.querySelector('div.won-title');
const wonMessage = document.querySelector('span.won-message');

const Status = Object.freeze({
  RENDERED: 'rendered',
  CANCELED: 'canceled',
});

class Move {
  constructor(ID, CLASS, STATUS) {
    this.ID = ID;
    this.CLASS = CLASS;
    this.STATUS = STATUS;
  }
}

function save(key, el) {
  localStorage.setItem(`${key}`, JSON.stringify(el));
}

function load(key) {
  return localStorage.getItem(`${key}`) ? JSON.parse(localStorage.getItem(`${key}`)) : [];
}

function move() {
  const lastMove = load('moves').pop();
  const currentClass = lastMove === undefined ? 'r' : lastMove.CLASS;
  return currentClass === 'ch' ? 'r' : 'ch';
}

/*
 * DRAW slots
 */

function clearField(slots) {
  Array.prototype.slice.call(slots).forEach(cell => {
    cell.classList = 'cell';
  });
}

function fillInTheField(moves, slots) {
  const field = Array.prototype.slice.call(slots);
  moves.forEach(mov => {
    if (mov.STATUS === Status.CANCELED) {
      return;
    }
    field
      .find(cell => {
        return cell.id === mov.ID;
      })
      .classList.add(mov.CLASS);
  });
}

function redrawTheField(slots) {
  clearField(slots);
  fillInTheField(load('moves'), slots);
}

redoBotton.disabled = false;
undoBotton.disabled = false;

slots.forEach(cell =>
  cell.addEventListener('click', cel => {
    save(
      'moves',
      load('moves')
        .filter(mov => mov.STATUS === Status.RENDERED)
        .concat(new Move(cel.target.id, move(), Status.RENDERED))
    );
    redrawTheField(slots);
  })
);

undoBotton.addEventListener('click', () => {
  const moves = load('moves').reverse();
  moves.find(mov => {
    return mov.STATUS === Status.RENDERED;
  }).STATUS = Status.CANCELED;

  save('moves', moves.reverse());
  redrawTheField(slots);
});

redoBotton.addEventListener('click', () => {
  const moves = load('moves');
  moves.find(mov => {
    return mov.STATUS === Status.CANCELED;
  }).STATUS = Status.RENDERED;

  save('moves', moves);
  redrawTheField(slots);
});

const ROWS_COUNT = 3;
const COLS_COUNT = 3;

function linearHorizontal() {
  let result = true;
  for (let i = 0; i < COLS_COUNT; i += 1) {
    for (let j = 0; j < ROWS_COUNT - 1; j += 1) {
      result &= slots[i * 3 + j].classList.value === slots[i * 3 + j + 1].classList.value;
    }
    if (result) console.log(slots.slice(i*3, i*3+3));
  }
}

function linearVertical() {
  let result = true;
  for (let i = 0; i < COLS_COUNT - 1; i += 1) {
    for (let j = 0; j < ROWS_COUNT; j += 1) {
      result &= slots[j * 3 + i].classList.value === slots[j * 3 + i + 1].classList.value;
    }
    if (result) return true;
  }
  return false;
}
