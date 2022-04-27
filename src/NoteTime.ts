export class NoteTime {
  
  _lastTIme:Date[];
  _startTime:Date;
  constructor() {
  }

  setStartTime() {
    this._startTime = new Date();
  }
  inGameGetTime() {
    return (new Date().getTime()) - this._startTime.getTime();
  }
  SetLastTime(num) {
    this._lastTIme[num]=new Date();
  }
  
  distractTime(i) {
    return (new Date().getTime()) - this._lastTIme[i].getTime();
  }
  
}