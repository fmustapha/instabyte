const images = [
  {
    _id: "5e55de1752c9715c73b75c18",
    name: "abs-bag.jpg",
    type: "image/jpeg",
    fileSize: "29 KB",
    dimension: "600 by 395 pixels",
    uploadDate: "2020-01-18T16:00:00Z",
    modifiedDate: "2020-01-18T16:00:00Z",
    likes: 2
  },
  {
    _id: "5e55e0fd52c9715c73b75c19",
    name: "chart.jpg",
    type: "image/jpeg",
    fileSize: "164 KB",
    dimension: "2000 by 1200 pixels",
    uploadDate: "2020-01-18T16:00:00Z",
    modifiedDate: "2020-01-18T16:00:00Z",
    likes: 4
  }
];

export function getImages() {
  return images;
}

export function getImage(id) {
  return images.find(img => img._id === id);
}

export function updateImages(image) {
  let instaImage = images.find(img => img._id === image._id) || {};
  instaImage["name"] = image.name;
  instaImage["type"] = image.type;
  instaImage["fileSize"] = image.fileSize;
  instaImage["dimension"] = image.dimension;
  instaImage["likes"] = image.likes;
  instaImage["modifiedDate"] = new Date();

  if (!instaImage._id) {
    instaImage._id = Date.now().toString();
    instaImage.uploadDate = new Date();
    instaImage.likes = 0;
    images.push(instaImage);
  }
  return images;
}

export function deleteImage(id) {
  const deleted = images.find(img => img._id === id);
  return images.splice(images.indexOf(deleted), 1);
}
