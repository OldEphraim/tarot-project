import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { readTarotDeck } from '../services/apiService';
import './TarotGallery.css';

const tarotCategories = [
    {
      name: 'Major Arcana',
      description: 'The Major Arcana cards represent major life events, deep spiritual lessons, and transformative experiences. Each of these 22 cards embodies universal archetypes, touching on themes like love, strength, introspection, and judgment. When a Major Arcana card appears in a reading, it signifies moments of great significance, urging the seeker to reflect on the core aspects of their journey and personal growth. Often associated with the Fool’s journey, these cards depict the path from innocence to wisdom, guiding us through trials and triumphs alike. As such, the Major Arcana reveals the deeper, karmic messages in one’s life and calls for mindful contemplation on spiritual truths.',
      cards: [],
    },
    {
      name: 'Wands',
      description: 'Wands are the suit of inspiration, creativity, and the element of fire. They represent the spark of new ideas, the pursuit of passions, and the drive for personal and professional growth. In a reading, Wands may signal the need to take action, the birth of new ventures, or the desire to move forward with enthusiasm. This suit speaks to the spirit of adventure, ambition, and the courage to pursue dreams. When Wands appear, they often suggest that energy, motivation, and the pursuit of what fuels the soul are central themes at this time.',
      cards: [],
    },
    {
      name: 'Swords',
      description: 'The Swords suit is associated with intellect, communication, conflict, and the element of air. These cards highlight thoughts, decision-making, and the sometimes painful process of seeking truth and clarity. When Swords appear in a reading, they often point to situations involving challenges, confrontations, or difficult decisions that require mental clarity. This suit underscores the power of words, the complexities of human interaction, and the ability to navigate adversity. Swords can be double-edged, as they reflect both the struggles and the liberating power of knowledge and insight.',
      cards: [],
    },
    {
      name: 'Cups',
      description: 'Cups are deeply connected to emotions, relationships, and the element of water. This suit reveals our inner emotional world, touching on matters of the heart, intuition, and our bonds with others. When Cups cards are drawn, they often signify emotional situations, love, friendship, and the depths of personal feelings. Cups emphasize the importance of nurturing connections, understanding emotional responses, and fostering compassion both for oneself and for others. They also speak to the richness of the human experience, encouraging reflection on one’s desires, dreams, and the ways in which we are connected.',
      cards: [],
    },
    {
      name: 'Pentacles',
      description: 'The Pentacles suit represents the material world, finances, health, and the element of earth. Pentacles ground us, focusing on our physical well-being, financial security, career, and overall stability. In readings, they highlight themes of practicality, long-term growth, and the rewards of diligence and hard work. This suit reminds us that progress is achieved through steady effort, patience, and responsibility. Pentacles encourage a balanced approach to wealth and wellness, suggesting that a solid foundation in these areas can support other aspects of our lives and ambitions.',
      cards: [],
    },
];

function formatKeywords(description) {
    return description
      .split(',') // Split the string into an array by commas
      .map(keyword => keyword.trim().toLowerCase()); // Trim whitespace and convert to lowercase
  }

const TarotGallery = () => {
    const [deck, setDeck] = useState(null);
    const [error, setError] = useState(null);

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
                    <h1 className="category-name">{category.name}</h1>
                    <h3 className="category-description">{category.description}</h3>
                    <div className="tarot-card-grid">
                        {category.cards.map((card, index) => (
                            <div key={index} className="tarot-card">
                            <Link to={`./${card.details.name}`}>
                                <img src={getImagePath(card.number)} alt={card.name} />
                            </Link>
                            <p className="label">{card.name}</p>
                            <p className="emoji-label">{card.details.emoji}</p>
                            {formatKeywords(card.description).map((keyword, index) => (
                                <div key={`card-description-${index}`} className="card-descriptions">
                                    <p className="card-description">{keyword}</p>
                                </div>
                            ))}
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default TarotGallery;
