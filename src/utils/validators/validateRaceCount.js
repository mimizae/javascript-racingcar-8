export function validateRaceCount(rawRaceCount) {
  if (
    rawRaceCount === null ||
    rawRaceCount === undefined ||
    rawRaceCount.trim() === ""
  ) {
    throw new Error("[ERROR] 시도할 횟수를 입력해 주세요.");
  }

  const numericRaceCount = Number(rawRaceCount);

  // 숫자 외의 값이 들어왔는지 확인
  if (Number.isNaN(numericRaceCount)) {
    throw new Error("[ERROR] 시도할 횟수에는 숫자만 입력 가능합니다.");
  }

  if (!Number.isInteger(numericRaceCount) || numericRaceCount <= 0) {
    throw new Error("[ERROR] 시도할 횟수는 1 이상의 자연수여야 합니다.");
  }

  return numericRaceCount;
}
