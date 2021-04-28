export default class GameLogic {
  /*
  we really don't have to hold state and members here, the game is 
  pretty simple that we can just hold state in the components but 
  handle SOME functionality here, this is more of just a helper
  class in a way B-)
  */
  static MAX_GENERATE = 500;

  constructor() {
    this.generateNumbers();
  }

  generateNumbers = () => {
    let numbers: number[] = []
    for (let i = 0; i < GameLogic.MAX_GENERATE; i++) {
      numbers.push(Math.floor(Math.random() * 10));
    }
    return numbers;
  };

  getAccuracy = (correct: number, incorrect: number) => {
    if (correct + incorrect === 0) return 0;
    return (correct / (correct + incorrect)) * 100;
  };

  getNpm = (correct: number, time: number) => {
    //TO-DO: penalty??
    return correct;
  };
};