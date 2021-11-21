export const Data = {

  clearField(length){
    let field = [];
    for (let i = 0; i < length; i++){
      field.push({
        'cl' : 'cell',
        'id' : `c-${i}`,
      })
    }
    return field;
  },

  save(key, data) {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  },

  load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  last(key) {
    const data = this.load(key);
    return data.length ? data.pop() : [];
  },

  next(key, data) {
    const last = this.load(key);
    this.save(key, last.concat(data));
  },
    
  pop(key){
    let data = this.load(key);
    let last = data.pop();
    this.save(key, data);
    return last;
  },

  len(){
    return this.load('moves').length;
  },
}
