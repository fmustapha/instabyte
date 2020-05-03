import React, { Component } from "react";
import { getImages } from "../services/imageService";

class Home extends Component {
  state = {
    images: [],
  };

  async componentDidMount() {
    const { data:images } = await getImages();
    console.log("images", images);
    this.setState({ images });
  }

  render() {
    console.log("Test");
    return (
      <ul>
        {this.state.images.map((img) => (
          <li key={img._id}>{img.name}</li>
        ))}
      </ul>
    );
  }
}

export default Home;
