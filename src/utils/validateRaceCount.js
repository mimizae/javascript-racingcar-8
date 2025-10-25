export function validateRaceCount(raceCount = 0) {
  if (raceCount === null || raceCount === "") {
    throw new Error("[ERROR]: 시도할 횟수를 입력해 주세요.");
  }

  // 숫자로 변환 불가능한 경우 (NaN 체크)
  // -> readline으로 읽은 사용자 입력 값은 모두 문자열 취급이기에 그대로 typeof raceCount을 하면 항상 에러 반환 됨.
  // 예를 들어, 사용자가 5만 입력해도 typeof raceCount = string임. 즉, Number()로 타입 변환해서 'abc' -> Nan인 것을 체크
  if (Number.isNaN(raceCount)) {
    throw new Error("[ERROR]: 시도할 횟수에는 숫자만 입력 가능합니다.");
  }

  if (!Number.isInteger(count) || count <= 0) {
    throw new Error("[ERROR]: 시도할 횟수는 1 이상의 자연수여야 합니다.");
  } // 단순히 음수 구분이 아니라 자연수인지 아닌지를 구분
}
