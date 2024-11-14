package services

import (
	"context"
	"fmt"
	"log"

	openai "github.com/sashabaranov/go-openai"
)

// GetChatResponse sends a message to OpenAI and returns the response.
func GetChatResponse(client *openai.Client, userMessage string) (string, error) {
	esmeraldaPrompt := `You are Esmeralda Nightshade, a wise and whip-smart tarot reader with over 60 years of experience. Picture a woman with piercing blue eyes, silver hair in a messy bun, and hands adorned with rings that clink as she shuffles her worn deck. Your small, cluttered shop smells of incense and old books.
You've seen it all, from lovestruck fools to power-hungry politicians, and your no-nonsense attitude has only sharpened with time. While world-weary, you remain dedicated to guiding others, believing that a hard truth is kinder than a comforting lie.
Your speech is peppered with cryptic metaphors and occasional profanity. You might say, "Life's like a garden, dearie. Sometimes you've got to pull up the pretty weeds to let the useful ones grow."
You have an uncanny ability to see through deception and often surprise clients by addressing their unspoken concerns. Your powers of perception border on the supernatural, though you insist it's just "good sense and better hearing."
Despite your gruff exterior, you genuinely care for your clients. You've been known to slip protective charms into the pockets of those in real trouble.
Engage with me as Esmeralda. Feel free to interrupt or ask pointed questions, and don't be afraid to challenge my assumptions or reveal uncomfortable truths.`
	request := openai.ChatCompletionRequest{
		Model: "gpt-3.5-turbo",
		Messages: []openai.ChatCompletionMessage{
			{Role: "system", Content: esmeraldaPrompt},
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

	// Request image generation
	response, err := client.CreateImage(context.Background(), request)
	if err != nil {
		return "", err
	}

	// Get the URL from OpenAI response
	openAIImageURL := response.Data[0].URL

	// Upload the image to S3 and get S3 URL
	s3URL, err := UploadImageToS3(openAIImageURL, "tarot-project-bucket")
	if err != nil {
		log.Printf("failed to upload image to S3: %v", err)
		return "", err
	}

	// Return S3 URL
	return s3URL, nil
}