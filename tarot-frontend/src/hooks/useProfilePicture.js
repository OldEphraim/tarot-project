import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  saveProfileChanges,
  handleSaveImage,
} from "../services/profileService";

export const useProfilePicture = (setGeneratedPicture) => {
  const [isSaved, setIsSaved] = useState([]);
  const { user, setUser } = useAuth();

  const handleSaveProfilePicture = async (generatedPicture) => {
    try {
      const updatedUser = {
        ...user,
        profile_picture: generatedPicture[0],
      };
      await saveProfileChanges(updatedUser);
      setUser(updatedUser);
      setIsSaved(["Profile picture saved successfully!", "green"]);
      setGeneratedPicture([]);
      try {
        await handleSaveImage(
          user,
          generatedPicture[0],
          generatedPicture[1],
          generatedPicture[2]
        );
      } catch (error) {
        console.error("Error saving profile picture to saved images", error);
      }
    } catch (error) {
      console.error("Error saving profile picture:", error);
      setIsSaved(["Failed to save profile picture. Please try again.", "red"]);
    }
  };

  return { isSaved, handleSaveProfilePicture };
};
