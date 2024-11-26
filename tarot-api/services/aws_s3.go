package services

import (
	"bytes"
	"context"
	"log"
	"net/http"
	"sort"

	"tarot-api/config"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func UploadImageToS3(imageURL string, bucketName string, objectKey string) (string, error) {
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

	log.Println("Uploading image to S3 with key:", objectKey)

	// Upload to S3
	_, err = config.S3Client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket:      aws.String(bucketName),
		Key:         aws.String(objectKey),
		Body:        bytes.NewReader(buf.Bytes()),
		ContentType: aws.String("image/webp"),
	})
	if err != nil {
		log.Println("Error uploading to S3:", err)
		return "", err
	}

	s3URL := "https://" + bucketName + ".s3.amazonaws.com/" + objectKey
	log.Println("Successfully uploaded image to S3:", s3URL)

	return s3URL, nil
}

func GetRecentImagesFromS3(bucketName string, prefix string, maxResults int) ([]string, error) {
	log.Println("Listing objects in S3 bucket:", bucketName, "with prefix:", prefix)

	// List objects in the bucket with the specified prefix
	output, err := config.S3Client.ListObjectsV2(context.TODO(), &s3.ListObjectsV2Input{
		Bucket: aws.String(bucketName),
		Prefix: aws.String(prefix),
	})
	if err != nil {
		log.Println("Error listing objects in S3:", err)
		return nil, err
	}

	if len(output.Contents) == 0 {
		log.Println("No objects found in S3 with the specified prefix")
		return []string{}, nil
	}

	// Sort objects by LastModified timestamp in descending order
	sort.Slice(output.Contents, func(i, j int) bool {
		return output.Contents[i].LastModified.After(*output.Contents[j].LastModified)
	})

	// Get the most recent `maxResults` objects
	var recentImages []string
	for i, obj := range output.Contents {
		if i >= maxResults {
			break
		}
		recentImages = append(recentImages, "https://"+bucketName+".s3.amazonaws.com/"+*obj.Key)
	}

	log.Println("Recent images retrieved from S3:", recentImages)
	return recentImages, nil
}
