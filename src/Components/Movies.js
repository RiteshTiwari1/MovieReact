import React, {Component} from 'react';
// import { get } from 'request';
import {getMovies} from "./MovieService";

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            movies:getMovies(),
            currSearchText:'',
            filterMovies:getMovies()
        }
    }

    HandleDelete = (id)=>{
        let filterArr=this.state.movies.filter((movieObj)=>{
            return movieObj._id!=id;
        });

        this.setState({filterMovies:filterArr, movies:filterArr});
    }

    HandleChange=(e)=>{
        let val=e.target.value;
        let filteredMovies=[];
        if(val==''){
            this.setState({filterMovies:this.state.movies,currSearchText:val});
            // return;
        }
        else{
            filteredMovies=this.state.movies.filter((movieObj)=>{
                let movieName=movieObj.title.trim().toLowerCase();
                return movieName.includes(val.toLowerCase());
            })

            this.setState({filterMovies:filteredMovies,currSearchText:val});
        }
        // let filterArr=this.state.
    }

    render() { 
        return (  
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h1>Hello</h1>
                    </div>
                    <div className="col-9">
                        <input type="text" value={this.state.currSearchText} onChange={this.HandleChange} ></input>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Title</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.filterMovies.map( (movieObj)=>(
                                        <tr scope="row" key={movieObj._id}>
                                            <td>{movieObj.title}</td>
                                            <td>{movieObj.genre.name}</td>
                                            <td>{movieObj.numberInStock}</td>
                                            <td>{movieObj.dailyRentalRate}</td>
                                            <td><button onClick={()=>{this.HandleDelete(movieObj._id)}} type="button" className="btn btn-danger">Delete</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Movies;