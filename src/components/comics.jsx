import "./comics.css";
import React from "react";

class Comics extends React.Component {
  render() {
    return (
      <div>{this.props.contents ? console.log(this.props.contents) : null}</div>
    );
  }
}

export default Comics;
