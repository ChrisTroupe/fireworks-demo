import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Scroll from '../components/Scroll.js';
import ErrorBoundry from '../components/ErrorBoundry.js';


class MovieApp extends Component {
    constructor() {
        super();
        this.state = {
            StreamingDetails: [],
            searchfield: ''
        }
    }
    // Grab the data and fill the StreamingDetails from this json file
    componentDidMount() { 
    fetch('https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json') 
    .then(response => response.json()) 
    .then(video => this.setState({StreamingDetails: video.entries}));
    }

    onSearchChange = (event)  => {
    this.setState({searchfield: event.target.value});
    console.log(event.target.value);
    
}

    render() {
        
        let count = 0;
        // filter the videos based on a release year > 2010, the video being a movie, 
        // not listing more than 21 entries, and the search bar including the text
        const filteredResults = this.state.StreamingDetails.filter(video => {
            if(video.releaseYear > 2010 
                && video.programType === 'movie' 
                && count <= 21
                && video.title.toLowerCase().includes(this.state.searchfield.toLowerCase())
                ) {
                    count++;
            }
            return(
                video.releaseYear > 2010
                && video.programType === 'movie'
                && count <= 21
                && video.title.toLowerCase().includes(this.state.searchfield.toLowerCase())
            )   
        })
        
        // sort the list alphabetically 
        filteredResults.sort((a,b) => (a.title > b.title) ? 1: -1);

        // Loading Screen implementation
       if(this.state.StreamingDetails.length === 0){
           return (<h1> Loading </h1>) 
       } 

       // return if the screen loads
       else {
            return(
                <div>
                    <section> 
                        <Header/> 
                    </section>
                    <Scroll> 
                        <ErrorBoundry>
                            <div className = 'tc'>
                                <SearchBox searchChange = {this.onSearchChange}/> 
                                <CardList StreamingDetails = {filteredResults} /> 
                            </div> 
                        </ErrorBoundry>
                    </Scroll> 

                    <section>
                        <Footer/> 
                    </section> 

                </div> 
            );
       }
        
    }
}

export default MovieApp;