import { saveProfileChanges } from "../services/profileService";

export const setAsProfilePicture = async (user, setUser, url) => {
  try {
    const updatedUser = {
      ...user,
      profile_picture: url,
    };
    await saveProfileChanges(updatedUser);
    setUser(updatedUser);
  } catch (error) {
    console.error("Error saving profile picture:", error);
  }
};
