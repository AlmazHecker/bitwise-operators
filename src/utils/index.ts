// animation.ts

type DivisionStep = {
  current: number;
  quotient: number;
  remainder: number;
};

type Callback = () => void;

function validateInputs(num1: number, num2: number, min: number = 0, max: number = 255): boolean {
  if (num1 < min || num1 > max || num2 < min || num2 > max) {
    alert(`Please enter numbers between ${min} and ${max}`);
    return false;
  }
  return true;
}

function initializeAnimation(): void {
  const animationContainer = document.getElementById("animationContainer") as HTMLElement;
  animationContainer.style.display = "block";
  document.querySelectorAll(".step").forEach((step) => {
    (step as HTMLElement).style.opacity = "0";
  });
}

function calculateDivisionSteps(n: number): DivisionStep[] {
  const steps: DivisionStep[] = [];
  let current = n;
  while (current > 0) {
    const quotient = Math.floor(current / 2);
    const remainder = current % 2;
    steps.push({ current, quotient, remainder });
    current = quotient;
  }
  if (steps.length === 0) steps.push({ current: 0, quotient: 0, remainder: 0 });
  return steps;
}

function animateBinaryConversion(
  num1: number,
  num2: number,
  binary1: string,
  binary2: string,
  callback?: Callback
): void {
  const divAnimNum1 = document.getElementById("divisionAnimationNum1") as HTMLElement;
  const divAnimNum2 = document.getElementById("divisionAnimationNum2") as HTMLElement;
  const binaryConversion = document.getElementById("binaryConversion") as HTMLElement;

  divAnimNum1.innerHTML = `<strong>Number 1 (${num1}) division by 2 steps:</strong>`;
  divAnimNum2.innerHTML = `<strong>Number 2 (${num2}) division by 2 steps:</strong>`;
  binaryConversion.innerHTML = "";
  (document.getElementById("step1") as HTMLElement).style.opacity = "1";

  const steps1 = calculateDivisionSteps(num1);
  const steps2 = calculateDivisionSteps(num2);
  const maxSteps = Math.max(steps1.length, steps2.length);
  let index = 0;

  function animateDivisionStep(): void {
    if (index >= maxSteps) {
      binaryConversion.innerHTML = `
        <p>First number: ${num1} in decimal</p>
        <p class="number-row">Binary: ${binary1}</p>
        <p>Second number: ${num2} in decimal</p>
        <p class="number-row">Binary: ${binary2}</p>`;
      if (callback) callback();
      return;
    }

    if (index < steps1.length) {
      const s = steps1[index];
      divAnimNum1.innerHTML += `
        <div class="division-step">
          <span class="division-highlight">${s.current}</span> ÷ 2 = quotient: <strong>${s.quotient}</strong>, remainder: <strong>${s.remainder}</strong>
        </div>`;
    }

    if (index < steps2.length) {
      const s = steps2[index];
      divAnimNum2.innerHTML += `
        <div class="division-step">
          <span class="division-highlight">${s.current}</span> ÷ 2 = quotient: <strong>${s.quotient}</strong>, remainder: <strong>${s.remainder}</strong>
        </div>`;
    }

    index++;
    setTimeout(animateDivisionStep, 700);
  }

  animateDivisionStep();
}

function showBinaryAlignment(binary1: string, binary2: string, callback?: Callback): void {
  const binaryAlignment = document.getElementById("binaryAlignment") as HTMLElement;
  binaryAlignment.innerHTML = `
    <p class="number-row">Number 1: ${binary1}</p>
    <p class="number-row">Number 2: ${binary2}</p>`;
  (document.getElementById("step2") as HTMLElement).style.opacity = "1";

  if (callback) setTimeout(callback, 1000);
}

function highlightBit(binaryString: string, position: number): string {
  let result = "";
  for (let i = 0; i < binaryString.length; i++) {
    if (i === position) {
      result += `<span class="highlight">${binaryString[i]}</span>`;
    } else {
      result += binaryString[i];
    }
  }
  return result;
}

function animateBitwiseOperation(
  binary1: string,
  binary2: string,
  binaryResult: string,
  operationName: string,
  callback?: Callback
): void {
  const operationElement = document.getElementById("operation") as HTMLElement;
  operationElement.innerHTML = `
    <p class="number-row">Number 1: ${binary1}</p>
    <p class="number-row">Number 2: ${binary2}</p>
    <p class="number-row">${operationName}:       ${" ".repeat(8)}</p>`;

  (document.getElementById("step3") as HTMLElement).style.opacity = "1";

  let displayResult = "        ";
  let index = 0;

  function animateBit(): void {
    if (index >= 8) {
      if (callback) callback();
      return;
    }

    setTimeout(() => {
      const resultBit = binaryResult[index];
      displayResult =
        displayResult.substring(0, index) +
        resultBit +
        displayResult.substring(index + 1);

      operationElement.innerHTML = `
        <p class="number-row">Number 1: ${highlightBit(binary1, index)}</p>
        <p class="number-row">Number 2: ${highlightBit(binary2, index)}</p>
        <p class="number-row">${operationName}:       ${highlightBit(displayResult, index)}</p>`;

      index++;
      animateBit();
    }, 500);
  }

  animateBit();
}

function showFinalResult(
  num1: number,
  num2: number,
  result: number,
  binary1: string,
  binary2: string,
  binaryResult: string,
  operationName: string
): void {
  const finalResult = document.getElementById("finalResult") as HTMLElement;
  finalResult.innerHTML = `
    <p>Decimal representation:</p>
    <p>${num1} ${operationName} ${num2} = ${result}</p>
    <p>Binary representation:</p>
    <p class="number-row">${binary1} ${operationName} ${binary2} = ${binaryResult}</p>`;
  (document.getElementById("step4") as HTMLElement).style.opacity = "1";
}

function runCompleteAnimation(
  num1: number,
  num2: number,
  operationFunction: (a: number, b: number) => number,
  operationName: string
): void {
  if (!validateInputs(num1, num2)) return;

  const result = operationFunction(num1, num2);
  const binary1 = num1.toString(2).padStart(8, "0");
  const binary2 = num2.toString(2).padStart(8, "0");
  const binaryResult = result.toString(2).padStart(8, "0");

  initializeAnimation();

  animateBinaryConversion(num1, num2, binary1, binary2, () => {
    setTimeout(() => {
      showBinaryAlignment(binary1, binary2, () => {
        animateBitwiseOperation(binary1, binary2, binaryResult, operationName, () => {
          setTimeout(() => {
            showFinalResult(num1, num2, result, binary1, binary2, binaryResult, operationName);
          }, 500);
        });
      });
    }, 1000);
  });
}

function bitwiseOR(a: number, b: number): number {
  return a | b;
}

function bitwiseAND(a: number, b: number): number {
  return a & b;
}

function bitwiseXOR(a: number, b: number): number {
  return a ^ b;
}

export {
  validateInputs,
  initializeAnimation,
  calculateDivisionSteps,
  animateBinaryConversion,
  showBinaryAlignment,
  highlightBit,
  animateBitwiseOperation,
  showFinalResult,
  runCompleteAnimation,
  bitwiseOR,
  bitwiseAND,
  bitwiseXOR
};
