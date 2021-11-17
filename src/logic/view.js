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

    buttons(disable) {
      elements.undoButton.disable = disable;
      elements.redoButton.disable = disable;
    },

    tittle(text) {
      elements.wonTitle.classList.toggle('hidden');
      elements.wonMessage.textContext = text;
    },
  };
}
