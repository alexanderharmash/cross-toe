import './generateField';
import './index.css';
import * as Toe from './logic/index'

const elements = {
  field: document.querySelector('div.field'),
  slots: document.querySelectorAll('div.cell'),
  undoButton: document.querySelector('button.undo-btn.btn'),
  redoButton: document.querySelector('button.redo-btn.btn'),
  restButton: document.querySelector('button.restart-btn.btn'),
  wonTitle: document.querySelector('div.won-title'),
  wonMessage: document.querySelector('span.won-message'),
};

const view = Toe.View(elements);
const model = Toe.Model(view);
const controller = Toe.Control(elements, model);

controller.cells();
controller.buttons();
