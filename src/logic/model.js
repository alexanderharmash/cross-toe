import {Moves} from './model-move'
import {Data} from './model-data'
import {WinChacker} from './model-win'

export function Model(View) {
  const COUNT = 3;

  const move = new Moves(COUNT, View, WinChacker, Data);

  return {
    
    move(target) {
      if(target.classList.contains('cell')){
        if (!localStorage.getItem('won')) {
          View.undoDisabled(false);
          if (Data.load('undo').length) {
            Data.save('undo', []);
            View.redoDisabled(true);
          }
          move.setMove(target);
          
        }
      }
    },

    redoButton() {
      View.undoDisabled(false);

      let lastMove = Data.pop('undo');
      Data.next('moves' , [lastMove]);
      View.render(Data.last('moves'));

      if (!(Data.load('undo').length)){
        View.redoDisabled(true);
      }
    },

    undoButton() {
      View.redoDisabled(false);

      if (Data.load('moves').length - 1){
        let lastMove = Data.pop('moves');
        Data.next('undo' , [lastMove]);
        View.render(Data.last('moves'));
      }else{
        let lastMove = Data.pop('moves');
        Data.next('undo' , [lastMove]);
        View.undoDisabled(true);
        View.render(Data.clearField(COUNT*COUNT));
      }
    },

    restButton() {
      localStorage.removeItem('won')
      View.undoDisabled(true);
      View.tittle();
      Data.save('moves', []);
      View.render(Data.clearField(COUNT*COUNT));
    },
  };
}
