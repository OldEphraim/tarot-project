import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const saveProfileChanges = async (user) => {
  console.log("user:", user);

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
