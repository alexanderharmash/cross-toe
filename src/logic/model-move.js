
export function Moves(COUNT, View, WinChacker, Data){

  function sign(index) {
    return index % 2 ? 'r' : 'ch';
  }

  function changes(cells, ...changes) {
    changes.forEach(change => {
    cells.forEach(cell => {
        if (cell.id === change.id){
          cell.cl = change.cl;
        };
      });
    });
  }

  function initMove(target){
    let length = Data.len();

    let cells = length ? Data.last('moves') : Data.clearField(COUNT * COUNT);

    const obj = {
      'cl' : `cell ${sign(length)}`,
      'id' : `${target.id}`
    };

    changes(cells, obj);

    return cells;
  }

  function sendMove(cells) {
    let win = WinChacker(cells, COUNT);

    if (win){ 
      Data.save('won', true);
      let winner = Data.len() % 2 ? 'Toes' : 'Cross';
      changes(cells, ...win);
      View.tittle(`${winner} won`);
      View.undoDisabled(true);
    }
    
    let draw = cells.find(cell => cell.cl == 'cell');

    if (!draw){
      View.tittle( `It's a draw!`);
    }
    
    View.render(cells);
        
    Data.next('moves', [cells]);

  }

  return {
    setMove(target){
      sendMove(initMove(target));
    }
  }
}
