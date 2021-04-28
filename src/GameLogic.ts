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

  getNpm = (correct: number, time?: number) => {
    //TO-DO: penalty??
    return correct;
  };

  getEmoji = (correct: number) => {
    if (correct < 30) {
      return '⚰️'
    } else if (correct < 70) {
      return '🐢';
    } else if (correct < 110) {
      return '🚶‍♀️';
    } else if (correct < 150) {
      return '🐕';
    } else if (correct < 200) {
      return '🏇';
    } else {
      return '🐆'
    }
  }

  getDescription = (correct: number) => {
    if (correct < 20) {
      return 'bro are you even alive?'
    } else if (correct < 70) {
      return 'Well... you type pretty slow, keep practicing.';
    } else if (correct < 110) {
      return 'Not bad, you are pretty average. It could be better!';
    } else if (correct < 150) {
      return `Okay, you're movin, I see you 👀, not fast yet but better than average.`;
    } else if (correct < 200) {
      return 'You are pretty fast at typing numbers, congratulations. You are one of the few with a unique talent of typing numbers.';
    } else {
      return 'Woah, you are insanely good at typing numbers for whatever reason.'
    }
  }


};