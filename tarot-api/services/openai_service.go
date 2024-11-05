package services

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
	description := fmt.Sprintf("The tarot card %s depicted in a %s theme, without any words.", card, theme)
	request := openai.ImageRequest{
		Model:          "dall-e-3",
		Prompt:         description,
		Size:           openai.CreateImageSize1024x1792,
		ResponseFormat: openai.CreateImageResponseFormatURL,
		N:              1,
		Style:          "vivid",
	}
	response, err := client.CreateImage(context.Background(), request)
	if err != nil {
		return "", err
	}
	return response.Data[0].URL, nil
}
