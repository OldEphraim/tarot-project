import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const saveProfileChanges = async (user) => {
  try {
    const response = await api.put(`/users/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to save profile changes:", error);
    throw error;
  }
};

export const handleSaveImage = async (user, imageUrl, cardName, artStyle) => {
  try {
    const response = await api.post(
      "/favorites",
      {
        user_id: user.id,
        image_url: imageUrl,
        card_name: cardName,
        art_style: artStyle,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log("Image saved successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to save image:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSavedImage = async (user) => {
  try {
    const response = await api.get(`/favorites/${user.id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log("Images returned successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to save image:",
      error.response?.data || error.message
    );
    throw error;
  }
};
