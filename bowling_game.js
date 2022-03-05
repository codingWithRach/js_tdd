// Create a program, which, given a valid sequence of rolls for one line of American Ten-Pin Bowling, produces the total score for the game. Here are some things that the program will not do:

//     We will not check for valid rolls.
//     We will not check for correct number of rolls and frames.
//     We will not provide scores for intermediate frames.

// Depending on the application, this might or might not be a valid way to define a complete story, but we do it here for purposes of keeping the kata light. I think you’ll see that improvements like those above would go in readily if they were needed for real.

// We can briefly summarize the scoring for this form of bowling:

//     Each game, or “line” of bowling, includes ten turns, or “frames” for the bowler.
//     In each frame, the bowler gets up to two tries to knock down all the pins.
//     If in two tries, he fails to knock them all down, his score for that frame is the total number of pins knocked down in his two tries.
//     If in two tries he knocks them all down, this is called a “spare” and his score for the frame is ten plus the number of pins knocked down on his next throw (in his next turn).
//     If on his first try in the frame he knocks down all the pins, this is called a “strike”. His turn is over, and his score for the frame is ten plus the simple total of the pins knocked down in his next two rolls.
//     If he gets a spare or strike in the last (tenth) frame, the bowler gets to throw one or two more bonus balls, respectively. These bonus throws are taken as part of the same turn. If the bonus throws knock down all the pins, the process does not repeat: the bonus throws are only used to calculate the score of the final frame.
//     The game score is the total of all frame scores.

function getBowlingScore(bowlingLine) {
  const STRIKE = "X";
  const SPARE = "/";

  // validation to check that the only allowed characters are X / - or digits 1-9

  let isStrike = [false, false];
  let strikeCount = [0, 0];
  let isSpare = false;
  let spareScore = 0;
  let score = 0;
  const rolls = bowlingLine.split(" ");

  for (let rollCount = 0; rollCount < rolls.length; rollCount++) {
    // determine score relating to this roll (taking no account of previous rolls)
    let thisScore = 0;
    if (rolls[rollCount] === STRIKE || rolls[rollCount].includes(SPARE)) {
      thisScore = 10;
    } else {
      [...rolls[rollCount]].forEach((char) => {
        if (/^[1-9]$/.test(char)) thisScore = parseInt(char);
      });
    }
    console.log(thisScore);

    // allow for either of 2 previous rolls being a strike
    for (let i = 0; i < isStrike.length; i++) {
      if (isStrike[i]) {
        score += thisScore;
        strikeCount[i] += 1;
        // reset flag once we've followed the strike for 2 rolls
        if (strikeCount[i] === 2) {
          strikeCount[i] = 0;
          isStrike[i] = false;
        }
      }
    }

    // allow for previous roll being a spare - in this case we only add in the score from the first throw, not the entire round
    if (isSpare) {
      spareScore = parseInt(rolls[rollCount].charAt(0));
      if (!Number.isNaN(spareScore)) score += spareScore;
      isSpare = false;
    }

    // if there are more than 10 rolls, the excess ones are only relevant if previous rolls were a strike or spare
    // some processing is therefore only relevant to the first 10 rolls
    if (rollCount < 10) {
      // append score from this roll
      score += thisScore;
      // set flags to be used for future rolls
      isSpare = rolls[rollCount].includes(SPARE);
      if (rolls[rollCount] === STRIKE) {
        isStrike[0] ? (isStrike[1] = true) : (isStrike[0] = true);
      }
    }
  }
  return score;
}

module.exports = {
  getBowlingScore,
};
