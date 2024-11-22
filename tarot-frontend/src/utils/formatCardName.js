export function formatCardName(cardName) {
  const withoutThe = cardName.replace(/^The\s+/i, "").replace(/_/g, " ");
  const words = withoutThe.split(" ");
  return words
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}
