import os

# Path to your images directory
image_dir = '/home/oldephraim/tarot-project/tarot-frontend/public/tarot-images'

# Loop through all files in the directory
for filename in os.listdir(image_dir):
    if filename.startswith('0603150955329_') and filename.endswith('.jpg'):
        # Split the filename by underscores and get the second part (the number)
        number = filename.split('_')[1]
        
        # Construct the new filename
        new_filename = f"card_{number}.jpg"
        
        # Rename the file
        os.rename(os.path.join(image_dir, filename), os.path.join(image_dir, new_filename))

print("Renaming completed!")