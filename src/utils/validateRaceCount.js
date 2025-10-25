export function validateRaceCount(raceCount = 0) {
  if (raceCount == "") {
    throw new Error("[ERROR]: 시도할 횟수를 입력해 주세요.");
  }
  if (typeof raceCount != "number") {
    throw new Error("[ERROR]: 시도할 횟수에는 숫자만 입력 가능합니다.");
  }
  if (raceCount <= 0) {
    throw new Error("[ERROR]: 시도할 횟수는 1 이상의 자연수여야 합니다.");
  }
}
