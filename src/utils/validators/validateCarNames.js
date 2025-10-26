export function validateCarNames(rawCarNameList = "") {
  if (rawCarNameList == "") {
    throw new Error("[ERROR] 자동차 이름을 입력해 주세요.");
  }

  if (!rawCarNameList.includes(",")) {
    throw new Error("[ERROR] 둘 이상의 자동차 이름을 입력해 주세요.");
  }

  const trimmedCarNameList = rawCarNameList
    .split(",")
    .map((carName) => carName.trim());

  if (trimmedCarNameList.some((carName) => carName === "")) {
    throw new Error("[ERROR] 자동차 이름은 1자 이상, 5자 이하여야 합니다.");
  }

  if (trimmedCarNameList.some((carName) => carName.length > 5)) {
    throw new Error("[ERROR] 자동차 이름은 1자 이상, 5자 이하여야 합니다.");
  }

  const invalidCarNamePattern = /[^a-zA-Z0-9가-힣]/;

  if (
    trimmedCarNameList.some((carName) => invalidCarNamePattern.test(carName))
  ) {
    throw new Error(
      "[ERROR] 특수문자와 공백은 자동차의 이름에 포함 될 수 없습니다."
    );
  }

  const uniqueCarNames = new Set(trimmedCarNameList);

  if (uniqueCarNames.size !== trimmedCarNameList.length) {
    throw new Error("[ERROR] 자동차 이름은 중복될 수 없습니다.");
  }

  return trimmedCarNameList;
}
