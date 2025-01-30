// calculate the width of the square
export const calcSquareHeight = (widthPercentage: number) => {
  const viewportRatio = window.innerHeight / window.innerWidth;
  const squareHeightPercentage = widthPercentage * viewportRatio;

  return squareHeightPercentage;
};

export const calcSquareWidthAsString = (widthPercentage: number) => {
  return `${(100 - calcSquareHeight(widthPercentage)) / 2}% ${
    (100 - widthPercentage * 100) / 2
  }%, ${100 - (100 - calcSquareHeight(widthPercentage)) / 2}% ${
    (100 - widthPercentage * 100) / 2
  }% , ${100 - (100 - calcSquareHeight(widthPercentage)) / 2}% ${
    100 - (100 - widthPercentage * 100) / 2
  }%, ${(100 - calcSquareHeight(widthPercentage)) / 2}% ${
    100 - (100 - widthPercentage * 100) / 2
  }%`;
};

// calculate the height of the square
export const createClipPathSquare = (percentage: number) => {
  // Ensure the percentage is within valid range (0% to 100%)
  if (percentage < 0 || percentage > 100) {
    console.error("Percentage should be between 0 and 100.");
    return;
  }

  const aspectRatio = window.innerWidth / window.innerHeight;

  // Calculate the side length of the square based on the percentage of the smaller dimension
  const heightLengthPercent = percentage * aspectRatio;

  // Calculate the offset to center the square within the element
  const offsetX = (100 - percentage) / 2;
  const offsetY = (100 - heightLengthPercent) / 2;

  // Create the clip-path polygon string
  const points = [
    `${offsetX}% ${offsetY}%`, // top-left corner
    `${offsetX + percentage}% ${offsetY}%`, // top-right corner
    `${offsetX + percentage}% ${offsetY + heightLengthPercent}%`, // bottom-right corner
    `${offsetX}% ${offsetY + heightLengthPercent}%`, // bottom-left corner
  ];

  // Return the clip-path polygon string
  return `polygon(${points.join(", ")})`;
};

export const createClipPathRectangle = (percentage: number) => {
  // Ensure the percentage is within valid range (0% to 100%)
  if (percentage < 0 || percentage > 100) {
    console.error("Percentage should be between 0 and 100.");
    return;
  }

  const aspectRatio = window.innerWidth / window.innerHeight;

  // Calculate the side length of the square based on the percentage of the smaller dimension
  const heightLengthPercent = percentage * aspectRatio;

  // Calculate the offset to center the square within the element
  const offsetY = (100 - heightLengthPercent) / 2;

  // Create the clip-path polygon string
  const points = [
    `0% ${offsetY}%`, // top-left corner
    `100% ${offsetY}%`, // top-right corner
    `100% ${offsetY + heightLengthPercent}%`, // bottom-right corner
    `0% ${offsetY + heightLengthPercent}%`, // bottom-left corner
  ];

  // Return the clip-path polygon string
  return `polygon(${points.join(", ")})`;
};
