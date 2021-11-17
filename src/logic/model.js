const Data = {
  save(key, data) {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  },

  load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [
      [
        {'cl' : 'cell','id' : 'c-0'},{'cl' : 'cell','id' : 'c-1'},{'cl' : 'cell','id' : 'c-2'},
        {'cl' : 'cell','id' : 'c-3'},{'cl' : 'cell','id' : 'c-4'},{'cl' : 'cell','id' : 'c-5'},
        {'cl' : 'cell','id' : 'c-6'},{'cl' : 'cell','id' : 'c-7'},{'cl' : 'cell','id' : 'c-8'},
      ]
    ];
  },
}

export function Model(View) {

  /**
   * logic
   */

  function sign(index) {
    return index % 2 ? 'ch' : 'r';
  }

  /**
   * handlers
   */

  function changes(cells, ...changes) {
    changes.forEach(change => {
      cells.forEach(cell => {
        if (cell.id === change.id){
          cell.cl = change.cl;
        };
      });
    });
  }

  return {
    
    move(target) {
      if (target.classList.contains('cell')) {

        const cells = Data.load('moves');

        const obj = {
          'cl' : `cell ${sign(cells.length)}`,
          'id' : `${target.id}`
        };

        changes(cells, obj);

        View.render(cells);

        Data.save('moves', cells);
      }
    },

    redoButton() {},

    undoButton() {},

    restButton() {},
  };
}
