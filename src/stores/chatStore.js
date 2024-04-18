import axios from "axios";
import { create } from "zustand";

const useChatStore = create((set, get) => ({
  messages: [],
  conversations: [],
  selectedCons: null,

  // Set selected conversation
  setSelectedCons: (conversation) => set({ selectedCons: conversation }),

  // Fetch messages for the selected conversation
  fetchMessages: () => {
    const selectedCons = get().selectedCons;
    if (selectedCons !== null) {
      axios
        .get(
          `https://localhost:7170/api/conversations/get-messages-for-conversation/${selectedCons.id}`
        )
        .then((res) => set({ messages: res.data }))
        .catch((err) => console.error("Failed to fetch messages:", err));
    }
  },

  fetchMessageThumbnail: (user) => {
    if (user) {
      axios
        .get(
          `https://localhost:7170/api/conversations/get-all-conversation/${user.userId}`
        )
        .then((res) => {
          console.log(res.data);
          set({ conversations: res.data });
        })
        .catch((err) => console.error("Failed to fetch conversations:", err));
    } else {
      console.log("user not logged in, please fix this later");
    }
  },

  // Reset messages (optional, but can be useful)
  clearMessages: () => set({ messages: [] }),
}));

export default useChatStore;
