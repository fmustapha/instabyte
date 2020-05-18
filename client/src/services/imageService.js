import http from "./httpService";
import { apiUrl } from "../config.json";

const apiPath = apiUrl + "/images"

function getImages() {
  return http.get(apiPath);
}

export function saveImage(image) {
  return http.post(apiPath + "/",image)
}

export { getImages };
