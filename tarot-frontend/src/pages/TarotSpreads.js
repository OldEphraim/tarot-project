import React from "react";
import "./TarotSpreads.css";

const TarotSpreads = () => {
  const spreads = [
    {
      name: "Single Card",
      description:
        "A single card spread is simple but effective. Draw one card for insight into any question or for general guidance, such as starting your day with a focused intention.",
    },
    {
      name: "Three Card Spread",
      description:
        "The three-card spread is versatile and allows for multiple interpretations. You can use it for various purposes:",
      variations: [
        {
          title: "Past - Present - Future",
          description:
            "Shows influences from the past, current situation, and potential future.",
        },
        {
          title: "Situation - Obstacle - Advice",
          description:
            "Reveals the main issue, challenge, and suggested guidance.",
        },
        {
          title: "Situation - Action - Outcome",
          description:
            "Helps explore what actions may influence an outcome in a specific situation.",
        },
        {
          title: "You - Them - Relationship",
          description:
            "Insight into your feelings, their feelings, and the relationship dynamics.",
        },
      ],
    },
    {
      name: "Five Card Spread",
      description:
        "The five-card spread can provide more in-depth insight into an issue or question. This spread has various common layouts:",
      variations: [
        {
          title: "Past - Present - Future - Advice - Outcome",
          description:
            "Adds advice and outcome to the three-card layout for guidance.",
        },
        {
          title: "Mind - Body - Spirit - Challenge - Advice",
          description:
            "Covers personal wellness areas, highlighting challenges and advice.",
        },
        {
          title: "Situation - Cause - Solution - Advice - Outcome",
          description:
            "Offers a solution-oriented layout, examining causes and advice.",
        },
        {
          title: "Goal - Obstacles - Strengths - Weaknesses - Guidance",
          description:
            "Assists in reaching a goal by highlighting strengths and weaknesses.",
        },
        {
          title:
            "Theme - Past Influence - Present - Future Influence - Outcome",
          description: "Shows a theme with influences past and future.",
        },
      ],
    },
    {
      name: "Celtic Cross",
      description:
        "The Celtic Cross is a popular 10-card spread providing comprehensive insight into complex situations. It includes positions for the present, influences, hidden factors, advice, and more. Great for examining the details of a situation and its outcomes.",
    },
  ];

  return (
    <div className="tarot-spreads-page">
      <h1>Different Types of Tarot Spreads</h1>
      {spreads.map((spread, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h2 className="spread-name">{spread.name}</h2>
          <p className="spread-description">{spread.description}</p>
          {spread.variations && (
            <ul>
              {spread.variations.map((variation, vIndex) => (
                <p className="spread-variations" key={vIndex}>
                  <strong>{variation.title}: </strong>
                  {variation.description}
                </p>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default TarotSpreads;
