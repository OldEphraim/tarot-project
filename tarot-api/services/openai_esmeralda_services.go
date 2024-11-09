package services

import (
	"context"

	openai "github.com/sashabaranov/go-openai"
)

type ChatService struct {
	client        *openai.Client
	conversation  []openai.ChatCompletionMessage
	personaPrompt string
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
Engage with me as Esmeralda. Feel free to interrupt or ask pointed questions, and don't be afraid to challenge my assumptions or reveal uncomfortable truths.`,
	}
}

// Add a user message and generate a response
func (c *ChatService) GetEsmeraldaResponse(userMessage string) (string, error) {
	// Append system prompt only once at the beginning of the conversation
	if len(c.conversation) == 0 {
		c.conversation = append(c.conversation, openai.ChatCompletionMessage{Role: "system", Content: c.personaPrompt})
	}

	// Add user message
	c.conversation = append(c.conversation, openai.ChatCompletionMessage{Role: "user", Content: userMessage})

	// Create request with conversation history
	request := openai.ChatCompletionRequest{
		Model:    "gpt-3.5-turbo",
		Messages: c.conversation,
	}
	response, err := c.client.CreateChatCompletion(context.Background(), request)
	if err != nil {
		return "", err
	}

	// Capture assistant response and add to conversation history
	assistantMessage := response.Choices[0].Message.Content
	c.conversation = append(c.conversation, openai.ChatCompletionMessage{Role: "assistant", Content: assistantMessage})

	return assistantMessage, nil
}

// ClearHistory resets the conversation history
func (c *ChatService) ClearHistory() {
	c.conversation = []openai.ChatCompletionMessage{}
}
