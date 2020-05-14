import React, { Component } from "react";
import { getImages } from "../services/imageService";

class Home extends Component {
  state = {
    images: [],
  };

  async componentDidMount() {
    const { data: images } = await getImages();
    console.log("images", images);
    this.setState({ images });
  }

  handleChange = (e) => {
    console.log(e.target.value, "details");
  };

  render() {
    console.log("Test");
    const { images } = this.state;
    return (
      <React.Fragment>
        <div className="file-upload">
          <label className="file-label" htmlFor="image">Choose a picture to upload...</label>
          <input
            className="image-input"
            type="file"
            id="image"
            name="image"
            accept="image.png, image/jpg"
            onChange={this.handleChange}
          />
        </div>

        {images.map((img) => (
          <div key={img._id}>
            {Object.keys(img).map((key) => (
              <span key={key}>{`${key}: ${img[key]} `}</span>
            ))}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Home;
