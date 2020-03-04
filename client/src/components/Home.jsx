import React, { Component } from "react";
import { getImages } from "../services/imageService";

class Home extends Component {
  state = {
    images: []
  };

  componentDidMount() {
    const images = getImages();
    this.setState({ images });
  }

  render() {
    return (
      <ul>
        {this.state.images.map(img => (
          <li key={img._id}>{img.name}</li>
        ))}
      </ul>
    );
  }
}

export default Home;
