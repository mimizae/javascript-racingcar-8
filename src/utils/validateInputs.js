export function validateCarNames(carNames = "") {
  if (carNames == "") {
    throw new Error("[ERROR]: 자동차 이름을 입력해 주세요.");
  }
  if (!carNames.includes(",")) {
    throw new Error("[ERROR]: 둘 이상의 자동차 이름을 입력해 주세요.");
  }
}
