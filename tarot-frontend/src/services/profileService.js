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
    console.log("Reading saved successfully:", response.data);
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
    console.log("Readings returned successfully:", response.data);
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
    console.log("Reading fetched successfully:", response.data);
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
    console.log("Journal entry fetched successfully:", response.data);
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
  console.log(journalText);
  const response = await api.put(
    `/favorites/journal/${id}`,
    { journal_entry: journalText }, // Pass the string directly
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to update journal entry");
  }

  return response.json();
};
