const tarotThemes = [
    "Abstract", "Affirmation", "African", "Alien & UFO", "Ancient Egyptian", 
    "Ancient Greek", "Angel", "Animal", "Anime", "Art Nouveau", "Art Styled", 
    "Arthurian", "Astrology", "Australian", "Beginner", "Bird", "Books & Literature", 
    "Business", "Cat", "Celtic", "Chakra", "Children", "Chinese", "Christian", 
    "Circus", "Collaborative", "Crystal", "Dark & Gothic", "Death", "Dog", 
    "Doreen Virtue", "Dragon", "Dream", "Eastern", "Eastern European", "Erotic", 
    "Fairy", "Fairy Tales", "Fantasy", "Feminine", "Fine Art", "Flower", "Food", 
    "Gay", "Goddess", "Golden Dawn", "Halloween", "Herb & Plant", "Historical", 
    "Historical Reproduction", "Holy Grail", "Horror", "Humorous", "I Ching", 
    "Karma", "Learner", "Lenormand", "Lesbian", "Love", "Manga", "Marseilles", 
    "Marseilles-Inspired", "Masculine", "Medieval & Renaissance", "Mini", 
    "Minoan", "Modern", "Moon", "Multicultural", "Native American", "Nature", 
    "Norse", "Novelty", "Occult", "Ocean", "Pagan & Wiccan", "Past Life", 
    "Psychic", "Qabalah", "Regional", "Rider-Waite Clone", "Rider-Waite-Inspired", 
    "Rune", "Russian", "Sacred Geometry", "Scientific", "Shadow Work", 
    "South & Central American", "Space", "Sport", "Steampunk", "Surreal", "Teen", 
    "Thoth-Inspired", "TV & Movies", "Vampire", "Victorian Era", "Visconti"
  ];
  
  export const getRandomTheme = () => {
    return tarotThemes[Math.floor(Math.random() * tarotThemes.length)];
  };
  
  export default tarotThemes;