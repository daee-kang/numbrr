export default class GameLogic {
  static MAX_GENERATE = 500;
  numbers: number[];

  constructor() {
    this.numbers = [];
    this.generateNumbers();
  }

  generateNumbers = () => {
    for (let i = 0; i < GameLogic.MAX_GENERATE; i++) {
      this.numbers.push(Math.floor(Math.random() * 10));
    }
  }

  getAccuracy = (correct: number, incorrect: number) => {
    if (correct + incorrect === 0) return 0;
    return (correct / (correct + incorrect)) * 100;
  }

  getNpm = (correct: number, time: number) => {
    //TO-DO: penalty??
    return correct;
  }
};