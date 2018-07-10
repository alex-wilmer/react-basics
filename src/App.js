import React, {Component} from "react"
import logo from "./logo.svg"
import "./App.css"

import {Pulse} from "better-react-spinkit"

class ImageList extends React.Component {
  id = null

  componentDidMount() {
    console.log('mounted!')
    this.id = setInterval(() => {
      console.log('tick tock')
    }, 1000)
  }
  componentWillUnmount() {
    console.log('unmounted! :( 😇😇')
    clearInterval(this.id)
  }
  render() {
    return this.props.images.map(url => <img key={url} src={url} />)
  }
}

class App extends Component {
  state = {
    query: "cats",
    images: [],
    loading: false
  }

  componentDidMount() {
    this.fetchImages()
  }

  setQuery = event => {
    this.setState({query: event.target.value}, this.fetchImages)
  }

  fetchImages = () => {
    this.setState({loading: true})

    fetch(`https://old.reddit.com/r/aww/search.json?q=${this.state.query}`)
      .then(response => response.json())
      .then(json => {
        let images = json.data.children
          .map(child => child.data.thumbnail)
          .filter(Boolean)
          .filter(url => url !== "self")
          .filter(url => url !== "default")

        this.setState({images, loading: false})
      })
  }

  render() {
    return (
      <div className="App">
        <h1>images!</h1>

        <div>
          <input onChange={this.setQuery} />
        </div>
        {this.state.loading ? (
          <Pulse size={100} />
        ) : (
          <ImageList images={this.state.images} />
        )}
      </div>
    )
  }
}

export default App
