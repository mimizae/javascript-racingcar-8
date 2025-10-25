import { MissionUtils } from "@woowacourse/mission-utils";

export function runCarRace(carNameList = [], raceCount = 0) {
  // 차가 몇 개인지는 carNameList.length로 알 수 있음
  // 각 자동차 별 차수 동안 진행된 전진 횟수를 저장할 공간 필요. 초기화는 0
  const progress = {};
  carNameList.forEach((carName) => (progress[carName] = 0)); // 자동차 이름 그대로를 key로 사용

  MissionUtils.Console.print("\n실행 결과\n");

  for (let i = 0; i < raceCount; i++) {
    carNameList.forEach((carName) => {
      const randomNum = Math.floor(Math.random() * 10);
      if (randomNum >= 4) progress[carName] += 1;
    });

    // 진행 상황 출력
    carNameList.forEach((name) => {
      MissionUtils.Console.print(`${name} : ${"-".repeat(progress[name])}`);
    });
    MissionUtils.Console.print(""); // 출력마다 줄 바꿈
  }
  const maxProgress = Math.max(...Object.values(progress)); // 최대 전진 횟수

  // 모든 자동차가 0칸이라면 우승자 없음.
  if (maxProgress === 0) {
    MissionUtils.Console.print("결과: 우승자는 없습니다.");
    return;
  }

  // 최대 전진 거리와 같은 자동차 모두 추출
  const winners = carNameList.filter(
    (carName) => progress[carName] === maxProgress
  );

  // 우승자 출력
  MissionUtils.Console.print(`최종 우승자 : ${winners.join(", ")}`);
}
