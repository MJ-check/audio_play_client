import { api_list } from "../apiConfig";

function apiList(body, callBack) {
  fetch(api_list, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(res => {
    if (res.code === 100 && res.status === "success") {
      callBack(res.data);
    } else {
      console.error(res);
      callBack(null);
    }
  })
  .catch(err => console.error(err));
}

export default apiList;