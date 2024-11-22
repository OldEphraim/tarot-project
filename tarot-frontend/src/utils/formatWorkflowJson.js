export function extractWorkflowData(workflow, options = {}) {
  let payload = { workflow };

  const sanitizeImageUrl = (url) => {
    const prefixes = ["http://localhost:3000", "https://alansarcana.com"];

    for (const prefix of prefixes) {
      if (url.startsWith(prefix)) {
        return url.slice(prefix.length);
      }
    }

    return url;
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
          names: [],
          themes: [],
        };

        const imgs = esmeraldaDiv.querySelectorAll("img");
        imgs.forEach((img) => {
          esmeraldaMessage.images.push(sanitizeImageUrl(img.src));
        });

        const names = esmeraldaDiv.querySelectorAll("img");
        names.forEach((img) => {
          if (img.alt && img.alt.trim() !== "") {
            esmeraldaMessage.names.push(img.alt.trim());
          }
        });

        const themes = esmeraldaDiv.querySelectorAll("img");
        themes.forEach((img) => {
          esmeraldaMessage.themes.push(img.dataset.theme);
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

    payload.cardNames = [];
    const cardDisplayNames = document.querySelectorAll(".card-display img");
    cardDisplayNames.forEach((img) => {
      payload.cardNames.push(img.alt);
    });

    payload.cardImages = [];
    const cardDisplayImages = document.querySelectorAll(".card-display img");
    cardDisplayImages.forEach((img) => {
      payload.cardImages.push(sanitizeImageUrl(img.src));
    });

    payload.cardThemes = [];
    const cardDisplayThemes = document.querySelectorAll(".card-display img");
    cardDisplayThemes.forEach((img) => {
      payload.cardThemes.push(img.dataset.theme);
    });

    payload.explanations = [];
    const explanationTexts = document.querySelectorAll(".explanation-text");
    explanationTexts.forEach((textDiv) => {
      payload.explanations.push(textDiv.textContent.trim());
    });
  }

  return payload;
}
