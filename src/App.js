import { MissionUtils } from "@woowacourse/mission-utils";
import { runCarRace } from "./utils/runCarRace";
import { validateCarNames } from "./utils/validateInputs";
import { validateRaceCount } from "./utils/validateRaceCount";

class App {
  async run() {
    const carNames = await MissionUtils.Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)"
    );
    const raceCount = await MissionUtils.Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?"
    );

    try {
      validateCarNames(carNames); // 자동차 이름 검증 실행
      validateRaceCount(Number(raceCount)); // 시행 횟수 검증 실행

      runCarRace(carNames, Number(raceCount)); // 입력 검증이 된 이후에 경주 로직 실행
    } catch (error) {
      // 검증 실패 및 실행 중 오류 발생 시 테스트 코드에서 예외 감지 가능하도록 다시 던짐
      MissionUtils.Console.print(error.message);
      throw error;
    }
  }
}

export default App;
