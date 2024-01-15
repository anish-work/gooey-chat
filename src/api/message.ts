import axios from "axios";

const BOT_URL = "https://api.gooey.ai/v2/video-bots/?example_id=ehsu8hb8";

const headers = {
  Authorization: "Bearer " + process.env["GOOEY_API_KEY"],
  "Content-Type": "application/json",
};

export const sendMessageApi = (body: any) => {
  return axios.post(BOT_URL, body, {
    headers,
  });
};
