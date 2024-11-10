package services

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	openai "github.com/sashabaranov/go-openai"
)

type ChatService struct {
	client            *openai.Client
	conversation      []openai.ChatCompletionMessage
	personaPrompt     string
	preferredArtStyle string
}

// EsmeraldaService creates a new instance with OpenAI client and default settings
func EsmeraldaService(client *openai.Client) *ChatService {
	return &ChatService{
		client: client,
		personaPrompt: `You are Esmeralda Nightshade, a wise and whip-smart tarot reader with over 60 years of experience. Picture a woman with piercing blue eyes, silver hair in a messy bun, and hands adorned with rings that clink as she shuffles her worn deck. Your small, cluttered shop smells of incense and old books.
		You've seen it all, from lovestruck fools to power-hungry politicians, and your no-nonsense attitude has only sharpened with time. While world-weary, you remain dedicated to guiding others, believing that a hard truth is kinder than a comforting lie.
		Your speech is peppered with cryptic metaphors and occasional profanity. You might say, "Life's like a garden, dearie. Sometimes you've got to pull up the pretty weeds to let the useful ones grow."
		You have an uncanny ability to see through deception and often surprise clients by addressing their unspoken concerns. Your powers of perception border on the supernatural, though you insist it's just "good sense and better hearing."
		Despite your gruff exterior, you genuinely care for your clients. You've been known to slip protective charms into the pockets of those in real trouble.
		Engage with me as Esmeralda. Feel free to interrupt or ask pointed questions, and don't be afraid to challenge my assumptions or reveal uncomfortable truths.
		You may offer to draw cards and ask the user what art style they would prefer, explaining tarot spreads appropriate to their situation, but allow the user to choose their preferred art style.`,
	}
}

// GetEsmeraldaResponse generates Esmeralda's response to the user's message and analyzes for art style preference.
func (c *ChatService) GetEsmeraldaResponse(userMessage string) (string, error) {
	// Add initial system prompt if conversation is starting
	if len(c.conversation) == 0 {
		c.conversation = append(c.conversation, openai.ChatCompletionMessage{Role: "system", Content: c.personaPrompt})
	}

	// Append user's message
	c.conversation = append(c.conversation, openai.ChatCompletionMessage{Role: "user", Content: userMessage})

	// Log the user's message and current conversation state
	log.Printf("User message received: %s", userMessage)

	// Analyze user message for art style preferences
	c.analyzeUserArtStyle(userMessage)

	// Generate Esmeralda's response
	request := openai.ChatCompletionRequest{
		Model:    "gpt-3.5-turbo",
		Messages: c.conversation,
	}

	response, err := c.client.CreateChatCompletion(context.Background(), request)
	if err != nil {
		return "", fmt.Errorf("failed to get Esmeralda's response: %v", err)
	}

	assistantMessage := response.Choices[0].Message.Content
	c.conversation = append(c.conversation, openai.ChatCompletionMessage{Role: "assistant", Content: assistantMessage})

	// Log Esmeralda's response
	log.Printf("Esmeralda's response: %s", assistantMessage)

	return assistantMessage, nil
}

// analyzeUserArtStyle uses OpenAI to determine if the user has specified a preferred art style
func (c *ChatService) analyzeUserArtStyle(message string) {
	prompt := fmt.Sprintf(`
	Analyze the following message from the user:
	Message: %s
	Has the user specified a preferred art style for tarot cards?
	Respond with JSON only, following this format:
	{ "preferredArtStyle": "art style if any" }
	`, message)

	analysis, err := c.callOpenAIForAnalysis(prompt)
	if err != nil {
		log.Printf("Error analyzing user art style: %v", err)
		return
	}

	// Log the raw JSON response for debugging
	log.Printf("Raw response for user art style analysis: %s", analysis)

	// Parse JSON response to update preferredArtStyle if provided
	var parsedResponse struct {
		PreferredArtStyle string `json:"preferredArtStyle"`
	}

	err = json.Unmarshal([]byte(analysis), &parsedResponse)
	if err != nil {
		log.Printf("Failed to parse JSON for art style: %v", err)
		return
	}

	if parsedResponse.PreferredArtStyle != "" {
		c.preferredArtStyle = parsedResponse.PreferredArtStyle
		log.Printf("User preferred art style updated to: %s", c.preferredArtStyle)
	}
}

// callOpenAIForAnalysis is a helper to avoid duplicated code for OpenAI analysis requests
func (c *ChatService) callOpenAIForAnalysis(prompt string) (string, error) {
	request := openai.ChatCompletionRequest{
		Model: "gpt-3.5-turbo",
		Messages: []openai.ChatCompletionMessage{
			{Role: "system", Content: "You are a system assistant providing JSON-formatted responses for structured data analysis."},
			{Role: "user", Content: prompt},
		},
	}

	response, err := c.client.CreateChatCompletion(context.Background(), request)
	if err != nil {
		return "", fmt.Errorf("OpenAI analysis request failed: %v", err)
	}
	return response.Choices[0].Message.Content, nil
}
