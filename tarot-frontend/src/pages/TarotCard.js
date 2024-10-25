import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TarotCard = () => {
    const { cardName } = useParams(); 
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/search?cardName=${cardName}`);
                if (!response.ok) {
                    throw new Error('Card not found');
                }
                const cardData = await response.json();
                setCard(cardData);
                console.log(cardData);
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

    return (
        <div className="tarot-card">
            <h1>{card.name}</h1>
            <div className="emoji">{card.details.emoji}</div>
            <p>{card.details.summary}</p>
            <h3>Relationships:</h3>
            <p>{card.details.relationships}</p>
            <h3>Career:</h3>
            <p>{card.details.career}</p>
            <h3>Reversed:</h3>
            <p>{card.details.reversed}</p>
        </div>
    );
};

export default TarotCard;
