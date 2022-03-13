import { Component } from "react";
// import animeList from "./dummy-data";
import MovieCard from "./MovieCard";

class App extends Component {

  constructor (props){
    super(props)
    this.state = {
      movieList: [],
      isLoading: true
    }
  }

  fetchMovieList (){
    fetch("https://api.jikan.moe/v3/top/anime")
    // .then(response => response.json()) atau
    .then(response  => {
      return response.json()
    })
    // then(data => console.log(data)) atau
    .then(data => {
      // console.log(data)
      setTimeout(()=>{
        const dataTop = data?.top
        if (dataTop) {
          this.setState( { movieList : dataTop })
        }
              }, 3000)

      // const dataTop = data?.top
      // if (dataTop) {
      //   this.setState( { movieList : dataTop })
      // }
    })
    // catch(error => console.log(error)) atau
    .catch(error => {
      console.log(error)
    })

    // supaya tidak memakai componentDidUpdate
    .finally(()=>{
      setTimeout(()=>{
        this.setState({isLoading: false})
              }, 3000)
      // this.setState({isLoading: false})
    })
  }

  componentDidMount (){
    // setTimeout(()=>{
    // this.fetchMovieList()
    // }, 3000)
    this.fetchMovieList()
  }


  // jika tidak menggunakan componentdidupdate dan menggunakan .finally di atas
  
  // componentDidUpdate (prevProps, prevState){
  //   if (prevState.movieList.length !== this.state.movieList.length){
  //     this.setState ({isLoading: false})
  //   }
  // }


  // constructor (props) {
  //   super(props)
  // }
  render() {
    return (
      <div className="container my-5">
        <h1 className="text-center">Anime List</h1>
        <div className="container my-5">
          {

            this.state.isLoading === true
            ? <h2>Loading . . .</h2>
            : <div id="daftar-anime" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {
                  this.state.movieList?.map ((anime, index) => (
                  <MovieCard movie = {anime} key= {anime?.mal_id}/>
                  ))
                }
              </div>   
          }
          {/* <div id="daftar-anime" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {
              animeList?.map ((anime, index) => (
                <MovieCard movie = {anime} key= {anime?.mal_id}/>
              ))
            }
          </div> */}
        </div>
      </div>
    );
  }
}

export default App;