export function View(elements) {
  return {
    render(cells) {
      elements.slots.forEach((cell, index) => {
        cell.classList.value = cells[index].cl;
      });
    },

    clear() {
      elements.cells.forEach(cell => {
        cell.classList = 'cell';
      });
    },

    buttons(disabled) {
      elements.undoButton.disabled = disabled;
      elements.redoButton.disabled = disabled;
    },

    undoDisabled(disabled){
      elements.undoButton.disabled = disabled;
    },

    redoDisabled(disabled){
      elements.redoButton.disabled = disabled;
    },

    tittle(text) {
      elements.wonTitle.classList.toggle('hidden');
      elements.wonMessage.innerHTML = text;
    },
  };
}
