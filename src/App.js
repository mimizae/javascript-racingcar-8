import { MissionUtils } from "@woowacourse/mission-utils";
import { runCarRace } from "./utils/runCarRace";
import { validateCarNames } from "./utils/validators/validateCarNames";
import { validateRaceCount } from "./utils/validators/validateRaceCount";

class App {
  async run() {
    const rawCarNameList = await MissionUtils.Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)"
    );
    const rawRaceCount = await MissionUtils.Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?"
    );

    try {
      const validatedCarNameList = validateCarNames(rawCarNameList);
      const validatedRaceCount = validateRaceCount(rawRaceCount);

      runCarRace(validatedCarNameList, validatedRaceCount); // 검증이 완료된 반환 값들로 경주 로직 실행
    } catch (error) {
      // 검증 실패 및 실행 중 오류 발생 시 테스트 코드에서 예외 감지 가능하도록 다시 던짐
      MissionUtils.Console.print(error.message);
      throw error;
    }
  }
}

export default App;
