import _ from 'lodash';

export function WinChacker(cells, length) {

  let horizontal = _.chunk(cells, length);
  let vertical = _.zip(..._.chunk(cells, length));

  let diagonalRight = (() => {
    let diagonal = [];
    for (let i = 0; i < length; i++){
      diagonal.push(cells[i * 3 + i]);
    }
    return [diagonal];
  })();
  
  let diagonalLeft = (() => {
    let diagonal = [];
    let j = 2;
    for (let i = 0; i < length; i++){
      diagonal.push(cells[i * 3 + j--]);
    }
    return [diagonal];
  })();

  function findSeries(lines){
    let result;

    lines.forEach(line => {     
      if (!line.find(el => el.cl == 'cell')){
        result = !(new Set(_.map(line, 'cl')).size - 1) ? line : undefined;
      }
    });

    return result;
  }

  function isWon(series, direct){
    if (series) {

      series.forEach(cell => {
        cell.cl = cell.cl.concat(` win ${direct}`);
      });

      return series;
    }
  }

  function findSeriesAndSetClass(lines, direct) {
    let series = findSeries(lines);

    return isWon(series, direct);
  }
    
  return(
    findSeriesAndSetClass(vertical, 'vertical') ||
    findSeriesAndSetClass(horizontal, 'horizontal') ||
    findSeriesAndSetClass(diagonalRight, 'diagonal-right') ||
    findSeriesAndSetClass(diagonalLeft, 'diagonal-left') || null
  );
}
