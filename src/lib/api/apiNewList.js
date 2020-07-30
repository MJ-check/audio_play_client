import { api_new_list } from "../apiConfig";

function apiNewList(list_name, list_msg, callBack) {
  fetch(api_new_list, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      list_name: list_name,
      list_msg: list_msg
    })
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
  })
}

export default apiNewList;