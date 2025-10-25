export function runCarRace(carNames = "", raceCount = 0) {
  let carNameList = carNames.split(",");
  // 차가 몇 개인지는 carNameList.length로 알 수 있다.
  // 각 자동차 별 차수 동안 진행된 전진 횟수를 저장할 공간 필요. 초기화는 0

  let progress = Array(carNameList.length).fill(0);

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
}
