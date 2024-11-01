import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchCardByName } from '../services/apiService';
import './TarotCard.css';

const TarotCard = () => {
    const { cardName } = useParams(); 
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const cardData = await searchCardByName(cardName);
                setCard(cardData);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCard();
    }, [cardName]);

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!card) {
        return <h2>Loading...</h2>;
    }

    const getImagePath = (number) => {
        const imageFileName = `/tarot-images/card_${number}.jpg`;
        return imageFileName; 
      };

    return (
        <div className="tarot-card-page">
            <h1>{card.name}</h1>
              <div className="tarot-card">
                <img src={getImagePath(card.number)} alt={card.name} />
              </div>
            <div className="emoji">{card.details.emoji}</div>
            <p>{card.details.summary}</p>
            <p>{card.details.relationships}</p>
            <p>{card.details.career}</p>
            <p>{card.details.reversed}</p>
        </div>
    );
};

export default TarotCard;
