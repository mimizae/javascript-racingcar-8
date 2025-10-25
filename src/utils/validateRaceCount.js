export function validateRaceCount(raceCount = 0) {
  if (raceCount === null || raceCount === "") {
    throw new Error("[ERROR]: 시도할 횟수를 입력해 주세요.");
  }

  if (typeof raceCount != "number") {
    throw new Error("[ERROR]: 시도할 횟수에는 숫자만 입력 가능합니다.");
  }

  if (!Number.isInteger(count) || count <= 0) {
    throw new Error("[ERROR]: 시도할 횟수는 1 이상의 자연수여야 합니다.");
  } // 단순히 음수 구분이 아니라 자연수인지 아닌지를 구분
}
