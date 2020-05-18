import React, { Component } from "react";
import { getImages, saveImage } from "../services/imageService";

class Home extends Component {
  state = {
    images: [],
  };

  async componentDidMount() {
    const { data: images } = await getImages();
    console.log("images", images);
    this.setState({ images });
  }

  handleChange = ({ target }) => {
    console.log(target.value, "details");
    this.setState({ [target.name]: target.files[0] });
    console.log(target.files[0], "file");
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { image } = this.state;
    //prepare image into desired format
    const newImage = {
      name: image.name,
      extention: image.type
    }
    //call another function saveFile() with the file
    this.saveFile(newImage);
  };

  saveFile = async (image) => {
    try {
      const result = await saveImage(image);
      if (result) {
        console.log("Successful!");
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  render() {
    console.log("Test");
    const { images } = this.state;
    return (
      <React.Fragment>
        <section className="file-upload">
          <form
            onSubmit={this.handleSubmit}
            method="post"
            encType="multipart/form-data"
            className="file-upload-form"
          >
            <div className="file-upload-div">
              <label className="file-upload-label" htmlFor="image">
                Choose a picture to upload...
              </label>
              <input
                className="image-input"
                type="file"
                id="image"
                name="image"
                accept="image.png, image/jpg"
                onChange={this.handleChange}
              />
            </div>
            <div className="btn btn-upload">
              <input id="upload" name="upload" type="submit" value="Upload" />
            </div>
          </form>
        </section>
        <section className="display">
          {images.map((img) => (
            <div key={img._id}>
              {Object.keys(img).map((key) => (
                <span key={key}>{`${key}: ${img[key]} `}</span>
              ))}
            </div>
          ))}
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
