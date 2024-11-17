export function extractWorkflowData(workflow, options = {}) {
  let payload = { workflow };

  const sanitizeImageUrl = (url) => {
    const prefix = "http://localhost:3000";
    return url.startsWith(prefix) ? url.slice(prefix.length) : url;
  };

  if (workflow === "fortuneteller") {
    payload.messages = [];

    const userMessages = document.querySelectorAll(".user-message");
    userMessages.forEach((userDiv) => {
      let userText = userDiv.textContent.trim();
      let esmeraldaDiv = userDiv.nextElementSibling;

      if (
        esmeraldaDiv &&
        esmeraldaDiv.classList.contains("esmeralda-message")
      ) {
        let esmeraldaMessage = {
          text: esmeraldaDiv.textContent.trim(),
          images: [],
        };

        const imgs = esmeraldaDiv.querySelectorAll("img");
        imgs.forEach((img) => {
          esmeraldaMessage.images.push(sanitizeImageUrl(img.src));
        });

        payload.messages.push({
          user: userText,
          esmeralda: esmeraldaMessage,
        });
      }
    });
  } else if (workflow === "cards") {
    const { artStyle = null, userReason = null, layout = null } = options;

    payload.artStyle = artStyle;
    payload.userReason = userReason;
    payload.layout = layout;

    payload.cardImages = [];
    const cardDisplayImages = document.querySelectorAll(".card-display img");
    cardDisplayImages.forEach((img) => {
      payload.cardImages.push(sanitizeImageUrl(img.src));
    });

    payload.explanations = [];
    const explanationTexts = document.querySelectorAll(".explanation-text");
    explanationTexts.forEach((textDiv) => {
      payload.explanations.push(textDiv.textContent.trim());
    });
  }

  return payload;
}
