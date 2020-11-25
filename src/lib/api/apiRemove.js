import { api_remove } from "../apiConfig";

function apiRemove(music_id, list_id, callBack) {
  if (!music_id || !list_id) {
    callBack(null);
    return ;
  }
  fetch(api_remove, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      music_id: music_id,
      list_id: list_id,
    }),
  })
  .then(res => res.json())
  .then(res => {
    if (res.code === 100 && res.status === "success") {
      callBack(res.code);
    } else {
      console.error(res);
      callBack(null);
    }
  })
  .catch(err => {
    console.error(err);
    callBack(null);
  });
}

export default apiRemove;