export const scrollToElement = (elementId, yOffset = -70) => {
  const targetElement = document.getElementById(elementId);
  if (targetElement) {
    const yPosition =
      targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: yPosition, behavior: "smooth" });
  }
};
