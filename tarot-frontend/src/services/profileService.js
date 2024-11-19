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
    return response.data;
  } catch (error) {
    console.error(
      "Failed to save image:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const handleSaveReading = async (user, workflowData) => {
  try {
    const response = await api.post(
      "/readings",
      {
        user_id: user.id,
        workflow_data: workflowData,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(
      "Failed to save image:",
      error.response?.data || error.message
    );
  }
};

export const getSavedReading = async (user) => {
  try {
    const response = await api.get(`/readings/${user.id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to save reading:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getReadingBySlug = async (user, slug) => {
  try {
    const response = await api.get(
      `/readings/user/${user.id}/reading/${slug}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch reading:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFavoriteById = async (user, id) => {
  try {
    const response = await api.get(`/favorites/entry/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch journal entry:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateJournalEntry = async (user, id, journalText) => {
  try {
    const response = await api.put(
      `/favorites/journal/${id}`,
      { journal_entry: journalText },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Failed to save journal entry", err);
  }
};

export const deleteFavoriteById = async (user, id) => {
  try {
    const response = await api.delete(`/favorites/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(
      "Failed to delete image:",
      error.response?.data || error.message
    );
  }
};

export const updatePassword = async (
  user,
  currentPassword,
  newPassword,
  confirmPassword
) => {
  try {
    const response = await api.put(
      `/users/password/${user.id}`,
      {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to update password:",
      error.response?.data || error.message
    );
    throw error;
  }
};
