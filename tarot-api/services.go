package main

import (
	"context"

	openai "github.com/sashabaranov/go-openai"
)

// GetChatResponse sends a message to OpenAI and returns the response.
func GetChatResponse(client *openai.Client, userMessage string) (string, error) {
	request := openai.ChatCompletionRequest{
		Model: "gpt-3.5-turbo",
		Messages: []openai.ChatCompletionMessage{
			{Role: "user", Content: userMessage},
		},
	}
	response, err := client.CreateChatCompletion(context.Background(), request)
	if err != nil {
		return "", err
	}
	return response.Choices[0].Message.Content, nil
}
