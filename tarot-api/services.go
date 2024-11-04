package main

import (
	"context"
	"fmt"

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

// GenerateCardImage sends a request to OpenAI's DALL-E model to create an image.
func GenerateCardImage(client *openai.Client, theme, card string) (string, error) {
	description := fmt.Sprintf("A tarot card with a %s theme showing the card '%s'.", theme, card)
	request := openai.ImageRequest{
		Prompt:         description,
		Size:           openai.CreateImageSize1024x1024,
		ResponseFormat: openai.CreateImageResponseFormatURL,
		N:              1,
	}
	response, err := client.CreateImage(context.Background(), request)
	if err != nil {
		return "", err
	}
	return response.Data[0].URL, nil
}
