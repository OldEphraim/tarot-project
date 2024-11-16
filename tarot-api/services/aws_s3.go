package services

import (
	"bytes"
	"context"
	"log"
	"net/http"
	"path/filepath"

	"tarot-api/config"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/google/uuid"
)

func UploadImageToS3(imageURL string, bucketName string) (string, error) {
    log.Println("Fetching image from URL:", imageURL)
    // Fetch image data
    resp, err := http.Get(imageURL)
    if err != nil {
        log.Println("Error fetching image:", err)
        return "", err
    }
    defer resp.Body.Close()

    buf := new(bytes.Buffer)
    _, err = buf.ReadFrom(resp.Body)
    if err != nil {
        log.Println("Error reading image response body:", err)
        return "", err
    }

    key := "images/" + uuid.New().String() + filepath.Ext(imageURL)
    log.Println("Uploading image to S3 with key:", key)

    // Upload to S3
    _, err = config.S3Client.PutObject(context.TODO(), &s3.PutObjectInput{
        Bucket:      aws.String(bucketName),
        Key:         aws.String(key),
        Body:        bytes.NewReader(buf.Bytes()),
        ContentType: aws.String("image/webp"),
    })
    if err != nil {
        log.Println("Error uploading to S3:", err)
        return "", err
    }

    s3URL := "https://" + bucketName + ".s3.amazonaws.com/" + key
    log.Println("Successfully uploaded image to S3:", s3URL)

    return s3URL, nil
}