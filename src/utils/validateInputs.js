export function validateCarNames(carNames = "") {
  if (carNames == "") {
    throw new Error("[ERROR]: 자동차 이름을 입력해 주세요.");
  }
  if (!carNames.includes(",")) {
    throw new Error("[ERROR]: 둘 이상의 자동차 이름을 입력해 주세요.");
  }
  const carName = carNames.split(",");

  // some => 해당 배열의 요소들에 대해 콜백함수 실행 후, 결괏값이 하나라도 true라면 true 반환. (every와 반대)
  if (carName.some((carName) => carName.trim() === "")) {
    throw new Error("[ERROR]: 자동차 이름은 1자 이상, 5자 이하여야 합니다.");
  }

  if (carName.some((carName) => carName.length > 5)) {
    throw new Error("[ERROR]: 자동차 이름은 1자 이상, 5자 이하여야 합니다.");
  }

  const invalidCarNamePattern = /[^a-zA-Z0-9가-힣]/; // a-z, A-Z, 0-9, 가-힣 이외의 문자가 있는지
  if (carName.some((carName) => invalidCarNamePattern.test(carName))) {
    throw new Error(
      "[ERROR]: 특수문자와 공백은 자동차의 이름에 포함 될 수 없습니다."
    );
  }
}
