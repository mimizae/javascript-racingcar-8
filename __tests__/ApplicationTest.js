import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("자동차 경주", () => {
  describe("실제 경주 예제 테스트", () => {
    test("기능 테스트", async () => {
      // given
      const MOVING_FORWARD = 4;
      const STOP = 3;
      const inputs = ["pobi,woni", "1"];
      const logs = ["pobi : -", "woni : ", "최종 우승자 : pobi"];
      const logSpy = getLogSpy();

      mockQuestions(inputs);
      mockRandoms([MOVING_FORWARD, STOP]);

      // when
      const app = new App();
      await app.run();

      // then
      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    });
    test("2회 시도 후, 공동 우승자를 정확히 출력.", async () => {
      const MOVING_FORWARD = 4;
      const STOP = 3;

      const inputs = ["pobi,woni", "2"];

      const randoms = [MOVING_FORWARD, STOP, STOP, MOVING_FORWARD];

      const logs = [
        "pobi : -",
        "woni : ",
        "pobi : -",
        "woni : -",
        "최종 우승자 : pobi, woni",
      ];
      const logSpy = getLogSpy();

      mockQuestions(inputs);
      mockRandoms(randoms);

      // when
      const app = new App();
      await app.run();

      // then
      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    });

    test("3회 시도 후, 한 명의 우승자를 정확히 출력.", async () => {
      const MOVING_FORWARD = 4;
      const STOP = 3;
      const inputs = ["car1,car2", "3"];

      const randoms = [
        MOVING_FORWARD,
        STOP,
        MOVING_FORWARD,
        STOP,
        MOVING_FORWARD,
        STOP,
      ];

      const logs = [
        "car1 : -",
        "car2 : ",
        "car1 : --",
        "car2 : ",
        "car1 : ---",
        "car2 : ",
        "최종 우승자 : car1",
      ];
      const logSpy = getLogSpy();

      mockQuestions(inputs);
      mockRandoms(randoms);

      // when
      const app = new App();
      await app.run();

      // then
      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    });

    test("1회 시도 후, 전원 전진하지 않았을 경우 우승자가 없음을 출력.", async () => {
      const STOP = 3;

      const inputs = ["a,b,c", "1"];

      const randoms = [STOP, STOP, STOP];

      const logs = ["a : ", "b : ", "c : ", "최종 우승자 : 우승자는 없습니다."];

      const expectedResultLog = "최종 우승자 : 우승자는 없습니다.";

      const logSpy = getLogSpy();

      mockQuestions(inputs);
      mockRandoms(randoms);

      // when
      const app = new App();
      await app.run();

      // then
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedResultLog)
      );
    });

    test("자동차 3대, 2회 시도 후 복합 결과를 정확히 출력.", async () => {
      const MOVING_FORWARD = 4;
      const STOP = 3;

      const inputs = ["a,b,c", "2"];

      const randoms = [
        MOVING_FORWARD,
        STOP,
        MOVING_FORWARD + 1,
        STOP - 1,
        MOVING_FORWARD,
        MOVING_FORWARD + 2,
      ];

      const logs = [
        "a : -",
        "b : ",
        "c : -",
        "a : -",
        "b : -",
        "c : --",
        "최종 우승자 : c",
      ];
      const logSpy = getLogSpy();

      mockQuestions(inputs);
      mockRandoms(randoms);

      // when
      const app = new App();
      await app.run();

      // then
      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    });
  });

  test("예외 테스트", async () => {
    // given
    const inputs = ["pobi,javaji"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  describe("자동차 이름 입력 유효성 검사", () => {
    test("자동차 이름이 5자를 초과하면 에러 발생", async () => {
      const inputs = ["pobi123,java"];
      mockQuestions(inputs);

      const app = new App();

      await expect(app.run()).rejects.toThrow(
        "[ERROR] 자동차 이름은 1자 이상, 5자 이하여야 합니다."
      );
    });

    test("자동차 이름이 공백이면 에러 발생", async () => {
      const inputs = ["pobi,,java"];
      mockQuestions(inputs);

      const app = new App();

      await expect(app.run()).rejects.toThrow(
        "[ERROR] 자동차 이름은 1자 이상, 5자 이하여야 합니다."
      );
    });

    test("자동차 이름에 특수문자 포함 시 에러 발생", async () => {
      const inputs = ["pobi,@java"];
      mockQuestions(inputs);

      const app = new App();

      await expect(app.run()).rejects.toThrow(
        "[ERROR] 특수문자와 공백은 자동차의 이름에 포함 될 수 없습니다."
      );
    });

    test("자동차 이름이 하나만 입력된 경우 에러 발생", async () => {
      const inputs = ["pobi"];
      mockQuestions(inputs);

      const app = new App();

      await expect(app.run()).rejects.toThrow(
        "[ERROR] 둘 이상의 자동차 이름을 입력해 주세요."
      );
    });

    test("자동차 이름 입력이 비어있는 경우 에러 발생", async () => {
      const inputs = [""];
      mockQuestions(inputs);

      const app = new App();

      await expect(app.run()).rejects.toThrow(
        "[ERROR] 자동차 이름을 입력해 주세요."
      );
    });

    test("자동차 이름이 중복되는 경우 에러 발생", async () => {
      const inputs = ["pobi,pobi"];
      mockQuestions(inputs);

      const app = new App();

      await expect(app.run()).rejects.toThrow(
        "[ERROR] 자동차 이름은 중복될 수 없습니다."
      );
    });
  });

  describe("시도 횟수 입력 유효성 검사", () => {
    test("시도 횟수가 0 이하일 때 에러 발생", async () => {
      const inputs = ["pobi,crong", "0"];
      mockQuestions(inputs);

      const app = new App();

      await expect(app.run()).rejects.toThrow(
        "[ERROR] 시도할 횟수는 1 이상의 자연수여야 합니다."
      );
    });

    test("시도 횟수가 음수일 때 에러 발생", async () => {
      const inputs = ["pobi,crong", "-2"];
      mockQuestions(inputs);

      const app = new App();

      await expect(app.run()).rejects.toThrow(
        "[ERROR] 시도할 횟수는 1 이상의 자연수여야 합니다."
      );
    });

    test("시도 횟수에 숫자 외의 문자가 들어올 때 에러 발생", async () => {
      const inputs = ["pobi,crong", "a"];
      mockQuestions(inputs);

      const app = new App();

      await expect(app.run()).rejects.toThrow(
        "[ERROR] 시도할 횟수에는 숫자만 입력 가능합니다."
      );
    });

    test("시도 횟수를 입력하지 않았을 때 에러 발생", async () => {
      const inputs = ["pobi,crong", ""];
      mockQuestions(inputs);

      const app = new App();

      await expect(app.run()).rejects.toThrow(
        "[ERROR] 시도할 횟수를 입력해 주세요."
      );
    });
  });
});
