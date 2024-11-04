package utils

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

// SaveImage downloads an image from the given URL and saves it to the specified folder.
func SaveImage(imageURL, filename string) error {
	// Define the folder where images will be saved
	folderPath := "generated_images"

	// Ensure the folder exists
	err := os.MkdirAll(folderPath, os.ModePerm)
	if err != nil {
		return fmt.Errorf("failed to create folder: %v", err)
	}

	// Create the full file path
	filePath := filepath.Join(folderPath, filename)

	// Download the image
	response, err := http.Get(imageURL)
	if err != nil {
		return fmt.Errorf("failed to download image: %v", err)
	}
	defer response.Body.Close()

	// Create the file
	file, err := os.Create(filePath)
	if err != nil {
		return fmt.Errorf("failed to create file: %v", err)
	}
	defer file.Close()

	// Copy the response body into the file
	_, err = io.Copy(file, response.Body)
	if err != nil {
		return fmt.Errorf("failed to save image: %v", err)
	}

	fmt.Printf("Image saved to %s\n", filePath)
	return nil
}
