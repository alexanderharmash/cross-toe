export function Control(elements, Model) {
  return {
    cells() {
      elements.field.addEventListener('click', event => {
        Model.move(event.target);
      });
    },

    buttons() {
      elements.restButton.addEventListener('click', () => {
        Model.restButton();
      });

      elements.redoButton.addEventListener('click', () => {
        Model.redoButton();
      });

      elements.undoButton.addEventListener('click', () => {
        Model.undoButton();
      });
    },
  };
}
