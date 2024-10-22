package main

type TarotCard struct {
	Number      string `json:"number"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Suit        string `json:"suit"`
	Arcana      string `json:"arcana"`
	Upright     string `json:"upright"`
	Reversed    string `json:"reversed"`
}

var tarotDeck = []TarotCard{
	// Major Arcana
	{"00", "The Fool", "A new beginning, freedom, innocence", "Major", "Major Arcana", "Freedom, innocence", "Recklessness, risk-taking"},
	{"02", "The Magician", "Power, skill, concentration", "Major", "Major Arcana", "Skill, power", "Manipulation, poor planning"},
	{"03", "The High Priestess", "Intuition, unconscious, inner voice", "Major", "Major Arcana", "Intuition, wisdom", "Hidden agendas, disconnected"},
	{"04", "The Empress", "Creation, abundance, nurturing", "Major", "Major Arcana", "Fertility, creation", "Dependence, smothering"},
	{"05", "The Emperor", "Authority, structure, control", "Major", "Major Arcana", "Authority, stability", "Domination, rigidity"},
	{"06", "The Hierophant", "Tradition, conformity, morality", "Major", "Major Arcana", "Spiritual wisdom, tradition", "Rebellion, subversiveness"},
	{"07", "The Lovers", "Love, harmony, relationships", "Major", "Major Arcana", "Partnerships, unity", "Imbalance, misalignment"},
	{"08", "The Chariot", "Willpower, determination, control", "Major", "Major Arcana", "Success, ambition", "Lack of control, aggression"},
	{"09", "Strength", "Courage, determination, inner strength", "Major", "Major Arcana", "Courage, persuasion", "Self-doubt, weakness"},
	{"10", "The Hermit", "Soul-searching, introspection, being alone", "Major", "Major Arcana", "Contemplation, wisdom", "Isolation, loneliness"},
	{"11", "Wheel of Fortune", "Good luck, karma, life cycles", "Major", "Major Arcana", "Fortune, destiny", "Misfortune, chaos"},
	{"12", "Justice", "Fairness, truth, law", "Major", "Major Arcana", "Truth, balance", "Dishonesty, unfairness"},
	{"13", "The Hanged Man", "Pause, surrender, letting go", "Major", "Major Arcana", "Release, insight", "Delays, resistance"},
	{"14", "Death", "Endings, change, transformation", "Major", "Major Arcana", "Transformation, endings", "Resistance to change, fear"},
	{"15", "Temperance", "Balance, moderation, patience", "Major", "Major Arcana", "Harmony, balance", "Imbalance, excess"},
	{"16", "The Devil", "Addiction, materialism, playfulness", "Major", "Major Arcana", "Materialism, sexuality", "Freedom, release"},
	{"17", "The Tower", "Sudden change, upheaval, chaos", "Major", "Major Arcana", "Revelation, change", "Disaster, avoidance"},
	{"18", "The Star", "Hope, faith, purpose, renewal", "Major", "Major Arcana", "Inspiration, positivity", "Despair, disconnection"},
	{"19", "The Moon", "Illusion, fear, anxiety, subconscious", "Major", "Major Arcana", "Intuition, dreams", "Confusion, fear"},
	{"20", "The Sun", "Success, vitality, positivity", "Major", "Major Arcana", "Joy, confidence", "Negativity, depression"},
	{"21", "Judgement", "Reflection, reckoning, inner voice", "Major", "Major Arcana", "Rebirth, awakening", "Self-doubt, lack of self-awareness"},
	{"22", "The World", "Completion, achievement, fulfillment", "Major", "Major Arcana", "Fulfillment, harmony", "Incompletion, stagnation"},

	// Minor Arcana - Wands
	{"23", "Ace of Wands", "Inspiration, new opportunities, growth", "Minor", "Wands", "Creation, willpower", "Delays, lack of direction"},
	{"24", "Two of Wands", "Planning, future goals, decisions", "Minor", "Wands", "Progress, discovery", "Fear of change, indecision"},
	{"25", "Three of Wands", "Expansion, growth, foresight", "Minor", "Wands", "Opportunities, expansion", "Obstacles, delays"},
	{"26", "Four of Wands", "Celebration, stability, home", "Minor", "Wands", "Harmony, community", "Conflict, instability"},
	{"27", "Five of Wands", "Conflict, competition, challenges", "Minor", "Wands", "Struggle, opposition", "Avoidance, loss"},
	{"28", "Six of Wands", "Victory, success, recognition", "Minor", "Wands", "Public recognition", "Ego, arrogance"},
	{"29", "Seven of Wands", "Defiance, standing your ground", "Minor", "Wands", "Courage, determination", "Exhaustion, giving up"},
	{"30", "Eight of Wands", "Speed, progress, rapid action", "Minor", "Wands", "Movement, swift action", "Delays, frustration"},
	{"31", "Nine of Wands", "Resilience, perseverance, defense", "Minor", "Wands", "Courage, persistence", "Exhaustion, doubt"},
	{"32", "Ten of Wands", "Burden, responsibility, stress", "Minor", "Wands", "Hard work, responsibility", "Overload, oppression"},
	{"33", "Page of Wands", "Enthusiasm, exploration, discovery", "Minor", "Wands", "Adventure, ambition", "Lack of direction, procrastination"},
	{"34", "Knight of Wands", "Energy, passion, action", "Minor", "Wands", "Courage, boldness", "Impatience, recklessness"},
	{"35", "Queen of Wands", "Courage, determination, independence", "Minor", "Wands", "Confidence, independence", "Jealousy, aggression"},
	{"36", "King of Wands", "Leadership, vision, success", "Minor", "Wands", "Confidence, leadership", "Arrogance, impulsiveness"},

	// Minor Arcana - Cups
	{"37", "Ace of Cups", "Love, new relationships, compassion", "Minor", "Cups", "Love, creativity", "Blocked emotions, repression"},
	{"38", "Two of Cups", "Partnership, love, unity", "Minor", "Cups", "Attraction, partnership", "Imbalance, separation"},
	{"39", "Three of Cups", "Celebration, friendship, community", "Minor", "Cups", "Joy, celebration", "Overindulgence, isolation"},
	{"40", "Four of Cups", "Meditation, contemplation, apathy", "Minor", "Cups", "Reflection, reevaluation", "Discontent, boredom"},
	{"41", "Five of Cups", "Loss, regret, grief, disappointment", "Minor", "Cups", "Sorrow, mourning", "Acceptance, moving on"},
	{"42", "Six of Cups", "Nostalgia, memories, childhood", "Minor", "Cups", "Reunion, kindness", "Stuck in the past, unrealistic"},
	{"43", "Seven of Cups", "Choices, fantasy, illusion", "Minor", "Cups", "Dreams, opportunities", "Confusion, distraction"},
	{"44", "Eight of Cups", "Abandonment, walking away", "Minor", "Cups", "Letting go, withdrawal", "Fear of change, clinging"},
	{"45", "Nine of Cups", "Satisfaction, emotional fulfillment", "Minor", "Cups", "Contentment, joy", "Dissatisfaction, indulgence"},
	{"46", "Ten of Cups", "Harmony, happiness, alignment", "Minor", "Cups", "Family, happiness", "Disharmony, broken relationships"},
	{"47", "Page of Cups", "Creativity, intuition, new emotions", "Minor", "Cups", "Imagination, sensitivity", "Emotional immaturity"},
	{"48", "Knight of Cups", "Romance, charm, idealism", "Minor", "Cups", "Compassion, beauty", "Moodiness, unrealistic"},
	{"49", "Queen of Cups", "Compassion, calm, intuition", "Minor", "Cups", "Nurturing, healing", "Insecurity, codependency"},
	{"50", "King of Cups", "Emotional balance, control", "Minor", "Cups", "Diplomacy, compassion", "Coldness, emotional manipulation"},

	// Minor Arcana - Swords
	{"51", "Ace of Swords", "Clarity, truth, breakthrough", "Minor", "Swords", "New ideas, truth", "Confusion, chaos"},
	{"52", "Two of Swords", "Indecision, stalemate, choices", "Minor", "Swords", "Balance, compromise", "Avoidance, indecision"},
	{"53", "Three of Swords", "Heartbreak, emotional pain", "Minor", "Swords", "Grief, suffering", "Healing, release"},
	{"54", "Four of Swords", "Rest, recovery, contemplation", "Minor", "Swords", "Rest, recovery", "Restlessness, burnout"},
	{"55", "Five of Swords", "Conflict, tension, defeat", "Minor", "Swords", "Betrayal, loss", "Reconciliation, forgiveness"},
	{"56", "Six of Swords", "Transition, change, moving forward", "Minor", "Swords", "Healing, moving on", "Resistance, baggage"},
	{"57", "Seven of Swords", "Deception, strategy, cunning", "Minor", "Swords", "Betrayal, strategy", "Imposter syndrome, dishonesty"},
	{"58", "Eight of Swords", "Restriction, fear, imprisonment", "Minor", "Swords", "Helplessness, self-limitation", "Empowerment, freedom"},
	{"59", "Nine of Swords", "Anxiety, worry, fear", "Minor", "Swords", "Nightmares, anxiety", "Hope, recovery"},
	{"60", "Ten of Swords", "Endings, betrayal, collapse", "Minor", "Swords", "Finality, defeat", "Recovery, regeneration"},
	{"61", "Page of Swords", "Curiosity, intellect, truth", "Minor", "Swords", "New ideas, enthusiasm", "Haste, scattered energy"},
	{"62", "Knight of Swords", "Action, impulsiveness, ambition", "Minor", "Swords", "Speed, ambition", "Recklessness, disregard"},
	{"63", "Queen of Swords", "Perception, clear communication", "Minor", "Swords", "Clarity, independence", "Coldness, cruelty"},
	{"64", "King of Swords", "Authority, intellect, logic", "Minor", "Swords", "Wisdom, authority", "Manipulation, tyranny"},

	// Minor Arcana - Pentacles
	{"65", "Ace of Pentacles", "Manifestation, prosperity, new opportunities", "Minor", "Pentacles", "Abundance, security", "Lack of foresight, lost opportunity"},
	{"66", "Two of Pentacles", "Balance, adaptability, priorities", "Minor", "Pentacles", "Adaptability, time management", "Overwhelm, imbalance"},
	{"67", "Three of Pentacles", "Teamwork, collaboration, learning", "Minor", "Pentacles", "Collaboration, effort", "Disarray, lack of cooperation"},
	{"68", "Four of Pentacles", "Security, control, conservation", "Minor", "Pentacles", "Stability, control", "Greed, hoarding"},
	{"69", "Five of Pentacles", "Poverty, isolation, insecurity", "Minor", "Pentacles", "Hardship, loss", "Recovery, improvement"},
	{"70", "Six of Pentacles", "Generosity, charity, sharing", "Minor", "Pentacles", "Wealth, fairness", "Debt, selfishness"},
	{"71", "Seven of Pentacles", "Patience, perseverance, assessment", "Minor", "Pentacles", "Sustainability, reflection", "Frustration, impatience"},
	{"72", "Eight of Pentacles", "Diligence, mastery, skill development", "Minor", "Pentacles", "Skill, dedication", "Lack of focus, mediocrity"},
	{"73", "Nine of Pentacles", "Abundance, luxury, self-sufficiency", "Minor", "Pentacles", "Independence, accomplishment", "Overindulgence, materialism"},
	{"74", "Ten of Pentacles", "Wealth, inheritance, long-term success", "Minor", "Pentacles", "Legacy, security", "Financial failure, loneliness"},
	{"75", "Page of Pentacles", "Ambition, planning, new ventures", "Minor", "Pentacles", "Manifestation, diligence", "Laziness, procrastination"},
	{"76", "Knight of Pentacles", "Responsibility, hard work, perseverance", "Minor", "Pentacles", "Patience, routine", "Stubbornness, perfectionism"},
	{"77", "Queen of Pentacles", "Nurturing, practicality, financial security", "Minor", "Pentacles", "Generosity, balance", "Self-care neglect, dependency"},
	{"78", "King of Pentacles", "Wealth, business, leadership", "Minor", "Pentacles", "Success, discipline", "Greed, overwork"},
}
