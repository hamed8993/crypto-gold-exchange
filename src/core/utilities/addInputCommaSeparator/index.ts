export const addInputCommaSeparator = (input: HTMLInputElement) => {
  const value = input.value;
  if (!value) return "";

  // Save initial cursor position
  const originalCursorPosition = input.selectionStart ?? 0;

  // Clean the input value by removing any characters except digits, '.' and '-'
  const cleanedValue = value.replace(/[^\d.-]/g, "");
  const parts = cleanedValue.split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1];

  // Calculate cursor position in the cleaned value
  let cursorPositionInCleaned = originalCursorPosition;
  for (let i = 0; i < originalCursorPosition; i++) {
    if (value[i] === ",") {
      cursorPositionInCleaned--;
    }
  }

  // Add commas to the integer part
  if (integerPart) {
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Combine integer and decimal parts
  let formattedValue = integerPart;
  if (decimalPart !== undefined) {
    formattedValue += "." + decimalPart;
  }

  // Update the input value
  input.value = formattedValue;

  // Calculate new cursor position
  let newCursorPosition = 0;
  let cursorMoved = cursorPositionInCleaned;

  for (let i = 0; i < formattedValue.length && cursorMoved > 0; i++) {
    if (formattedValue[i] !== ",") {
      cursorMoved--;
    }
    newCursorPosition++;
  }

  // Set the new cursor position
  input.setSelectionRange(newCursorPosition, newCursorPosition);

  return formattedValue;
};
