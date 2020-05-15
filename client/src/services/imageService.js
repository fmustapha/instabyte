import http from "./httpService";
import { apiUrl } from "../config.json";

function getImages() {
  return http.get(apiUrl + "/api/images");
}

export function saveImage(image) {
  return http.post(apiUrl + "/" + image)
}

export { getImages };
