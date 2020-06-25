import { v4 as uuid } from "uuid";

const TEST_DATA = [
  { name: "Alex", seed: 1 },
  { name: "Sam", seed: 2 },
  { name: "Mom", seed: 3 },
  { name: "Dad", seed: 4 },
  { name: "Lucas", seed: 5 },
  { name: "Greg", seed: 6 },
  { name: "Matt", seed: 7 },
  { name: "Reg", seed: 8 },
  { name: "Norman", seed: 9 },
  { name: "Anth", seed: 10 },
];

export const generateBracket = (numPlayers, players, type) => {
  var NUMBER_OF_PARTICIPANTS = numPlayers; // Set the number of participants

  if (!String.prototype.format) {
    String.prototype.format = function () {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
      });
    };
  }
  //   var participants = Array.from(
  //     { length: NUMBER_OF_PARTICIPANTS },
  //     (v, k) => k + 1
  //   );

  const bracket = getBracket(TEST_DATA);
  //console.log(bracket);
  return bracket;
  //console.log(bracket);
  //console.log(generateRounds([bracket]));
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getBracket(participants) {
  const participantsCount = participants.length;
  const rounds = Math.ceil(Math.log(participantsCount) / Math.log(2));
  const bracketSize = Math.pow(2, rounds);
  const requiredByes = bracketSize - participantsCount;

  //   console.log("Number of participants: {0}".format(participantsCount));
  //   console.log("Number of rounds: {0}".format(rounds));
  //   console.log("Bracket size: {0}".format(bracketSize));
  //   console.log("Required number of byes: {0}".format(requiredByes));

  if (participantsCount < 2) {
    return [participants];
  }

  let matches = [[1, 2]];

  for (var round = 1; round < rounds; round++) {
    var roundMatches = [];
    var sum = Math.pow(2, round + 1) + 1;

    for (var i = 0; i < matches.length; i++) {
      var home = changeIntoBye(matches[i][0], participantsCount);
      var away = changeIntoBye(sum - matches[i][0], participantsCount);
      roundMatches.push([home, away]);
      home = changeIntoBye(sum - matches[i][1], participantsCount);
      away = changeIntoBye(matches[i][1], participantsCount);
      roundMatches.push([home, away]);
    }
    matches = roundMatches;
  }

  for (var j = 0; j < matches.length; j++) {
    if (matches[j][0]) {
      matches[j][0] = participants.find((item) => item.seed === matches[j][0]);
    }
    if (matches[j][1]) {
      matches[j][1] = participants.find((item) => item.seed === matches[j][1]);
    }
  }
  return matches;
}

function changeIntoBye(seed, participantsCount) {
  //return seed <= participantsCount ?  seed : '{0} (= bye)'.format(seed);
  return seed <= participantsCount ? seed : null;
}

function generateRounds(bracket) {
  if (!bracket[0]) return [];
  const number_of_nodes = bracket[0].length;
  const bracket_size = number_of_nodes * 2;
  const most_recent_round = bracket[bracket.length - 1];
  let new_round = [];
  for (var i = 0; i < most_recent_round.length; i++) {
    const home = most_recent_round[i][0];
    const away = most_recent_round[i][1];
    if (!home && !away) {
      new_round.push([null, null]);
    } else if (!!home && !!away) {
      new_round.push([null, null]);
    } else {
      new_round.push([...most_recent_round[i]]);
    }
  }
  bracket.push(new_round);
  //console.log(bracket);
}
