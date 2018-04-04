import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor
};
let fakeServerData = {
  user: {
    name: 'Jason',
    playlists: [
      {
        name: 'My Favorites',
        songs: [
             {name: 'Beat It', duration: 1246},
             {name: 'Everlong', duration: 2311},
             {name: 'My Hero', duration: 2344}
           ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'Beat It', duration: 1246},
          {name: 'Everlong', duration: 2311},
          {name: 'My Hero', duration: 2344}
           ]
      },
      {
        name: 'Weeding Hits',
        songs: [
          {name: 'Beat It', duration: 1246},
          {name: 'Everlong', duration: 2311},
          {name: 'My Hero', duration: 2344}
           ]
      },
      {
        name: 'Car Drives',
        songs: [
          {name: 'Beat It', duration: 1246},
          {name: 'Everlong', duration: 2311},
          {name: 'My Hero', duration: 2344}
           ]
      }
    ]
  }
}

class PlaylistCounter extends Component {
  render() {
    return(
      <div style={{width: '40%', display: 'inline-block'}}>
      <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}
class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return(
      <div style={{width: '40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {

    return(
      <div style={{...defaultStyle}}>
        <img/>
        <input type="text" onKeyUp={event =>
          this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}
class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return(
      <div style={{...defaultStyle, width: '25%', display:'inline-block'}}>
        <img/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {serverData: {},
    filterString: ''
  }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    let playlistToRender = this.state.serverData.user ? this.state.serverData.user.playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(this.state.filterString)
    ) : []
    return (
      <div className="App" style={defaultStyle}>
        {this.state.serverData.user ?
          <div>
            <h1>{this.state.serverData.user.name}'s Playlist</h1>
              <PlaylistCounter playlists={playlistToRender}/>
              <HoursCounter playlists={playlistToRender}/>
            <Filter onTextChange={text => this.setState({filterString: text})}/>
            {playlistToRender.map(playlist =>
              <Playlist playlist={playlist} />
            )}
          </div> : <h1 style={defaultStyle}>Loading....</h1>
      }
      </div>
    );
  }
}

export default App;
