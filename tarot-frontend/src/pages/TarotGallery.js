import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { readTarotDeck } from '../services/apiService';
import './TarotGallery.css';

// Mock data for the categories
const tarotCategories = [
    {
      name: 'Major Arcana',
      description: 'The Major Arcana cards represent significant life events and spiritual lessons.',
      cards: [],
    },
    {
      name: 'Wands',
      description: 'Wands symbolize inspiration, spirituality, and determination.',
      cards: [],
    },
    {
      name: 'Swords',
      description: 'Swords represent thoughts, words, and actions, often relating to conflict and decision-making.',
      cards: [],
    },
    {
      name: 'Cups',
      description: 'Cups are associated with emotions, relationships, and connections.',
      cards: [],
    },
    {
      name: 'Pentacles',
      description: 'Pentacles represent material aspects, including finance, work, and physical health.',
      cards: [],
    },
  ];
  

const TarotGallery = ({ onAppear, onDisappear }) => {
    const [deck, setDeck] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        onAppear();
        return () => {
            onDisappear();
        };
    }, [onAppear, onDisappear]);

    useEffect(() => {
        const fetchDeck = async () => {
            try {
                const deckData = await readTarotDeck();
                
                for (let i = 0; i < tarotCategories.length; i++) {
                deckData.forEach(card => {
                    if (card.suit === tarotCategories[i].name) {
                        const alreadyExists = tarotCategories[i].cards.some(existingCard => existingCard.number === card.number);
                        if (!alreadyExists) {
                            tarotCategories[i].cards.push(card);
                        }
                        return;
                    }
                });
            }
                setDeck(tarotCategories);

            } catch (err) {
                setError(err.message);
            }
        };

        fetchDeck();
    }, []);

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!deck) {
        return <h2>Loading...</h2>;
    }

    const getImagePath = (number) => {
        const imageFileName = `/tarot-images/card_${number}.jpg`;
        return imageFileName; 
      };
    
    return (
        <div className="tarot-gallery">
            {deck.map((category) => (
                <section key={category.name}>
                    <h1>{category.name}</h1>
                    <div className="tarot-card-grid">
                        {category.cards.map((card, index) => (
                            <div key={index} className="tarot-card">
                            <Link to={`./${card.details.name}`}>
                                <img src={getImagePath(card.number)} alt={card.name} />
                                <p className="label">{card.name}</p>
                            </Link>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default TarotGallery;
