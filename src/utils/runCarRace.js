import { MissionUtils } from "@woowacourse/mission-utils";

export function runCarRace(carNameList = [], raceCount = 0) {
  const carMoveCountMap = {};
  carNameList.forEach((carName) => (carMoveCountMap[carName] = 0)); // 각 자동차 이름을 key로 사용해 일반 객체로 활용

  MissionUtils.Console.print("\n실행 결과\n");

  for (let i = 0; i < raceCount; i++) {
    carNameList.forEach((carName) => {
      const randomNum = MissionUtils.Random.pickNumberInRange(0, 9);
      if (randomNum >= 4) carMoveCountMap[carName] += 1;
    });

    carNameList.forEach((carName) => {
      MissionUtils.Console.print(
        `${carName} : ${"-".repeat(carMoveCountMap[carName])}`
      );
    });
    MissionUtils.Console.print("");
  }

  const maxDistance = Math.max(...Object.values(carMoveCountMap));

  if (maxDistance === 0) {
    MissionUtils.Console.print("최종 우승자 : 우승자는 없습니다.");
    return;
  }

  const raceWinners = carNameList.filter(
    (carName) => carMoveCountMap[carName] === maxDistance
  );

  MissionUtils.Console.print(`최종 우승자 : ${raceWinners.join(", ")}`);
}
