const MOCK_COUNT = 5;
const MOCK_RATIO = { width: 300, height: 200 };

export const mockImages = (() =>
  new Array(MOCK_COUNT)
    .fill(null)
    .map(
      (_, i) =>
        `https://picsum.photos/id/${i + 1}/${MOCK_RATIO.width}/${MOCK_RATIO.height}`,
    ))();
