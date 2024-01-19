import React from "react";
import "./characters.css";
import {
  IconButton,
  ThemeProvider,
  createTheme,
  TextField,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

class Characters extends React.Component {
  constructor(props) {
    super(props);
    this.hash = "dfec379d9e4550cf1efd321631f640ec";

    this.state = {
      name: "",
      url:
        "http://gateway.marvel.com/v1/public/characters?nameStartsWith=&ts=1&apikey=2371195801294f4b2de4bbac5318c0d8&hash=" +
        this.hash,
      content: "",
      data: "",
    };
  }

  updateUrl = (name) => {
    this.setState({ name });
    const url =
      "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +
      name +
      "&apikey=2371195801294f4b2de4bbac5318c0d8&hash=" +
      this.hash;
    this.setState({ url });
  };

  updateContent = (e) => {
    const content = e.target.value;
    this.setState({ content });
    this.updateUrl(content);
  };

  loadResults = () => {
    const fetch = async () => {
      const results = await axios(this.state.url);
      this.setState({ data: results.data });
    };

    fetch();
  };

  handleContentsChange = (contents) => {
    this.props.changeContents(contents);
  };

  createCards = () => {
    var cards = [];
    if (this.state.data.data) {
      const results = this.state.data.data.results;
      for (let x = 0; x < this.state.data.data.count; x++) {
        cards.push(
          <div className="card">
            <img
              src={
                results[x].thumbnail.path +
                "/portrait_xlarge." +
                results[x].thumbnail.extension
              }
              alt="character"
              className="character-img"
            />
            <div className="character-img-cover">
              <p className="character-name">{results[x].name}</p>
              {/* CHANGE THIS TO A BUTTON */}
              <Link
                to="/comics"
                className="comics-link"
                //FIX THISSSSSS
                onClick={() => this.handleContentsChange(results[x])}
              >
                Comics
              </Link>
              <p className="copyright">{this.state.data.copyright}</p>
            </div>
          </div>
        );
      }
      return cards;
    }
  };

  render() {
    return (
      <div className="page-container">
        <ThemeProvider theme={theme}>
          <div className="input-wrapper">
            <div className="title-div">
              <h1 className="title white">
                Search for all types of a Marvel Character
              </h1>
            </div>
            <div className="input-container">
              <TextField
                onChange={this.updateContent}
                className="text-box"
                InputProps={{ style: { color: "white" } }}
                id="outlined"
                variant="outlined"
                focused
                placeholder="Search a Marvel Character"
              />
              <IconButton onClick={this.loadResults} arial-label="Search">
                <Search className="white" />
              </IconButton>
            </div>
          </div>
          <div className="cards-container">
            <div className="cards-wrapper">
              {this.createCards()
                ? this.createCards().map(function (card, index) {
                    return <div key={index}>{card}</div>;
                  })
                : null}
            </div>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default Characters;
