import { MissionUtils } from "@woowacourse/mission-utils";

export function runCarRace(validatedCarNameList = [], validatedRaceCount = 0) {
  const carMoveCountMap = initializeCarMoveCount(validatedCarNameList);

  MissionUtils.Console.print("\n실행 결과\n");

  for (let i = 0; i < validatedRaceCount; i++) {
    playRace(validatedCarNameList, carMoveCountMap);
    printRaceResult(validatedCarNameList, carMoveCountMap);
  }

  const raceWinners = determineRaceWinners(carMoveCountMap);
  printRaceWinners(raceWinners);
}

// 자동차별 전진 거리 초기화
function initializeCarMoveCount(validatedCarNameList) {
  const carMoveCountMap = {};
  validatedCarNameList.forEach((carName) => (carMoveCountMap[carName] = 0)); // 각 자동차 이름을 key로 사용해 일반 객체로 활용
  return carMoveCountMap;
}

// 한 레이스 진행
function playRace(validatedCarNameList, carMoveCountMap) {
  validatedCarNameList.forEach((carName) => {
    const randomNum = MissionUtils.Random.pickNumberInRange(0, 9);
    if (randomNum >= 4) carMoveCountMap[carName] += 1;
  });
}

// 레이스 결과 출력
function printRaceResult(validatedCarNameList, carMoveCountMap) {
  validatedCarNameList.forEach((carName) => {
    MissionUtils.Console.print(
      `${carName} : ${"-".repeat(carMoveCountMap[carName])}`
    );
  });
  MissionUtils.Console.print("");
}

// 최종 우승자 계산
function determineRaceWinners(carMoveCountMap) {
  const maxDistance = Math.max(...Object.values(carMoveCountMap));

  if (maxDistance === 0) return [];
  return Object.entries(carMoveCountMap)
    .filter(([_, distance]) => distance === maxDistance)
    .map(([carName]) => carName);
}

// 우승자 출력
function printRaceWinners(raceWinners) {
  if (raceWinners.length === 0) {
    MissionUtils.Console.print("최종 우승자 : 우승자는 없습니다.");
  } else {
    MissionUtils.Console.print(`최종 우승자 : ${raceWinners.join(", ")}`);
  }
}
