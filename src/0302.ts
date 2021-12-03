import * as fs from "fs";

type OnesCounter = number[];

const lines = fs.readFileSync("./data/0300.txt", "utf8").split("\n");

const calculateGammaAndEpsilonRate = (inputLines: string[]) => {
  const onesCounter = inputLines.reduce<OnesCounter>((sum, entry) => {
    const digits = entry.split("");
    digits.forEach((d, i) => {
      sum[i] = (sum[i] ?? 0) + Number(d === "1");
    });
    return sum;
  }, []);

  const gammaAsArray = onesCounter.map((n) =>
    Number(n >= inputLines.length / 2)
  );
  const epsilonAsArray = onesCounter.map((n) =>
    Number(n < inputLines.length / 2)
  );

  return { gammaAsArray, epsilonAsArray };
};

let oxigenData = lines;
let coData = lines;

for (let i = 0; i < oxigenData[0].length; i++) {
  const { gammaAsArray } = calculateGammaAndEpsilonRate(oxigenData);
  const digit = gammaAsArray[i];
  oxigenData = oxigenData.filter((s) => s[i] === digit.toString());

  if (oxigenData.length === 1) {
    break;
  }
}

for (let i = 0; i < coData[0].length; i++) {
  const { epsilonAsArray } = calculateGammaAndEpsilonRate(coData);
  const digit = epsilonAsArray[i];
  coData = coData.filter((s) => s[i] === digit.toString());

  if (coData.length === 1) {
    break;
  }
}

const oxygenGeneratorRating = parseInt(oxigenData[0], 2);
const coScrubberRating = parseInt(coData[0], 2);

console.log(oxygenGeneratorRating * coScrubberRating);
