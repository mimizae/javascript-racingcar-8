export function validateRaceCount(raceCount = 0) {
  if (raceCount === null || raceCount === "") {
    throw new Error("[ERROR]: 시도할 횟수를 입력해 주세요.");
  }

  // 숫자로 변환 불가능한 경우 (NaN 체크)
  if (Number.isNaN(raceCount)) {
    throw new Error("[ERROR]: 시도할 횟수에는 숫자만 입력 가능합니다.");
  }

  if (!Number.isInteger(raceCount) || raceCount <= 0) {
    throw new Error("[ERROR]: 시도할 횟수는 1 이상의 자연수여야 합니다.");
  }
}
