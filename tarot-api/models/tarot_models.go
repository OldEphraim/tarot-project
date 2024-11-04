package models

type TarotDeck struct {
	Number      string    `json:"number"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Arcana      string    `json:"arcana"`
	Suit        string    `json:"suit"`
	Upright     string    `json:"upright"`
	Reversed    string    `json:"reversed"`
	Details     TarotCard `json:"details"`
}

type TarotCard struct {
	Emoji         string `json:"emoji"`
	Name          string `json:"name"`
	Summary       string `json:"summary"`
	Relationships string `json:"relationships"`
	Career        string `json:"career"`
	Reversed      string `json:"reversed"`
}

var TarotDetails = []TarotDeck{
	// Major Arcana
	{"00", "The Fool", "A new beginning, freedom, innocence", "Major Arcana", "Major Arcana", "Freedom, innocence", "Recklessness, risk-taking", fool},
	{"02", "The Magician", "Power, skill, concentration", "Major Arcana", "Major Arcana", "Skill, power", "Manipulation, poor planning", magician},
	{"03", "The High Priestess", "Intuition, unconscious, inner voice", "Major Arcana", "Major Arcana", "Intuition, wisdom", "Hidden agendas, disconnected", highPriestess},
	{"04", "The Empress", "Creation, abundance, nurturing", "Major Arcana", "Major Arcana", "Fertility, creation", "Dependence, smothering", empress},
	{"05", "The Emperor", "Authority, structure, control", "Major Arcana", "Major Arcana", "Authority, stability", "Domination, rigidity", emperor},
	{"06", "The Hierophant", "Tradition, conformity, morality", "Major Arcana", "Major Arcana", "Spiritual wisdom, tradition", "Rebellion, subversiveness", hierophant},
	{"07", "The Lovers", "Love, harmony, relationships", "Major Arcana", "Major Arcana", "Partnerships, unity", "Imbalance, misalignment", lovers},
	{"08", "The Chariot", "Willpower, determination, control", "Major Arcana", "Major Arcana", "Success, ambition", "Lack of control, aggression", chariot},
	{"09", "Strength", "Courage, determination, inner strength", "Major Arcana", "Major Arcana", "Courage, persuasion", "Self-doubt, weakness", strength},
	{"10", "The Hermit", "Soul-searching, introspection, being alone", "Major Arcana", "Major Arcana", "Contemplation, wisdom", "Isolation, loneliness", hermit},
	{"11", "Wheel of Fortune", "Good luck, karma, life cycles", "Major Arcana", "Major Arcana", "Fortune, destiny", "Misfortune, chaos", wheelOfFortune},
	{"12", "Justice", "Fairness, truth, law", "Major Arcana", "Major Arcana", "Truth, balance", "Dishonesty, unfairness", justice},
	{"13", "The Hanged Man", "Pause, surrender, letting go", "Major Arcana", "Major Arcana", "Release, insight", "Delays, resistance", hangedMan},
	{"14", "Death", "Endings, change, transformation", "Major Arcana", "Major Arcana", "Transformation, endings", "Resistance to change, fear", death},
	{"15", "Temperance", "Balance, moderation, patience", "Major Arcana", "Major Arcana", "Harmony, balance", "Imbalance, excess", temperance},
	{"16", "The Devil", "Addiction, materialism, playfulness", "Major Arcana", "Major Arcana", "Materialism, sexuality", "Freedom, release", devil},
	{"17", "The Tower", "Sudden change, upheaval, chaos", "Major Arcana", "Major Arcana", "Revelation, change", "Disaster, avoidance", tower},
	{"18", "The Star", "Hope for renewal, faith, purpose", "Major Arcana", "Major Arcana", "Inspiration, positivity", "Despair, disconnection", star},
	{"19", "The Moon", "Illusion, subconscious fear, anxiety", "Major Arcana", "Major Arcana", "Intuition, dreams", "Confusion, fear", moon},
	{"20", "The Sun", "Success, vitality, positivity", "Major Arcana", "Major Arcana", "Joy, confidence", "Negativity, depression", sun},
	{"21", "Judgement", "Reflection, reckoning, inner voice", "Major Arcana", "Major Arcana", "Rebirth, awakening", "Self-doubt, lack of self-awareness", judgement},
	{"22", "The World", "Completion, achievement, fulfillment", "Major Arcana", "Major Arcana", "Fulfillment, harmony", "Incompletion, stagnation", world},

	// Minor Arcana - Wands
	{"23", "Ace of Wands", "Inspiration, new opportunities, growth", "Minor Arcana", "Wands", "Creation, willpower", "Delays, lack of direction", aceOfWands},
	{"24", "Two of Wands", "Planning, future goals, decisions", "Minor Arcana", "Wands", "Progress, discovery", "Fear of change, indecision", twoOfWands},
	{"25", "Three of Wands", "Expansion, growth, foresight", "Minor Arcana", "Wands", "Opportunities, expansion", "Obstacles, delays", threeOfWands},
	{"26", "Four of Wands", "Celebration, stability, home", "Minor Arcana", "Wands", "Harmony, community", "Conflict, instability", fourOfWands},
	{"27", "Five of Wands", "Conflict, competition, challenges", "Minor Arcana", "Wands", "Struggle, opposition", "Avoidance, loss", fiveOfWands},
	{"28", "Six of Wands", "Victory, success, recognition", "Minor Arcana", "Wands", "Public recognition", "Ego, arrogance", sixOfWands},
	{"29", "Seven of Wands", "Defiance, standing your ground, battle of wills", "Minor Arcana", "Wands", "Courage, determination", "Exhaustion, giving up", sevenOfWands},
	{"30", "Eight of Wands", "Speed, progress, rapid action", "Minor Arcana", "Wands", "Movement, swift action", "Delays, frustration", eightOfWands},
	{"31", "Nine of Wands", "Resilience, perseverance, defense", "Minor Arcana", "Wands", "Courage, persistence", "Exhaustion, doubt", nineOfWands},
	{"32", "Ten of Wands", "Burden, responsibility, stress", "Minor Arcana", "Wands", "Hard work, responsibility", "Overload, oppression", tenOfWands},
	{"33", "Page of Wands", "Enthusiasm, exploration, discovery", "Minor Arcana", "Wands", "Adventure, ambition", "Lack of direction, procrastination", pageOfWands},
	{"34", "Knight of Wands", "Energy, passion, action", "Minor Arcana", "Wands", "Courage, boldness", "Impatience, recklessness", knightOfWands},
	{"35", "Queen of Wands", "Courage, determination, independence", "Minor Arcana", "Wands", "Confidence, independence", "Jealousy, aggression", queenOfWands},
	{"36", "King of Wands", "Leadership, vision, success", "Minor Arcana", "Wands", "Confidence, leadership", "Arrogance, impulsiveness", kingOfWands},

	// Minor Arcana - Cups
	{"37", "Ace of Cups", "Love, new relationships, compassion", "Minor Arcana", "Cups", "Love, creativity", "Blocked emotions, repression", aceOfCups},
	{"38", "Two of Cups", "Partnership, love, unity", "Minor Arcana", "Cups", "Attraction, partnership", "Imbalance, separation", twoOfCups},
	{"39", "Three of Cups", "Celebration, friendship, community", "Minor Arcana", "Cups", "Joy, celebration", "Overindulgence, isolation", threeOfCups},
	{"40", "Four of Cups", "Meditation, contemplation, apathy", "Minor Arcana", "Cups", "Reflection, reevaluation", "Discontent, boredom", fourOfCups},
	{"41", "Five of Cups", "Loss, regret, grief", "Minor Arcana", "Cups", "Sorrow, mourning", "Acceptance, moving on", fiveOfCups},
	{"42", "Six of Cups", "Nostalgia, memories, childhood", "Minor Arcana", "Cups", "Reunion, kindness", "Stuck in the past, unrealistic", sixOfCups},
	{"43", "Seven of Cups", "Choices, fantasy, illusion", "Minor Arcana", "Cups", "Dreams, opportunities", "Confusion, distraction", sevenOfCups},
	{"44", "Eight of Cups", "Abandonment, walking away, seeking deeper meaning", "Minor Arcana", "Cups", "Letting go, withdrawal", "Fear of change, clinging", eightOfCups},
	{"45", "Nine of Cups", "Satisfaction, emotional fulfillment, luxury", "Minor Arcana", "Cups", "Contentment, joy", "Dissatisfaction, indulgence", nineOfCups},
	{"46", "Ten of Cups", "Harmony, happiness, alignment", "Minor Arcana", "Cups", "Family, happiness", "Disharmony, broken relationships", tenOfCups},
	{"47", "Page of Cups", "Creativity, intuition, new emotions", "Minor Arcana", "Cups", "Imagination, sensitivity", "Emotional immaturity", pageOfCups},
	{"48", "Knight of Cups", "Romance, charm, idealism", "Minor Arcana", "Cups", "Compassion, beauty", "Moodiness, unrealistic", knightOfCups},
	{"49", "Queen of Cups", "Compassion, calm, intuition", "Minor Arcana", "Cups", "Nurturing, healing", "Insecurity, codependency", queenOfCups},
	{"50", "King of Cups", "Emotional balance, control, stability", "Minor Arcana", "Cups", "Diplomacy, compassion", "Coldness, emotional manipulation", kingOfCups},

	// Minor Arcana - Swords
	{"51", "Ace of Swords", "Clarity, truth, breakthrough", "Minor Arcana", "Swords", "New ideas, truth", "Confusion, chaos", aceOfSwords},
	{"52", "Two of Swords", "Indecision, stalemate, choices", "Minor Arcana", "Swords", "Balance, compromise", "Avoidance, indecision", twoOfSwords},
	{"53", "Three of Swords", "Heartbreak, emotional pain, rejection", "Minor Arcana", "Swords", "Grief, suffering", "Healing, release", threeOfSwords},
	{"54", "Four of Swords", "Rest, recovery, contemplation", "Minor Arcana", "Swords", "Rest, recovery", "Restlessness, burnout", fourOfSwords},
	{"55", "Five of Swords", "Conflict, tension, defeat", "Minor Arcana", "Swords", "Betrayal, loss", "Reconciliation, forgiveness", fiveOfSwords},
	{"56", "Six of Swords", "Transition, change, moving forward", "Minor Arcana", "Swords", "Healing, moving on", "Resistance, baggage", sixOfSwords},
	{"57", "Seven of Swords", "Deception, strategy, cunning", "Minor Arcana", "Swords", "Betrayal, strategy", "Imposter syndrome, dishonesty", sevenOfSwords},
	{"58", "Eight of Swords", "Restriction, fear, imprisonment", "Minor Arcana", "Swords", "Helplessness, self-limitation", "Empowerment, freedom", eightOfSwords},
	{"59", "Nine of Swords", "Anxiety, worry, fear", "Minor Arcana", "Swords", "Nightmares, anxiety", "Hope, recovery", nineOfSwords},
	{"60", "Ten of Swords", "Endings, betrayal, collapse", "Minor Arcana", "Swords", "Finality, defeat", "Recovery, regeneration", tenOfSwords},
	{"61", "Page of Swords", "Curiosity, intellect, truth", "Minor Arcana", "Swords", "New ideas, enthusiasm", "Haste, scattered energy", pageOfSwords},
	{"62", "Knight of Swords", "Action, impulsiveness, ambition", "Minor Arcana", "Swords", "Speed, ambition", "Recklessness, disregard", knightOfSwords},
	{"63", "Queen of Swords", "Perception, clear communication, intellect", "Minor Arcana", "Swords", "Clarity, independence", "Coldness, cruelty", queenOfSwords},
	{"64", "King of Swords", "Authority, intellect, logic", "Minor Arcana", "Swords", "Wisdom, authority", "Manipulation, tyranny", kingOfSwords},

	// Minor Arcana - Pentacles
	{"65", "Ace of Pentacles", "Manifestation, prosperity, new opportunities", "Minor Arcana", "Pentacles", "Abundance, security", "Lack of foresight, lost opportunity", aceOfPentacles},
	{"66", "Two of Pentacles", "Balance, adaptability, priorities", "Minor Arcana", "Pentacles", "Adaptability, time management", "Overwhelm, imbalance", twoOfPentacles},
	{"67", "Three of Pentacles", "Teamwork, collaboration, learning", "Minor Arcana", "Pentacles", "Collaboration, effort", "Disarray, lack of cooperation", threeOfPentacles},
	{"68", "Four of Pentacles", "Security, control, conservation", "Minor Arcana", "Pentacles", "Stability, control", "Greed, hoarding", fourOfPentacles},
	{"69", "Five of Pentacles", "Poverty, isolation, insecurity", "Minor Arcana", "Pentacles", "Hardship, loss", "Recovery, improvement", fiveOfPentacles},
	{"70", "Six of Pentacles", "Generosity, charity, sharing", "Minor Arcana", "Pentacles", "Wealth, fairness", "Debt, selfishness", sixOfPentacles},
	{"71", "Seven of Pentacles", "Patience, perseverance, assessment", "Minor Arcana", "Pentacles", "Sustainability, reflection", "Frustration, impatience", sevenOfPentacles},
	{"72", "Eight of Pentacles", "Diligence, mastery, skill development", "Minor Arcana", "Pentacles", "Skill, dedication", "Lack of focus, mediocrity", eightOfPentacles},
	{"73", "Nine of Pentacles", "Abundance, luxury, self-sufficiency", "Minor Arcana", "Pentacles", "Independence, accomplishment", "Overindulgence, materialism", nineOfPentacles},
	{"74", "Ten of Pentacles", "Wealth, inheritance, long-term success", "Minor Arcana", "Pentacles", "Legacy, security", "Financial failure, loneliness", tenOfPentacles},
	{"75", "Page of Pentacles", "Ambition, planning, new ventures", "Minor Arcana", "Pentacles", "Manifestation, diligence", "Laziness, procrastination", pageOfPentacles},
	{"76", "Knight of Pentacles", "Responsibility, hard work, perseverance", "Minor Arcana", "Pentacles", "Patience, routine", "Stubbornness, perfectionism", knightOfPentacles},
	{"77", "Queen of Pentacles", "Nurturing, practicality, financial security", "Minor Arcana", "Pentacles", "Generosity, balance", "Self-care neglect, dependency", queenOfPentacles},
	{"78", "King of Pentacles", "Wealth, business, leadership", "Minor Arcana", "Pentacles", "Success, discipline", "Greed, overwork", kingOfPentacles},
}

var aceOfWands = TarotCard{
	Emoji:         "1🕯️",
	Name:          "aceofWands",
	Summary:       "The Ace of Wands represents the spark of inspiration, willpower, and potential for creativity. It’s the seed of fire, embodying raw enthusiasm, ambition, and the drive to turn ideas into action. This card often signifies the beginning of a journey or endeavor—perhaps an exciting project or a newfound passion. In essence, it’s the call to take bold steps and embrace opportunities that fuel your inner fire.",
	Relationships: "When the Ace of Wands appears in a relationship reading, it signifies a burst of attraction, passion, or new potential in a romantic connection. It’s a positive sign for new relationships, hinting at a strong initial spark or chemistry. For established partnerships, it can signal a renewed sense of passion and adventure, encouraging both partners to explore and rediscover each other.",
	Career:        "In a career reading, the Ace of Wands points to the beginning of a creative endeavor or a powerful drive to advance professionally. It could mean taking initiative on a project, stepping into a leadership role, or starting a new business. This card invites you to pursue your goals with courage and creativity, highlighting that this is a time for proactive, bold moves.",
	Reversed:      "Reversed, the Ace of Wands suggests a lack of motivation or blocked creativity. You may feel uncertain about how to proceed or frustrated by delays in your plans. In some cases, it may indicate hesitation to embrace a new direction, urging you to reflect on what's holding you back from fully tapping into your potential.",
}

var aceOfCups = TarotCard{
	Emoji:         "1⛲️",
	Name:          "aceOfCups",
	Summary:       "The Ace of Cups signifies the awakening of emotions, intuition, and love. It represents the beginning of emotional fulfillment, connection, and harmony, often marking a period of growth in one’s capacity for compassion and joy. As the essence of water, this card embodies love, creativity, and spiritual abundance, suggesting an open heart and a sense of connection with oneself and others.",
	Relationships: "In a relationship reading, the Ace of Cups heralds new love or deepening emotional connections. It can indicate an outpouring of affection, the start of a meaningful relationship, or a period of emotional vulnerability and closeness. For couples, it’s a reminder to nurture intimacy and create space for emotional openness.",
	Career:        "In career contexts, the Ace of Cups can indicate fulfillment and harmony in your work life, pointing to the start of a project that resonates deeply with your passions. It suggests a time when creativity flows easily, and you may be drawn toward roles that allow for compassion or artistic expression, such as mentoring or helping professions. This card can also hint at a positive emotional shift in your professional environment.",
	Reversed:      "Reversed, the Ace of Cups often points to blocked emotions, unexpressed feelings, or difficulty opening up to others. It may signify a need to release pent-up emotions or to address feelings that have been repressed. In some cases, it could mean hesitancy to connect or vulnerability to emotional burnout, encouraging self-care and emotional honesty.",
}

var aceOfSwords = TarotCard{
	Emoji:         "1⚔️",
	Name:          "aceOfSwords",
	Summary:       "The Ace of Swords represents the essence of intellect, clarity, and reason. This card cuts through confusion, illuminating truth and encouraging decisive action. It signals mental breakthroughs, the discovery of new perspectives, or the beginning of a venture that requires sharp thinking and clear judgement. When this card appears, it’s a call to embrace mental clarity and seek the truth.",
	Relationships: "In relationships, the Ace of Swords emphasizes open communication, honesty, and understanding. It encourages candid discussions and the expression of thoughts and feelings without fear. This card can signify a breakthrough in understanding each other’s needs and desires, or it might indicate that it’s time to address important issues within the relationship with clarity and integrity.",
	Career:        "The Ace of Swords in a career reading is a powerful indicator of mental clarity and intellectual achievement. It suggests a period of focus, decision-making, or tackling challenges with a clear mind. This card favors strategic planning, logical problem-solving, and innovation. It’s a reminder that your ideas and insights are valuable, and now is the time to communicate them assertively.",
	Reversed:      "When reversed, the Ace of Swords points to confusion, miscommunication, or mental blocks. It can suggest difficulty in seeing things clearly or making decisions. There might be unresolved issues or misunderstandings that cloud your thinking. This card urges patience and reflection, as well as a need to clear away mental clutter.",
}

var aceOfPentacles = TarotCard{
	Emoji:         "1🪙",
	Name:          "aceOfPentacles",
	Summary:       "The Ace of Pentacles embodies the energy of material stability, opportunity, and prosperity. It represents the seed of earth, symbolizing potential in the physical and financial realms. Often associated with new beginnings in health, wealth, and work, it’s a card of tangible rewards, physical well-being, and the chance to establish a secure foundation for the future.",
	Relationships: "In relationship readings, the Ace of Pentacles suggests a grounded and stable connection. It can point to a relationship that has long-term potential or to the idea of building something solid together, such as a home or shared goals. For singles, this card could represent meeting someone with whom you can create a secure, dependable partnership.",
	Career:        "In a career reading, the Ace of Pentacles signals new job opportunities, financial growth, or career advancements. It’s a card of material rewards and is often associated with practical goals and business ventures. This is a favorable time to invest in your career ambitions, set financial goals, or start a project that has the potential for long-term success.",
	Reversed:      "Reversed, the Ace of Pentacles can indicate missed opportunities, financial insecurity, or setbacks in material pursuits. It suggests a need to reevaluate financial decisions or career moves carefully. This card also serves as a reminder to be cautious with resources and to focus on building a more secure foundation before proceeding with new ventures.",
}

var twoOfWands = TarotCard{
	Emoji:         "2🕯️",
	Name:          "twoOfWands",
	Summary:       "The Two of Wands represents the initial stages of taking action on your vision and testing the waters of ambition. This card embodies dynamic tension between your inner drive and the outside world, signaling that you’re prepared to shape your environment according to your will. It’s a call to take the first steps toward manifesting your ideas, plan strategically, and explore the potential before you.",
	Relationships: "In a relationship reading, the Two of Wands indicates a phase of exploration and evaluation. It may suggest that you and your partner are considering future directions together, assessing compatibility, or exploring shared ambitions. For singles, it can indicate someone new who may bring a sense of curiosity and challenge, inspiring you to imagine what’s possible together.",
	Career:        "The Two of Wands in a career reading points to setting goals and planning with a focus on long-term ambitions. It suggests a time of strategic decision-making, where you’re assessing options and potential paths for growth. This card encourages you to explore new professional horizons or consider branching out, signifying that the groundwork is being laid for future achievements.",
	Reversed:      "Reversed, the Two of Wands can indicate indecision, delays, or fear of the unknown. You might be hesitant to take the next step or feel uncertain about your plans. It’s a reminder to clarify your goals and address any doubts, trusting that thoughtful preparation will help you move forward.",
}

var twoOfCups = TarotCard{
	Emoji:         "2⛲️",
	Name:          "twoOfCups",
	Summary:       "The Two of Cups represents harmony, mutual respect, and emotional connection. This card signifies the initial steps in forming a bond based on sympathy, trust, and openness, whether in friendship, romance, or partnership. It is often associated with mutual vulnerability and the beginning of a relationship built on emotional balance and understanding.",
	Relationships: "In a relationship context, the Two of Cups is a powerful indicator of emotional connection, mutual attraction, and unity. It suggests a time of bonding, establishing trust, and creating a foundation for a harmonious relationship. For singles, it can indicate the beginning of a new romance or meaningful friendship where mutual respect and care are essential.",
	Career:        "In career readings, the Two of Cups suggests harmonious partnerships, teamwork, or a collaborative project. This card points to successful connections with others, especially when working toward common goals. It encourages nurturing professional relationships based on mutual respect, which can lead to productive and fulfilling outcomes.",
	Reversed:      "Reversed, the Two of Cups may indicate imbalances, misunderstandings, or tensions in relationships. It could suggest a need to address issues of trust or communication. This card encourages you to work through conflicts constructively, as unresolved tensions could disrupt harmony.",
}

var twoOfSwords = TarotCard{
	Emoji:         "2⚔️",
	Name:          "twoOfSwords",
	Summary:       "The Two of Swords represents a situation of tension or difficult choices, requiring balance and clear judgement. It embodies the need to weigh options carefully, often implying a temporary stalemate or a moment of inner conflict. This card suggests a tightrope walk between two paths, urging you to make a choice despite the challenges.",
	Relationships: "In relationships, the Two of Swords may indicate a need for balance or careful consideration in making decisions that impact the partnership. It can suggest an impasse or a time when you and your partner are weighing different perspectives. Honest communication and empathy are essential for moving forward together.",
	Career:        "In a career context, the Two of Swords points to a period of weighing options, potential conflicts, or facing challenging decisions. This card encourages you to analyze the pros and cons carefully, reflecting on your priorities and goals. It might indicate a time of strategic planning or waiting for more clarity before making a commitment.",
	Reversed:      "Reversed, the Two of Swords can indicate a refusal to confront issues, indecision, or feeling overwhelmed by choices. It’s a reminder to face any conflicts or decisions head-on, even if difficult, to avoid further complications or missed opportunities.",
}

var twoOfPentacles = TarotCard{
	Emoji:         "2🪙",
	Name:          "twoOfPentacles",
	Summary:       "The Two of Pentacles signifies the effort to balance multiple priorities, whether financial, professional, or personal. It represents the juggling of obligations and finding stability in the face of change or material stress. This card suggests adaptability, flexibility, and the ability to stay grounded despite challenges.",
	Relationships: "In relationships, the Two of Pentacles may indicate the need to balance personal and partnership commitments. It can suggest a period of adjusting to changing circumstances, such as balancing work-life demands. This card encourages open communication and compromise to ensure both partners feel valued and supported.",
	Career:        "In career readings, the Two of Pentacles points to managing workload, finances, or multiple responsibilities effectively. It highlights the need for time management, resourcefulness, and adaptability in facing professional challenges. This card encourages finding a sustainable approach that allows you to meet all obligations without burnout.",
	Reversed:      "Reversed, the Two of Pentacles can suggest feeling overwhelmed by responsibilities, financial stress, or an inability to balance commitments effectively. It’s a reminder to reassess priorities, delegate tasks if possible, and avoid taking on more than you can handle to restore balance.",
}

var threeOfWands = TarotCard{
	Emoji:         "3🕯️",
	Name:          "threeOfWands",
	Summary:       "The Three of Wands represents expansion, exploration, and the broadening of horizons. Following the initial step in the Two of Wands, this card signifies opportunities on the horizon as the result of action and planning. It suggests that the journey you embarked on is starting to yield positive results and invites you to embrace new possibilities with optimism.",
	Relationships: "In a relationship reading, the Three of Wands indicates growth and shared goals, fostering a spirit of adventure and discovery. It may suggest traveling together, expanding shared experiences, or dreaming about the future as a couple. For singles, it signifies readiness to explore new connections with enthusiasm and open-mindedness.",
	Career:        "In a career context, the Three of Wands points to the fruits of initial efforts and the potential for expansion. This could involve new projects, partnerships, or opportunities to broaden your professional network. The card encourages you to think globally, plan strategically, and prepare to embrace a wider scope.",
	Reversed:      "Reversed, the Three of Wands may indicate delays, obstacles, or a lack of foresight. It suggests that plans may not be developing as expected or that limited thinking could be holding you back. It’s a reminder to stay adaptable and reevaluate long-term goals to ensure progress.",
}

var threeOfCups = TarotCard{
	Emoji:         "3⛲️",
	Name:          "threeOfCups",
	Summary:       "The Three of Cups signifies celebration, joy, and companionship, often representing the bonds of friendship or community. It suggests a time of emotional connection and mutual support, arising from the openness and trust formed in the Two of Cups. This card embodies shared happiness, marking a period of harmony and good times with those you care about.",
	Relationships: "In relationships, the Three of Cups suggests deepened emotional bonds, playfulness, and shared joy. It can indicate a time of celebration, such as an anniversary or milestone, or simply a period of mutual enjoyment and harmony. It encourages appreciation of your partner and the joyful moments that strengthen your bond.",
	Career:        "In a career context, the Three of Cups suggests teamwork, camaraderie, and shared success. It may represent collaborative efforts, strong professional relationships, or achieving a goal through mutual support. This card encourages acknowledging and celebrating the contributions of others and recognizing the value of working together.",
	Reversed:      "Reversed, the Three of Cups may suggest disharmony, overindulgence, or feelings of isolation. It could indicate a need to reconnect with supportive relationships or balance socializing with personal goals. Addressing misunderstandings or establishing boundaries can help restore harmony.",
}

var threeOfSwords = TarotCard{
	Emoji:         "3⚔️",
	Name:          "threeOfSwords",
	Summary:       "The Three of Swords represents heartache, disappointment, and the pain of difficult choices. It signifies the consequences of decisions made in the Two of Swords, often reflecting the sorrow of rejecting other options. This card symbolizes emotional pain, loss, or conflict, reminding you that growth sometimes requires accepting hardship.",
	Relationships: "In relationships, the Three of Swords may indicate betrayal, separation, or an emotionally difficult situation. It suggests a time when communication may be strained, or unresolved issues are causing heartache. This card encourages healing through honest dialogue and the courage to face painful truths together.",
	Career:        "In career readings, the Three of Swords can signify setbacks, rejection, or a challenging work environment. It may represent disappointment or the impact of a decision that has closed certain paths. This card encourages resilience, honest assessment, and a focus on learning from challenges to move forward.",
	Reversed:      "Reversed, the Three of Swords suggests the beginning of healing or release from past pain. It could indicate letting go of resentment, finding closure, or overcoming conflict. This card encourages patience and forgiveness as you work through lingering emotional wounds.",
}

var threeOfPentacles = TarotCard{
	Emoji:         "3🪙",
	Name:          "threeOfPentacles",
	Summary:       "The Three of Pentacles represents skill development, collaboration, and the stability that comes from mastering a craft. This card marks progress from the material precarity of the Two of Pentacles, suggesting a focus on building expertise and creating solid foundations through learning or teamwork. It reflects the value of dedication and the support of those who share your vision.",
	Relationships: "In relationships, the Three of Pentacles suggests working together to build a lasting, stable connection. It emphasizes cooperation, respect for each other's contributions, and the effort put into strengthening the relationship. It’s a reminder that successful partnerships require both work and mutual support.",
	Career:        "In a career reading, the Three of Pentacles indicates skill-building, collaboration, and tangible progress. It may suggest an apprenticeship, study, or gaining expertise, often in a team setting. This card encourages patience and hard work, highlighting the satisfaction of mastering your craft and achieving shared goals.",
	Reversed:      "Reversed, the Three of Pentacles may suggest a lack of cooperation, poor teamwork, or a lack of focus on growth. It could indicate struggles with learning or stagnation in progress. This card encourages reestablishing goals, improving collaboration, or addressing any skills gaps to move forward.",
}

var fourOfWands = TarotCard{
	Emoji:         "4🕯️",
	Name:          "fourOfWands",
	Summary:       "The Four of Wands represents a joyful pause to celebrate achievements and recognize early progress. After the expansion in the Three of Wands, this card embodies a time of excitement, reflecting on successes, and preparing to move forward. It suggests harmony, happiness, and a sense of security that encourages you to press on with confidence.",
	Relationships: "In a relationship reading, the Four of Wands indicates a period of joy, harmony, and celebration. It might represent milestones such as engagements or anniversaries, and suggests that the relationship is a source of warmth and security. This card invites you to appreciate and celebrate the connection you’ve built together.",
	Career:        "In a career context, the Four of Wands signifies successful achievements and the opportunity to recognize and celebrate hard work. It may point to a team accomplishment, the completion of a project phase, or a positive work environment. This card encourages savoring progress and preparing to take the next steps.",
	Reversed:      "Reversed, the Four of Wands can suggest delays, miscommunication, or unfulfilled expectations. It may indicate that celebration or harmony is disrupted, potentially due to conflicts or insecurities. This card encourages addressing any obstacles to restoring balance and joy.",
}

var fourOfCups = TarotCard{
	Emoji:         "4⛲️",
	Name:          "fourOfCups",
	Summary:       "The Four of Cups represents apathy, stagnation, and a feeling of dissatisfaction or boredom. Following the joy of the Three of Cups, this card suggests that emotional connections may feel stagnant or lacking fulfillment. It’s a reminder to reflect on what truly matters to you and consider whether you may be overlooking opportunities for growth.",
	Relationships: "In a relationship reading, the Four of Cups suggests a period of boredom or emotional distance, where the initial excitement has waned. It may reflect a lack of appreciation or emotional disconnection, encouraging open communication and a reevaluation of what brings fulfillment in the relationship.",
	Career:        "In a career context, the Four of Cups points to dissatisfaction, lack of motivation, or feeling stuck. It may suggest that your current role no longer aligns with your ambitions or values, prompting you to consider whether new challenges or perspectives could reignite your passion.",
	Reversed:      "Reversed, the Four of Cups suggests renewed interest or motivation. It can indicate coming out of a period of apathy and seeing opportunities with fresh eyes. This card encourages open-mindedness and a willingness to pursue what excites you again.",
}

var fourOfSwords = TarotCard{
	Emoji:         "4⚔️",
	Name:          "fourOfSwords",
	Summary:       "The Four of Swords represents a guarded rest, a time to retreat and recharge after the intensity of the Three of Swords. It’s a card of reflection and recuperation, where boundaries are reaffirmed, and mental clarity is sought. This card suggests a temporary pause, where you step away from external pressures to find peace and restoration.",
	Relationships: "In relationships, the Four of Swords suggests a need for space, introspection, or a temporary distance to reflect on feelings. It may indicate that one or both partners need time apart to process or heal. This card encourages respecting each other's boundaries and taking a mindful break to gain perspective.",
	Career:        "In career readings, the Four of Swords suggests taking a step back to rest or reassess. It may point to a needed break to avoid burnout or to plan next steps strategically. This card encourages protecting your mental health, setting boundaries, and regaining energy before moving forward.",
	Reversed:      "Reversed, the Four of Swords suggests restlessness, burnout, or an inability to relax. It could indicate the need for a more intentional pause or a failure to set boundaries. This card encourages taking the time needed for true recovery before pressing ahead.",
}

var fourOfPentacles = TarotCard{
	Emoji:         "4🪙",
	Name:          "fourOfPentacles",
	Summary:       "The Four of Pentacles signifies a pause to safeguard resources and prepare for future scarcity. It can represent financial caution, conservatism, or hoarding out of fear. This card suggests a mindset of preservation and holding on tightly, sometimes to the point of miserliness, as you consider long-term security.",
	Relationships: "In relationships, the Four of Pentacles suggests holding back emotionally, possibly out of fear of vulnerability. It may indicate possessiveness or reluctance to open up, which can create distance between partners. This card encourages addressing underlying insecurities and allowing for more emotional freedom.",
	Career:        "In a career context, the Four of Pentacles represents financial caution, resource management, or a reluctance to take risks. It may suggest hoarding resources or clinging to a stable but uninspiring position. This card encourages finding a balance between security and growth, and to avoid letting fear limit opportunities.",
	Reversed:      "Reversed, the Four of Pentacles may indicate letting go of control, financial instability, or overspending. It could signify a release of material attachment or a recognition of the need for a more flexible mindset. This card encourages balancing security with openness to new possibilities.",
}

var fiveOfWands = TarotCard{
	Emoji:         "5🕯️",
	Name:          "fiveOfWands",
	Summary:       "The Five of Wands represents conflict and competition, often manifesting as arguments or debates. This card highlights the importance of defending your vision and ideas against opposition. It suggests that through these struggles, you can clarify your beliefs and strengthen your resolve, learning more about your goals in the process.",
	Relationships: "In a relationship reading, the Five of Wands signifies conflict or competition between partners, highlighting differing opinions or priorities. This card encourages open communication and healthy debates to resolve differences, as these challenges can ultimately lead to greater understanding and deeper connections.",
	Career:        "In a career context, the Five of Wands suggests competition or conflict in the workplace, perhaps arising from differing ideas or approaches. It encourages you to assert your perspective while remaining open to others. This card signifies the potential for growth and learning through the challenges you face professionally.",
	Reversed:      "Reversed, the Five of Wands can indicate avoidance of conflict or unresolved tensions. It may suggest that the competitive energy has turned into apathy or that disagreements are being swept under the rug. This card encourages addressing issues directly to foster resolution and understanding.",
}

var fiveOfCups = TarotCard{
	Emoji:         "5⛲️",
	Name:          "fiveOfCups",
	Summary:       "The Five of Cups symbolizes loss and grief, often stemming from change and the mourning of what once was. This card encourages acknowledging feelings of sorrow while recognizing the remaining opportunities or blessings that still exist. It highlights the importance of processing emotions and allowing yourself to heal.",
	Relationships: "In a relationship reading, the Five of Cups indicates mourning the loss of connections or experiencing disappointment in relationships. It suggests that old bonds may be changing, and it’s important to process feelings of grief. This card encourages open communication and acceptance of the necessary changes in your emotional landscape.",
	Career:        "In a career context, the Five of Cups represents setbacks or losses, possibly from a missed opportunity or failure to achieve a goal. This card encourages you to learn from your experiences while focusing on the remaining possibilities for growth and success, reminding you not to overlook the silver linings.",
	Reversed:      "Reversed, the Five of Cups suggests moving past grief and beginning to recognize new opportunities. It may indicate a shift towards healing and acceptance, encouraging you to focus on the positives rather than dwelling on losses. This card signifies the potential for renewal and moving forward.",
}

var fiveOfSwords = TarotCard{
	Emoji:         "5⚔️",
	Name:          "fiveOfSwords",
	Summary:       "The Five of Swords signifies conflict, betrayal, or falling out, often leading to damaged relationships. This card highlights the potential for hurt feelings resulting from miscommunication or aggressive behavior. It serves as a reminder to assess the consequences of your actions and prioritize compassion in interactions.",
	Relationships: "In a relationship reading, the Five of Swords indicates conflict or feelings of betrayal between partners. It may signify unresolved issues causing harm or miscommunication. This card encourages healing through honest conversations and emphasizes the importance of understanding and empathy to rebuild trust.",
	Career:        "In a career context, the Five of Swords suggests a toxic or competitive environment that may lead to damaged relationships with colleagues. It warns against cutthroat behavior or selfishness that could backfire. This card encourages fostering collaboration and goodwill to create a healthier work atmosphere.",
	Reversed:      "Reversed, the Five of Swords can indicate a desire to resolve conflicts or make amends. It may suggest that you are seeking to mend relationships or learn from past mistakes. This card encourages reconciliation and a focus on cooperative solutions rather than competitive ones.",
}

var fiveOfPentacles = TarotCard{
	Emoji:         "5🪙",
	Name:          "fiveOfPentacles",
	Summary:       "The Five of Pentacles symbolizes feelings of deprivation, loss, or hardship, reflecting the fears of scarcity that may have been highlighted in the Four of Pentacles. This card emphasizes the importance of community support and recognizing that help is available, even in times of struggle.",
	Relationships: "In a relationship reading, the Five of Pentacles may indicate feelings of isolation or emotional deprivation. It can suggest a lack of support or resources in the relationship, urging partners to seek help and connect more deeply. This card reminds you that vulnerability can strengthen bonds.",
	Career:        "In a career context, the Five of Pentacles reflects financial difficulties or feelings of insecurity regarding your job. It suggests the need to seek assistance, whether from colleagues or support networks, to navigate these challenges. This card encourages focusing on collaboration and community to overcome obstacles.",
	Reversed:      "Reversed, the Five of Pentacles suggests recovery and improvement in financial or emotional circumstances. It may indicate a turning point where you begin to see the support available to you. This card encourages you to embrace help and seek out the resources you need to thrive.",
}

var sixOfWands = TarotCard{
	Emoji:         "6🕯️",
	Name:          "sixOfWands",
	Summary:       "The Six of Wands symbolizes victory and recognition, particularly after overcoming challenges. This card reflects the success achieved by applying the lessons learned from previous conflicts. It signifies a moment of triumph and the acknowledgment of personal growth that comes from navigating adversity.",
	Relationships: "In a relationship reading, the Six of Wands indicates a period of triumph, where conflicts from the past have been resolved. It suggests that partners are now experiencing recognition and appreciation for their efforts, leading to a strengthened bond. This card encourages celebrating achievements together and acknowledging each other's growth.",
	Career:        "In a career context, the Six of Wands signifies success and acknowledgment in your professional journey. It reflects the rewards of hard work and determination, often leading to promotions or public recognition. This card invites you to embrace your accomplishments while continuing to learn from your experiences.",
	Reversed:      "Reversed, the Six of Wands can indicate feelings of failure or a lack of recognition. It may suggest that despite hard work, you feel overlooked or unappreciated. This card encourages self-reflection on what success means to you and the importance of celebrating your achievements, even if they go unnoticed by others.",
}

var sixOfCups = TarotCard{
	Emoji:         "6⛲️",
	Name:          "sixOfCups",
	Summary:       "The Six of Cups represents nostalgia and reflection, often invoking memories of the past. This card encourages you to look back at earlier experiences, both sweet and bittersweet, highlighting how they shape your present. It suggests a time of emotional connection and reconciling with memories that may influence your current circumstances.",
	Relationships: "In a relationship reading, the Six of Cups signifies a longing for the innocence and joy of past connections. It encourages reminiscing about fond memories, but also warns against idealizing the past at the expense of the present. This card invites you to appreciate the growth that comes from reflecting on previous experiences in your relationships.",
	Career:        "In a career context, the Six of Cups reflects a sense of nostalgia for earlier days in your professional life. It may signify revisiting past projects or relationships that brought joy and fulfillment. This card encourages you to draw on your previous experiences to inform your current decisions and goals.",
	Reversed:      "Reversed, the Six of Cups can indicate an unhealthy focus on the past, possibly leading to difficulties in moving forward. It may suggest that you are dwelling on old memories at the expense of current opportunities. This card encourages you to find balance between honoring your past and engaging with the present.",
}

var sixOfSwords = TarotCard{
	Emoji:         "6⚔️",
	Name:          "sixOfSwords",
	Summary:       "The Six of Swords signifies a journey or transition, often involving moving away from conflict or troubled situations. This card reflects the process of escape and healing, encouraging you to leave behind what no longer serves you. It symbolizes a necessary shift towards calmer waters and a more positive outlook.",
	Relationships: "In a relationship reading, the Six of Swords indicates a period of healing or moving on from past conflicts. It may suggest that partners are choosing to leave behind negative patterns or damaged relationships in search of a healthier dynamic. This card encourages open communication and a commitment to mutual growth.",
	Career:        "In a career context, the Six of Swords reflects a transition away from a challenging work environment or project. It suggests a need to seek out new opportunities and leave behind what isn't working. This card encourages proactive steps toward change and the importance of navigating transitions with clarity.",
	Reversed:      "Reversed, the Six of Swords can indicate a refusal to move on or a feeling of being stuck in a challenging situation. It may suggest an inability to let go of past conflicts or negative experiences. This card encourages self-reflection on what is holding you back and the importance of seeking support for healing.",
}

var sixOfPentacles = TarotCard{
	Emoji:         "6🪙",
	Name:          "sixOfPentacles",
	Summary:       "The Six of Pentacles represents generosity and the act of giving and receiving. This card reflects a balance of material resources and encourages you to share your abundance with others, especially those who may have experienced scarcity in the past. It symbolizes the joy of supporting others and creating a sense of community.",
	Relationships: "In a relationship reading, the Six of Pentacles indicates a healthy dynamic of giving and receiving support. It suggests that partners are nurturing each other, fostering a sense of balance and generosity in their connection. This card encourages open communication about needs and the importance of mutual support.",
	Career:        "In a career context, the Six of Pentacles signifies a balance of giving and receiving in the workplace. It may reflect mentorship or collaboration, encouraging you to share your resources and knowledge with others. This card highlights the importance of community and support in achieving success.",
	Reversed:      "Reversed, the Six of Pentacles can indicate imbalance in giving and receiving, possibly leading to feelings of exploitation or selfishness. It may suggest that generosity is being taken for granted or that boundaries are not being respected. This card encourages reassessment of your relationships and the importance of equitable exchanges.",
}

var sevenOfWands = TarotCard{
	Emoji:         "7🕯️",
	Name:          "sevenOfWands",
	Summary:       "The Seven of Wands symbolizes struggle and the fight for personal beliefs or values. It represents a defensive stance where you may feel attacked or challenged. This card encourages standing your ground and asserting your position, even when the stakes are high and the pressure is on.",
	Relationships: "In a relationship reading, the Seven of Wands indicates a struggle to maintain your values and beliefs amidst challenges. It may suggest that you or your partner feel defensive, leading to conflicts that require open communication and assertiveness. This card encourages you to advocate for your needs while navigating tensions.",
	Career:        "In a career context, the Seven of Wands reflects a battle to assert your ideas or position in a competitive environment. It may signify a need to defend your achievements or fight against challenges that threaten your progress. This card encourages resilience and determination in pursuing your professional goals.",
	Reversed:      "Reversed, the Seven of Wands can indicate a sense of giving up or feeling overwhelmed by challenges. You may struggle with self-doubt or feel unprepared to defend your position. This card urges you to reassess your priorities and consider whether it’s time to step back and regroup.",
}

var sevenOfCups = TarotCard{
	Emoji:         "7⛲️",
	Name:          "sevenOfCups",
	Summary:       "The Seven of Cups signifies an emotional or intuitive struggle, often characterized by overwhelming choices and possibilities. This card invites you to reflect on your goals and desires while navigating confusion and uncertainty. It highlights the importance of clarity and commitment amidst myriad options.",
	Relationships: "In a relationship reading, the Seven of Cups indicates emotional confusion or difficulty in making commitments. It may suggest that you or your partner are overwhelmed by choices or fantasies, leading to indecision. This card encourages honest communication about desires and the importance of grounding your relationship in reality.",
	Career:        "In a career context, the Seven of Cups reflects a struggle to clarify your goals or direction amidst numerous opportunities. It may signify feelings of being overwhelmed by options or uncertainty about the right path. This card invites you to evaluate your priorities and focus on what truly aligns with your professional aspirations.",
	Reversed:      "Reversed, the Seven of Cups can indicate clarity and decisiveness after a period of confusion. It may suggest that you are ready to commit to a specific path or make choices that align with your true desires. This card encourages you to trust your instincts and take action toward your goals.",
}

var sevenOfSwords = TarotCard{
	Emoji:         "7⚔️",
	Name:          "sevenOfSwords",
	Summary:       "The Seven of Swords represents trickery, deception, and the complexity of navigating challenges through cunning. This card signifies a struggle where the focus is on strategy and outmaneuvering opposition, often at any cost. It invites you to reflect on your motivations and the ethical implications of your choices.",
	Relationships: "In a relationship reading, the Seven of Swords suggests issues of trust or deceit. It may indicate that one or both partners are not being completely honest, leading to emotional struggles. This card encourages open dialogue about intentions and the need to address any hidden motivations or feelings.",
	Career:        "In a career context, the Seven of Swords reflects a strategic struggle where you may be tempted to take shortcuts or engage in underhanded tactics to achieve success. This card warns against prioritizing victory over integrity and encourages you to consider the long-term consequences of your actions.",
	Reversed:      "Reversed, the Seven of Swords can indicate a need for honesty and transparency after a period of deception. It may suggest that you are ready to confront the consequences of past actions or recognize the importance of integrity in your pursuits. This card encourages building trust through open communication.",
}

var sevenOfPentacles = TarotCard{
	Emoji:         "7🪙",
	Name:          "sevenOfPentacles",
	Summary:       "The Seven of Pentacles signifies a struggle with time and the monotony of working toward long-term goals. It reflects a period of evaluation, where patience and perseverance are tested. This card invites you to assess your progress and consider whether the effort invested aligns with your desired outcomes.",
	Relationships: "In a relationship reading, the Seven of Pentacles indicates a time of reflection on the growth and stability of your partnership. It may suggest that you are evaluating whether the effort invested is yielding the desired results. This card encourages open discussions about future goals and the importance of nurturing the relationship.",
	Career:        "In a career context, the Seven of Pentacles reflects the challenges of delayed gratification and the need for patience in pursuing long-term success. It may signify a period of evaluation, where you consider whether your current path aligns with your goals. This card encourages you to stay committed and trust the process.",
	Reversed:      "Reversed, the Seven of Pentacles can indicate impatience or frustration with progress. You may feel tempted to give up or change direction prematurely. This card encourages reassessing your goals and recognizing the value of persistence, even when results take time to manifest.",
}

var eightOfWands = TarotCard{
	Emoji:         "8🕯️",
	Name:          "eightOfWands",
	Summary:       "The Eight of Wands signifies charging forward with determination and a strong will. It represents a time of swift action, where risks are taken, and progress is made rapidly. This card encourages you to harness your energy and momentum to pursue your goals and seize opportunities.",
	Relationships: "In a relationship reading, the Eight of Wands indicates a surge of passion and excitement. It may suggest that things are moving quickly, whether it's a new romance or rekindled passion in an existing partnership. This card encourages open communication and embracing the flow of emotions as you navigate this dynamic.",
	Career:        "In a career context, the Eight of Wands reflects a period of rapid advancement and opportunities. It signifies taking bold steps and making quick decisions that can lead to significant progress. This card encourages you to trust your instincts and act decisively in pursuing your professional goals.",
	Reversed:      "Reversed, the Eight of Wands can indicate delays or obstacles in your path. You may feel frustrated by a lack of progress or hindered by external factors. This card urges you to reassess your approach and be patient, as sometimes a moment of pause can lead to clearer insights.",
}

var eightOfCups = TarotCard{
	Emoji:         "8⛲️",
	Name:          "eightOfCups",
	Summary:       "The Eight of Cups represents a quest for deeper meaning and emotional fulfillment. It signifies a period of introspection and exploration, where you seek answers to fundamental questions or reassess what truly matters to you. This card invites you to embark on a journey of self-discovery and emotional healing.",
	Relationships: "In a relationship reading, the Eight of Cups indicates a desire for change or a search for deeper connection. You may feel a sense of dissatisfaction or longing for something more meaningful. This card encourages honest conversations about your needs and the importance of nurturing emotional bonds.",
	Career:        "In a career context, the Eight of Cups reflects a search for deeper satisfaction and purpose in your work. It may suggest a desire to leave behind unfulfilling jobs or roles in pursuit of more meaningful opportunities. This card encourages you to listen to your intuition and seek paths that align with your values.",
	Reversed:      "Reversed, the Eight of Cups can indicate a fear of change or a reluctance to confront your feelings. You may feel stuck in a situation that no longer serves you but hesitate to take action. This card urges you to reflect on what holds you back and consider taking the first steps toward change.",
}

var eightOfSwords = TarotCard{
	Emoji:         "8⚔️",
	Name:          "eightOfSwords",
	Summary:       "The Eight of Swords represents feelings of victimization and being trapped by circumstances. It signifies the angst and frustration that can arise from unbalanced situations, where overthinking or self-imposed limitations hinder your progress. This card invites you to recognize the power of your thoughts and beliefs in shaping your reality.",
	Relationships: "In a relationship reading, the Eight of Swords indicates feelings of entrapment or limitation in your partnership. You or your partner may feel restricted by fears or misunderstandings. This card encourages open dialogue to address concerns and break free from negative patterns that hinder growth.",
	Career:        "In a career context, the Eight of Swords reflects feelings of being stuck or restricted in your professional life. It may suggest that you are overwhelmed by challenges or self-doubt. This card encourages you to reassess your situation and recognize that the solutions may lie in changing your perspective.",
	Reversed:      "Reversed, the Eight of Swords can indicate a breakthrough or liberation from past constraints. You may find the courage to confront your fears and take proactive steps to overcome obstacles. This card encourages you to embrace your power and take control of your situation.",
}

var eightOfPentacles = TarotCard{
	Emoji:         "8🪙",
	Name:          "eightOfPentacles",
	Summary:       "The Eight of Pentacles signifies dedication to mastering a skill and the rewards of hard work. It represents patient practice and a focus on tangible results, reflecting a time of diligent effort and commitment to improvement. This card invites you to embrace the process of learning and growing in your pursuits.",
	Relationships: "In a relationship reading, the Eight of Pentacles indicates a commitment to nurturing and developing your partnership. It may suggest a time of working together to strengthen bonds and address any areas needing attention. This card encourages investing time and effort into the relationship for long-term growth.",
	Career:        "In a career context, the Eight of Pentacles reflects a dedication to honing your craft and achieving mastery. It signifies the importance of hard work and diligence in reaching your goals. This card encourages you to stay focused on your tasks and take pride in the progress you make along the way.",
	Reversed:      "Reversed, the Eight of Pentacles can indicate a lack of motivation or focus on your goals. You may feel overwhelmed by tasks or doubt the value of your efforts. This card encourages you to reassess your priorities and find ways to reignite your passion and commitment.",
}

var nineOfWands = TarotCard{
	Emoji:         "9🕯️",
	Name:          "nineOfWands",
	Summary:       "The Nine of Wands represents the culmination of effort and the gathering of strength for a final push. It signifies a time of resilience, where you draw on your past experiences to navigate challenges. This card invites you to maintain your determination and focus as you approach the completion of your goals.",
	Relationships: "In a relationship reading, the Nine of Wands indicates a period of holding on and preparing for the final stages of a connection. You may feel weary but determined to see things through. This card encourages you to communicate your needs and seek support as you navigate any challenges together.",
	Career:        "In a career context, the Nine of Wands reflects the perseverance needed to reach your goals. You may be feeling drained but are urged to keep pushing forward. This card encourages you to harness your past experiences to overcome obstacles and stay committed to your professional path.",
	Reversed:      "Reversed, the Nine of Wands can indicate burnout or a feeling of being overwhelmed. You may need to take a step back to recharge and reassess your priorities. This card reminds you to be kind to yourself and consider what adjustments are needed for your well-being.",
}

var nineOfCups = TarotCard{
	Emoji:         "9⛲️",
	Name:          "nineOfCups",
	Summary:       "The Nine of Cups symbolizes indulgence and self-gratification in anticipation of a satisfying conclusion. It represents emotional fulfillment and the joy of enjoying the fruits of your labor. This card invites you to embrace moments of pleasure and appreciate the abundance in your life.",
	Relationships: "In a relationship reading, the Nine of Cups signifies a time of emotional satisfaction and joy. You may feel a deep connection and happiness in your partnership. This card encourages you to celebrate the good times and express gratitude for the love and support you share.",
	Career:        "In a career context, the Nine of Cups reflects the rewards of hard work and dedication. It signifies achieving a sense of fulfillment and contentment in your professional life. This card encourages you to take a moment to celebrate your accomplishments and enjoy the fruits of your labor.",
	Reversed:      "Reversed, the Nine of Cups can indicate overindulgence or a sense of dissatisfaction despite apparent abundance. You may feel unfulfilled or seek deeper meaning beyond material pleasures. This card encourages you to reflect on what truly brings you joy and fulfillment.",
}

var nineOfSwords = TarotCard{
	Emoji:         "9⚔️",
	Name:          "nineOfSwords",
	Summary:       "The Nine of Swords represents anxiety and nightmares, highlighting feelings of helplessness. It signifies the worry that accompanies impending change or endings, often fueled by fear and self-doubt. This card invites you to confront your fears and seek clarity in the midst of distress.",
	Relationships: "In a relationship reading, the Nine of Swords indicates anxiety or worries that may be affecting your connection. You may feel overwhelmed by concerns or fears about the future. This card encourages open communication to address issues and work towards finding peace together.",
	Career:        "In a career context, the Nine of Swords reflects stress and anxiety related to work or professional obligations. You may feel burdened by pressure or uncertainty about your path. This card urges you to seek support and find healthy coping strategies to manage your stress.",
	Reversed:      "Reversed, the Nine of Swords can indicate a release from anxiety or the acknowledgment of fears. You may find the courage to confront what has been troubling you and seek solutions. This card encourages you to focus on positive actions and perspectives.",
}

var nineOfPentacles = TarotCard{
	Emoji:         "9 🪙",
	Name:          "nineOfPentacles",
	Summary:       "The Nine of Pentacles signifies material security and prosperity, reflecting the rewards of hard work and dedication. It represents a time of enjoying the fruits of your labor and feeling a sense of accomplishment. This card invites you to embrace your independence and revel in your achievements.",
	Relationships: "In a relationship reading, the Nine of Pentacles indicates a strong sense of self-sufficiency and independence within the partnership. You may be enjoying your own success while also valuing the connection you have. This card encourages you to celebrate both your individuality and your bond.",
	Career:        "In a career context, the Nine of Pentacles reflects financial stability and success achieved through diligent effort. It signifies the satisfaction that comes from your accomplishments and the freedom to enjoy your rewards. This card encourages you to continue pursuing your goals while appreciating your journey.",
	Reversed:      "Reversed, the Nine of Pentacles can indicate feelings of insecurity or a fear of losing your independence. You may struggle to enjoy your achievements or feel disconnected from your sense of self-worth. This card encourages you to focus on rebuilding confidence and recognizing your value.",
}

var tenOfWands = TarotCard{
	Emoji:         "10🕯️",
	Name:          "tenOfWands",
	Summary:       "The Ten of Wands represents the culmination of your vision, where you have shaped reality through your will. It signifies the burden of responsibility that comes with your achievements, reflecting both the weight of your accomplishments and the lessons learned along the way. This card invites you to acknowledge the responsibilities you've taken on and consider how to manage them moving forward.",
	Relationships: "In a relationship reading, the Ten of Wands indicates the weight of responsibilities within a partnership. You may feel overwhelmed by the expectations or obligations that have developed over time. This card encourages you to communicate openly with your partner about your feelings and seek ways to lighten the load together.",
	Career:        "In a career context, the Ten of Wands reflects the culmination of your efforts and the responsibilities that come with success. You may feel burdened by your workload or the demands of your position. This card encourages you to evaluate your priorities and find ways to delegate or manage your responsibilities effectively.",
	Reversed:      "Reversed, the Ten of Wands can indicate burnout or an inability to cope with the responsibilities you've taken on. You may be struggling to find balance and feeling overwhelmed. This card urges you to reassess your commitments and consider what you can release to restore your energy and focus.",
}

var tenOfCups = TarotCard{
	Emoji:         "10⛲️",
	Name:          "tenOfCups",
	Summary:       "The Ten of Cups symbolizes emotional fulfillment and the joy of building a secure foundation. It represents the deep understanding of your desires and relationships, leading to a bright and satisfying emotional future. This card invites you to embrace the love and happiness that surrounds you and to appreciate the connections you've nurtured.",
	Relationships: "In a relationship reading, the Ten of Cups signifies a time of joy, harmony, and emotional fulfillment. You may feel deeply connected to your partner, experiencing a sense of contentment and happiness together. This card encourages you to cherish these moments and celebrate the love you share.",
	Career:        "In a career context, the Ten of Cups reflects a sense of fulfillment and satisfaction in your professional life. You may feel a strong sense of purpose and connection to your work. This card encourages you to appreciate the positive relationships you've built and to continue nurturing them as you move forward.",
	Reversed:      "Reversed, the Ten of Cups can indicate emotional disconnection or dissatisfaction within relationships. You may be feeling unfulfilled or struggling to communicate your needs. This card urges you to reflect on what changes are needed to restore harmony and fulfillment in your emotional life.",
}

var tenOfSwords = TarotCard{
	Emoji:         "10⚔️",
	Name:          "tenOfSwords",
	Summary:       "The Ten of Swords represents the finality of something that has been slowly dying. It signifies the irrevocable end of an idea, relationship, or project, often due to mental errors such as misunderstandings or refusal to accept feedback. This card invites you to acknowledge the loss and reflect on the lessons learned from the experience.",
	Relationships: "In a relationship reading, the Ten of Swords indicates the end of a connection that may have been fraught with issues. You may be experiencing feelings of betrayal or loss. This card encourages you to allow yourself to grieve the end of this chapter and to focus on healing and moving forward.",
	Career:        "In a career context, the Ten of Swords reflects the culmination of a project or job that has not succeeded. You may face disappointment or the need to reassess your direction. This card urges you to learn from the experience and consider how to apply these lessons to future endeavors.",
	Reversed:      "Reversed, the Ten of Swords can indicate a refusal to accept an ending or a delay in closure. You may be holding onto something that is no longer serving you. This card encourages you to confront the reality of the situation and to seek closure to make room for new beginnings.",
}

var tenOfPentacles = TarotCard{
	Emoji:         "10 🪙",
	Name:          "tenOfPentacles",
	Summary:       "The Ten of Pentacles signifies mastery over your resources, time, and skills, resulting in financial and material security. It represents the culmination of hard work and dedication, reflecting the stability you've achieved for yourself and those you care about. This card invites you to celebrate your accomplishments and consider how to share your abundance.",
	Relationships: "In a relationship reading, the Ten of Pentacles indicates a strong foundation built on mutual support and shared goals. You may feel a deep connection with your partner, enjoying the stability and security of your bond. This card encourages you to continue nurturing these relationships and to celebrate the love and commitment you share.",
	Career:        "In a career context, the Ten of Pentacles reflects success and achievement in your professional life. You may have reached a point of financial security and stability through your hard work. This card encourages you to consider how you can use your resources to support others and to continue striving for growth and improvement.",
	Reversed:      "Reversed, the Ten of Pentacles can indicate financial instability or challenges related to material security. You may be feeling disconnected from your resources or struggling with family dynamics. This card urges you to reflect on what changes are needed to restore balance and security in your life.",
}

var pageOfWands = TarotCard{
	Emoji:         "📜🕯️",
	Name:          "pageOfWands",
	Summary:       "The Page of Wands symbolizes the spirit of adventure and the exploration of new passions. This card reflects enthusiasm and creativity, encouraging you to take bold steps toward your goals.",
	Relationships: "In a relationship reading, the Page of Wands suggests the excitement of new connections or rekindling passion. It often represents a fresh start filled with potential and discovery.",
	Career:        "In a career context, the Page of Wands signals new opportunities and creative projects that spark your interest. Embrace the possibilities and be open to learning and growth.",
	Reversed:      "Reversed, the Page of Wands may indicate immaturity or a lack of direction in your pursuits. It serves as a warning against impulsivity or scattered energy.",
}

var pageOfCups = TarotCard{
	Emoji:         "📜⛲️",
	Name:          "pageOfCups",
	Summary:       "The Page of Cups represents emotional exploration and creative inspiration. This card signifies the beginning of new feelings and relationships, inviting you to open your heart.",
	Relationships: "In a relationship reading, the Page of Cups indicates budding romance and the expression of affection. It encourages you to be open to love and to explore your emotional depths.",
	Career:        "In a career context, the Page of Cups promotes creativity and emotional fulfillment in your work. Seek out projects that resonate with your passions and intuition.",
	Reversed:      "Reversed, the Page of Cups can suggest emotional immaturity or unrealistic expectations in relationships. It may also indicate a struggle to express feelings honestly.",
}

var pageOfSwords = TarotCard{
	Emoji:         "📜⚔️",
	Name:          "pageOfSwords",
	Summary:       "The Page of Swords embodies curiosity and a quest for truth. This card reflects the need for clear communication and the courage to ask difficult questions.",
	Relationships: "In a relationship reading, the Page of Swords suggests open dialogue and the potential for misunderstandings. Honest communication is essential to navigate any challenges that arise.",
	Career:        "In a career context, the Page of Swords encourages you to express your ideas confidently and seek clarity in your work. Embrace your analytical skills and stay vigilant against misinformation.",
	Reversed:      "Reversed, the Page of Swords may indicate miscommunication or a tendency to jump to conclusions without sufficient evidence. It warns against being overly critical or defensive.",
}

var pageOfPentacles = TarotCard{
	Emoji:         "📜🪙",
	Name:          "pageOfPentacles",
	Summary:       "The Page of Pentacles symbolizes ambition and a desire for material growth. This card encourages you to focus on learning practical skills that will contribute to your long-term success.",
	Relationships: "In a relationship reading, the Page of Pentacles indicates a grounded connection based on shared goals and aspirations. It suggests a partnership where both parties are committed to personal and mutual growth.",
	Career:        "In a career context, the Page of Pentacles promotes education and skill-building in your professional life. Emphasize diligence and hard work to achieve your financial objectives.",
	Reversed:      "Reversed, the Page of Pentacles can signify a lack of focus or neglect of responsibilities. It may suggest impatience or a reluctance to put in the necessary effort.",
}

var knightOfWands = TarotCard{
	Emoji:         "♞🕯️",
	Name:          "knightOfWands",
	Summary:       "The Knight of Wands embodies adventure, passion, and a zest for life. This card signifies taking bold actions and pursuing one's dreams with enthusiasm and determination.",
	Relationships: "In a relationship reading, the Knight of Wands indicates a dynamic and exciting partnership. He encourages spontaneity and adventure, inspiring partners to explore new horizons together.",
	Career:        "In a career context, the Knight of Wands reflects a proactive and ambitious individual eager to chase opportunities. His energy promotes creativity and innovation, urging you to embrace challenges.",
	Reversed:      "Reversed, the Knight of Wands can signify recklessness or impatience. It suggests a tendency to rush into situations without proper planning, leading to potential conflicts or burnout.",
}

var knightOfCups = TarotCard{
	Emoji:         "♞⛲️",
	Name:          "knightOfCups",
	Summary:       "The Knight of Cups represents romanticism, idealism, and emotional depth. This card signifies the pursuit of dreams and a heartfelt approach to life’s challenges.",
	Relationships: "In a relationship reading, the Knight of Cups indicates a connection built on emotional support and creativity. He encourages open communication and expression of feelings between partners.",
	Career:        "In a career context, the Knight of Cups promotes a creative and compassionate work environment. His energy inspires you to pursue your passions and infuse your work with love and authenticity.",
	Reversed:      "Reversed, the Knight of Cups may indicate emotional turmoil or indecision. It suggests that being overly idealistic can lead to disappointment or difficulty in making choices.",
}

var knightOfSwords = TarotCard{
	Emoji:         "♞⚔️",
	Name:          "knightOfSwords",
	Summary:       "The Knight of Swords symbolizes intellectual prowess, assertiveness, and swift action. This card represents the drive to pursue truth and clarity, often without hesitation.",
	Relationships: "In a relationship reading, the Knight of Swords signifies the need for clear communication and intellectual stimulation. He encourages partners to engage in meaningful discussions and to challenge each other’s ideas.",
	Career:        "In a career context, the Knight of Swords promotes a decisive and strategic approach to problem-solving. His energy urges you to take charge and tackle challenges head-on with confidence.",
	Reversed:      "Reversed, the Knight of Swords can indicate impulsivity or a lack of direction. It suggests that hasty decisions may lead to misunderstandings or conflicts.",
}

var knightOfPentacles = TarotCard{
	Emoji:         "♞🪙",
	Name:          "knightOfPentacles",
	Summary:       "The Knight of Pentacles embodies reliability, hard work, and practicality. This card signifies a methodical approach to achieving goals and emphasizes the importance of perseverance.",
	Relationships: "In a relationship reading, the Knight of Pentacles indicates a stable and supportive partnership grounded in mutual respect. He encourages building a strong foundation through trust and commitment.",
	Career:        "In a career context, the Knight of Pentacles promotes diligence and attention to detail. His energy inspires you to focus on long-term goals and to create a solid plan for success.",
	Reversed:      "Reversed, the Knight of Pentacles may suggest stagnation or a lack of motivation. It indicates a tendency to become overly cautious or resistant to change, hindering progress.",
}

var queenOfWands = TarotCard{
	Emoji:         "👑🕯️",
	Name:          "queenOfWands",
	Summary:       "The Queen of Wands embodies confidence, charisma, and a magnetic presence. This card signifies leadership and the ability to inspire others through passion and creativity.",
	Relationships: "In a relationship reading, the Queen of Wands indicates a vibrant connection filled with excitement and mutual admiration. She encourages nurturing relationships where both partners feel empowered.",
	Career:        "In a career context, the Queen of Wands urges you to take charge and lead with enthusiasm. Her energy promotes innovation and the pursuit of projects that ignite your passions.",
	Reversed:      "Reversed, the Queen of Wands may indicate overbearing behavior or a lack of confidence in your abilities. It warns against letting self-doubt or jealousy cloud your judgement.",
}

var queenOfCups = TarotCard{
	Emoji:         "👑⛲️",
	Name:          "queenOfCups",
	Summary:       "The Queen of Cups embodies emotional intelligence and nurturing energy. This card symbolizes compassion, intuition, and the importance of connecting with your feelings and those of others.",
	Relationships: "In a relationship reading, the Queen of Cups indicates a strong emotional bond characterized by understanding and support. She encourages open communication and deepening intimacy.",
	Career:        "In a career context, the Queen of Cups reflects a supportive environment where empathy and emotional connections are valued. This card suggests that intuition and compassion will guide your decisions.",
	Reversed:      "Reversed, the Queen of Cups may indicate emotional overwhelm or a tendency to suppress feelings. It warns against becoming overly dependent on others for emotional validation.",
}

var queenOfSwords = TarotCard{
	Emoji:         "👑⚔️",
	Name:          "queenOfSwords",
	Summary:       "The Queen of Swords symbolizes clarity of thought, independence, and strong communication skills. This card represents the ability to make rational decisions while remaining objective.",
	Relationships: "In a relationship reading, the Queen of Swords signifies the need for honest communication and clear boundaries. She encourages partners to be straightforward and to resolve conflicts with integrity.",
	Career:        "In a career context, the Queen of Swords urges you to rely on your intellect and experience to navigate challenges. She embodies the power of critical thinking and strategic planning.",
	Reversed:      "Reversed, the Queen of Swords can indicate a lack of empathy or communication issues. It suggests that harsh words or overly critical attitudes may harm relationships.",
}

var queenOfPentacles = TarotCard{
	Emoji:         "👑🪙",
	Name:          "queenOfPentacles",
	Summary:       "The Queen of Pentacles embodies practicality, nurturing, and financial security. This card symbolizes the ability to create a stable foundation for yourself and those you care about.",
	Relationships: "In a relationship reading, the Queen of Pentacles signifies a stable partnership focused on mutual support and shared responsibilities. This card encourages nurturing relationships where both partners thrive.",
	Career:        "In a career context, the Queen of Pentacles promotes a balanced work-life environment, emphasizing the importance of caring for your resources and those around you. Her energy encourages long-term planning and financial responsibility.",
	Reversed:      "Reversed, the Queen of Pentacles may indicate neglect of self-care or being overly focused on material matters. It warns against allowing financial concerns to overshadow emotional needs.",
}

var kingOfWands = TarotCard{
	Emoji:         "🫅🕯️",
	Name:          "kingOfWands",
	Summary:       "The King of Wands symbolizes visionary leadership and the courage to take bold actions. This card represents the ability to inspire others and turn dreams into reality.",
	Relationships: "In a relationship reading, the King of Wands indicates a passionate partnership built on mutual respect and admiration. He encourages taking initiative to foster deeper connections.",
	Career:        "In a career context, the King of Wands reflects a strong leader who motivates others through his vision and charisma. He encourages embracing challenges and pursuing innovative ideas.",
	Reversed:      "Reversed, the King of Wands can indicate arrogance or a tendency to disregard the opinions of others. It may suggest a struggle to follow through on ambitious plans.",
}

var kingOfCups = TarotCard{
	Emoji:         "🫅⛲️",
	Name:          "kingOfCups",
	Summary:       "The King of Cups embodies emotional maturity and balance, representing a deep understanding of feelings. This card signifies the ability to navigate complex emotions with grace and compassion.",
	Relationships: "In a relationship reading, the King of Cups indicates a strong emotional connection where both partners support each other. He encourages open communication and understanding of each other’s needs.",
	Career:        "In a career context, the King of Cups promotes a leadership style that values empathy and emotional intelligence. He encourages you to create a harmonious work environment that fosters collaboration.",
	Reversed:      "Reversed, the King of Cups may indicate emotional instability or difficulties in expressing feelings. It suggests that repressed emotions may lead to confusion or conflict.",
}

var kingOfSwords = TarotCard{
	Emoji:         "🫅⚔️",
	Name:          "kingOfSwords",
	Summary:       "The King of Swords symbolizes authority, intellect, and clarity. This card represents the ability to make informed decisions based on logic and rationality.",
	Relationships: "In a relationship reading, the King of Swords signifies the need for honest communication and intellectual connection. He encourages clarity and transparency to strengthen bonds.",
	Career:        "In a career context, the King of Swords urges you to take charge and lead with integrity. His energy promotes strategic thinking and the ability to navigate challenges effectively.",
	Reversed:      "Reversed, the King of Swords can indicate a misuse of power or a lack of clarity in communication. It suggests that harsh judgements may lead to conflicts or misunderstandings.",
}

var kingOfPentacles = TarotCard{
	Emoji:         "🫅🪙",
	Name:          "kingOfPentacles",
	Summary:       "The King of Pentacles embodies financial security and abundance, representing a master of material success. This card signifies the ability to provide for oneself and others through hard work and dedication.",
	Relationships: "In a relationship reading, the King of Pentacles indicates a stable and supportive partnership grounded in shared values. He encourages building a secure foundation for mutual growth.",
	Career:        "In a career context, the King of Pentacles promotes a pragmatic approach to business and investments. His energy encourages diligence and strategic planning for long-term success.",
	Reversed:      "Reversed, the King of Pentacles may indicate a focus on materialism at the expense of emotional well-being. It suggests that financial concerns may overshadow personal relationships.",
}

var fool = TarotCard{
	Emoji:         "🤣♻️",
	Name:          "fool",
	Summary:       "The Fool represents new beginnings and the spirit of adventure. This card encourages you to take risks and embrace the unknown, trusting that the journey will lead to growth and discovery.",
	Relationships: "In relationships, the Fool signifies the excitement of new connections or the need to approach love with a fresh perspective. It encourages spontaneity and an open heart, reminding you to enjoy the journey.",
	Career:        "In a career context, the Fool suggests pursuing new opportunities or ventures without fear of failure. It encourages a sense of freedom and creativity, urging you to explore paths that excite you.",
	Reversed:      "Reversed, the Fool can indicate recklessness or a lack of direction. It warns against making impulsive decisions without considering potential consequences.",
}

var magician = TarotCard{
	Emoji:         "🦊🌀",
	Name:          "magician",
	Summary:       "The Magician symbolizes manifestation and the power of creation. This card signifies the ability to harness your skills and resources to turn your ideas into reality, urging you to take action.",
	Relationships: "In relationships, the Magician indicates the potential for deep connections based on shared goals and mutual support. It encourages you to communicate openly and be proactive in nurturing your bonds.",
	Career:        "In a career context, the Magician reflects the use of your talents and skills to achieve success. It signifies a time to take initiative and focus your energy on bringing your ambitions to fruition.",
	Reversed:      "Reversed, the Magician may indicate manipulation or misuse of power. It warns against deceitful behavior or failing to use your talents effectively.",
}

var highPriestess = TarotCard{
	Emoji:         "🦋🔮",
	Name:          "highPriestess",
	Summary:       "The High Priestess embodies intuition, mystery, and inner wisdom. This card encourages you to trust your instincts and seek answers within, reflecting a deep connection to your subconscious.",
	Relationships: "In relationships, the High Priestess suggests a need for deeper emotional understanding and communication. It encourages you to explore the unspoken feelings and desires within your partnerships.",
	Career:        "In a career context, the High Priestess promotes a reflective approach, urging you to listen to your intuition when making decisions. She symbolizes the importance of understanding the underlying currents in your work environment.",
	Reversed:      "Reversed, the High Priestess can indicate secrets or hidden agendas. It warns against ignoring your intuition or becoming disconnected from your inner voice.",
}

var empress = TarotCard{
	Emoji:         "🌳🚺",
	Name:          "empress",
	Summary:       "The Empress symbolizes abundance, creativity, and nurturing energy. This card reflects the beauty of nature and the importance of self-care, encouraging you to embrace your femininity and creativity.",
	Relationships: "In relationships, the Empress signifies deep emotional connections and the joy of nurturing others. She encourages you to cultivate love and harmony, reminding you of the importance of empathy and support.",
	Career:        "In a career context, the Empress reflects creativity and the successful manifestation of ideas. She encourages you to create a harmonious work environment and to nurture your projects with care.",
	Reversed:      "Reversed, the Empress can indicate neglect or overindulgence. It warns against focusing too much on material matters at the expense of emotional well-being.",
}

var emperor = TarotCard{
	Emoji:         "🌲🚹",
	Name:          "emperor",
	Summary:       "The Emperor represents authority, stability, and structure. This card signifies the importance of leadership and discipline in achieving your goals, urging you to take control of your circumstances.",
	Relationships: "In relationships, the Emperor indicates the need for clear boundaries and structure. It suggests a partnership based on mutual respect, where both parties feel secure and supported.",
	Career:        "In a career context, the Emperor encourages a strategic approach to your work, emphasizing organization and strong leadership. He symbolizes the power to influence and create lasting impact.",
	Reversed:      "Reversed, the Emperor may indicate rigidity or abuse of power. It warns against becoming overly controlling or neglecting the needs of others.",
}

var hierophant = TarotCard{
	Emoji:         "🗝🙌🏽",
	Name:          "hierophant",
	Summary:       "The Hierophant symbolizes tradition, spiritual guidance, and conformity. This card reflects the importance of seeking wisdom from established institutions and mentors, urging you to honor your values.",
	Relationships: "In relationships, the Hierophant signifies the importance of shared beliefs and values. It encourages you to build a partnership based on mutual respect and understanding of each other's traditions.",
	Career:        "In a career context, the Hierophant promotes collaboration and adherence to established protocols. It signifies a time for learning from mentors and adhering to the rules to achieve success.",
	Reversed:      "Reversed, the Hierophant can indicate rebellion against tradition or dogma. It suggests a need to question established beliefs and seek your own path.",
}

var lovers = TarotCard{
	Emoji:         "👉🏻👌🏻",
	Name:          "lovers",
	Summary:       "The Lovers symbolizes deep emotional connections and choices in relationships. This card reflects the importance of harmony and love, encouraging you to follow your heart when making decisions.",
	Relationships: "In relationships, the Lovers signifies a strong bond characterized by mutual attraction and understanding. It encourages open communication and shared values to strengthen your connection.",
	Career:        "In a career context, the Lovers reflect partnerships and collaboration. This card urges you to align your work with your values and to seek harmony in your professional relationships.",
	Reversed:      "Reversed, the Lovers may indicate disharmony or difficult choices. It warns against ignoring your feelings or compromising your values for the sake of others.",
}

var chariot = TarotCard{
	Emoji:         "🛵👓",
	Name:          "chariot",
	Summary:       "The Chariot symbolizes determination, willpower, and victory through control. This card encourages you to harness your inner strength to overcome obstacles and achieve your goals.",
	Relationships: "In relationships, the Chariot indicates the importance of balance and direction in your partnerships. It encourages you to work together to navigate challenges and maintain harmony.",
	Career:        "In a career context, the Chariot reflects the drive to succeed and the ability to overcome challenges through discipline. It signifies a time for taking charge and moving forward with confidence.",
	Reversed:      "Reversed, the Chariot can indicate a loss of direction or lack of control. It warns against recklessness or being overly aggressive in your pursuits.",
}

var strength = TarotCard{
	Emoji:         "🦁🌹",
	Name:          "strength",
	Summary:       "Strength represents courage, inner strength, and compassion. This card signifies the power of love and understanding to overcome challenges, urging you to embrace your true self.",
	Relationships: "In relationships, Strength encourages nurturing bonds through patience and understanding. It emphasizes the importance of compassion and support in overcoming obstacles together.",
	Career:        "In a career context, Strength signifies the ability to handle challenges with grace and resilience. It encourages you to trust your instincts and maintain a positive attitude in the face of adversity.",
	Reversed:      "Reversed, Strength can indicate self-doubt or insecurity. It warns against using aggression or force to achieve your goals, suggesting a need to reconnect with your inner strength.",
}

var hermit = TarotCard{
	Emoji:         "🗿💡",
	Name:          "hermit",
	Summary:       "The Hermit symbolizes introspection, solitude, and spiritual growth. This card encourages you to take time for self-reflection and seek inner guidance to find your true path.",
	Relationships: "In relationships, the Hermit signifies a time for introspection and understanding one's needs. It encourages you to embrace solitude as a way to gain clarity before deepening connections.",
	Career:        "In a career context, the Hermit suggests a need for reflection on your professional goals and aspirations. It signifies a time to seek wisdom and guidance from within to make informed decisions.",
	Reversed:      "Reversed, the Hermit can indicate isolation or a refusal to confront inner truths. It warns against withdrawing from others and neglecting your social connections.",
}

var wheelOfFortune = TarotCard{
	Emoji:         "🎡💰",
	Name:          "wheelOfFortune",
	Summary:       "The Wheel of Fortune symbolizes cycles, change, and destiny. This card reflects the ebb and flow of life, reminding you that change is constant and encouraging you to embrace the journey.",
	Relationships: "In relationships, the Wheel of Fortune signifies the ups and downs that can occur within partnerships. It encourages you to adapt to changes and appreciate the lessons learned through different phases.",
	Career:        "In a career context, the Wheel of Fortune indicates the potential for change in your professional life. It encourages you to remain adaptable and open to new opportunities that may arise unexpectedly.",
	Reversed:      "Reversed, the Wheel of Fortune may indicate resistance to change or a feeling of being stuck. It warns against clinging to the past or failing to recognize the lessons in your current situation.",
}

var justice = TarotCard{
	Emoji:         "⚔️⚖️",
	Name:          "justice",
	Summary:       "Justice symbolizes fairness, truth, and balance. This card reflects the importance of making decisions based on integrity and moral principles, urging you to seek fairness in all situations.",
	Relationships: "In relationships, Justice signifies the need for open communication and honesty. It encourages you to address any imbalances or injustices within your partnerships to foster trust and understanding.",
	Career:        "In a career context, Justice promotes ethical decision-making and accountability. It encourages you to consider the consequences of your actions and to strive for fairness in your professional dealings.",
	Reversed:      "Reversed, Justice can indicate dishonesty or unfairness. It warns against neglecting responsibilities or failing to consider the ethical implications of your choices.",
}

var hangedMan = TarotCard{
	Emoji:         "🙃🌴",
	Name:          "hangedMan",
	Summary:       "The Hanged Man symbolizes surrender, letting go, and seeing things from a new perspective. This card encourages you to embrace patience and acceptance, recognizing that sometimes inaction can lead to growth.",
	Relationships: "In relationships, the Hanged Man indicates a need to pause and reflect on your connections. It encourages you to understand different viewpoints and reassess your priorities within your partnerships.",
	Career:        "In a career context, the Hanged Man suggests a time for contemplation and reassessment of your professional path. It encourages you to consider alternative approaches and embrace the lessons of waiting.",
	Reversed:      "Reversed, the Hanged Man can indicate stagnation or resistance to change. It warns against clinging to old ways of thinking and encourages you to release attachments that no longer serve you.",
}

var death = TarotCard{
	Emoji:         "☠️🌦",
	Name:          "death",
	Summary:       "Death symbolizes transformation, endings, and new beginnings. This card encourages you to let go of the old to make way for the new, embracing the natural cycles of life and growth.",
	Relationships: "In relationships, Death signifies the end of a chapter and the opportunity for renewal. It encourages you to release what no longer serves you to create space for deeper connections.",
	Career:        "In a career context, Death indicates significant changes that can lead to new opportunities. It encourages you to embrace transformation and to view endings as a chance for growth and evolution.",
	Reversed:      "Reversed, Death can indicate resistance to change or fear of the unknown. It warns against clinging to the past and suggests a need to confront what is holding you back.",
}

var temperance = TarotCard{
	Emoji:         "😇🌈",
	Name:          "temperance",
	Summary:       "Temperance symbolizes balance, harmony, and moderation. This card encourages you to find equilibrium in your life and to blend opposing forces to achieve a state of peace.",
	Relationships: "In relationships, Temperance signifies the importance of compromise and understanding. It encourages you to find common ground and work together to create harmony within your partnerships.",
	Career:        "In a career context, Temperance promotes collaboration and the blending of ideas. It encourages you to approach your work with patience and to seek balance between different aspects of your professional life.",
	Reversed:      "Reversed, Temperance can indicate excess or imbalance. It warns against overindulgence or neglecting important areas of your life, urging you to find moderation.",
}

var devil = TarotCard{
	Emoji:         "😈🐐",
	Name:          "devil",
	Summary:       "The Devil symbolizes temptation, materialism, and bondage. This card reflects the darker aspects of human nature, urging you to confront your fears and release yourself from limiting beliefs.",
	Relationships: "In relationships, the Devil indicates unhealthy dynamics and dependency. It encourages you to examine the underlying issues that may be contributing to feelings of entrapment or control.",
	Career:        "In a career context, the Devil can signify being trapped in a job that no longer serves you or pursuing material success at the expense of your values. It urges you to reassess your motivations and seek freedom from negative influences.",
	Reversed:      "Reversed, the Devil may indicate liberation from bondage and the breaking of unhealthy patterns. It suggests a newfound sense of empowerment and the ability to overcome fears.",
}

var tower = TarotCard{
	Emoji:         "🌋💥",
	Name:          "tower",
	Summary:       "The Tower symbolizes upheaval, chaos, and revelation. This card indicates a sudden change that shakes the foundations of your life, urging you to embrace the lessons that come from destruction.",
	Relationships: "In relationships, the Tower signifies a crisis or significant disruption that leads to transformation. It encourages you to face the truth and rebuild on a stronger foundation after upheaval.",
	Career:        "In a career context, the Tower indicates a sudden shift or realization that forces you to reevaluate your path. It encourages you to embrace change and see it as an opportunity for growth.",
	Reversed:      "Reversed, the Tower may suggest avoiding necessary change or clinging to illusions. It warns against resisting the truth and encourages you to confront difficult situations head-on.",
}

var star = TarotCard{
	Emoji:         "⭐️🏺",
	Name:          "star",
	Summary:       "The Star symbolizes hope, inspiration, and renewal. This card reflects a sense of peace and tranquility, urging you to maintain faith in the future and your abilities.",
	Relationships: "In relationships, the Star signifies healing and a renewed sense of connection. It encourages you to nurture your partnerships with compassion and optimism, fostering deeper emotional bonds.",
	Career:        "In a career context, the Star indicates inspiration and clarity about your professional goals. It encourages you to pursue your passions with confidence and to believe in your potential.",
	Reversed:      "Reversed, the Star can indicate feelings of hopelessness or disconnection. It warns against losing sight of your dreams and encourages you to reconnect with your inner light.",
}

var moon = TarotCard{
	Emoji:         "🌜🦐",
	Name:          "moon",
	Summary:       "The Moon symbolizes intuition, dreams, and the subconscious. This card reflects the importance of navigating uncertainty and embracing the mysteries of life, urging you to trust your instincts.",
	Relationships: "In relationships, the Moon indicates emotional complexity and the need for open communication. It encourages you to explore your feelings and address any fears or anxieties that may arise.",
	Career:        "In a career context, the Moon signifies navigating ambiguity and trusting your intuition. It encourages you to embrace creativity and explore uncharted territories in your professional life.",
	Reversed:      "Reversed, the Moon can indicate confusion or deception. It warns against ignoring your intuition and encourages you to seek clarity and truth.",
}

var sun = TarotCard{
	Emoji:         "🌞🐴",
	Name:          "sun",
	Summary:       "The Sun symbolizes joy, success, and vitality. This card reflects a period of positivity and abundance, encouraging you to celebrate your achievements and embrace life with enthusiasm.",
	Relationships: "In relationships, the Sun signifies happiness and fulfillment in partnerships. It encourages you to express your love and appreciation, fostering a joyful and harmonious connection.",
	Career:        "In a career context, the Sun indicates success and recognition for your efforts. It encourages you to pursue your passions and embrace opportunities for growth and expansion.",
	Reversed:      "Reversed, the Sun can indicate temporary setbacks or a lack of clarity. It warns against losing sight of your goals and encourages you to remain optimistic in challenging times.",
}

var judgement = TarotCard{
	Emoji:         "⚰️👻",
	Name:          "judgement",
	Summary:       "Judgement symbolizes rebirth, reflection, and evaluation. This card encourages you to assess your past choices and actions, urging you to embrace transformation and make necessary changes.",
	Relationships: "In relationships, judgement signifies a time for honesty and clarity. It encourages you to reflect on your connections and consider how you can foster growth and healing together.",
	Career:        "In a career context, judgement indicates a time for evaluation and reassessment of your professional path. It encourages you to embrace feedback and learn from past experiences to move forward with purpose.",
	Reversed:      "Reversed, judgement can indicate avoidance of self-reflection or fear of change. It warns against repeating past mistakes and encourages you to confront your responsibilities.",
}

var world = TarotCard{
	Emoji:         "🌍💯",
	Name:          "world",
	Summary:       "The World symbolizes completion, fulfillment, and wholeness. This card reflects the successful achievement of goals and the sense of belonging, encouraging you to celebrate your accomplishments.",
	Relationships: "In relationships, the World signifies harmony and the culmination of shared experiences. It encourages you to embrace the journey together and appreciate the growth you’ve achieved as a couple.",
	Career:        "In a career context, the World indicates the successful completion of projects and the attainment of professional goals. It encourages you to reflect on your achievements and consider new horizons for growth.",
	Reversed:      "Reversed, the World can indicate feelings of incompleteness or unfulfilled potential. It warns against neglecting your accomplishments and encourages you to embrace the journey toward wholeness.",
}
