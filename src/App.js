import { MissionUtils } from "@woowacourse/mission-utils";
import { runCarRace } from "./utils/runCarRace";

class App {
  async run() {
    const carNames = await MissionUtils.Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)"
    );
    const raceCount = await MissionUtils.Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?"
    );

    try {
      const result = runCarRace(carNames, raceCount);
      MissionUtils.Console.print(`최종 우승자 : ${result.join(", ")}`); // 우승자 배열을 (, )으로 구분하도록
    } catch (error) {
      MissionUtils.Console.print(error.message);
      throw error;
    }
  }
}

export default App;
