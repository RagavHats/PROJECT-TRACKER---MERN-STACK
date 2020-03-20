import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to ={"/about/" + props.exercise._id}>Edit</Link> | <a href="#" onClick={() => {props.deleteExercice(props.exercise._id)}}>Delete</a>
        </td>
    </tr>
)


class Home extends Component {

constructor(props){
    super(props);

    this.deleteExercice = this.deleteExercice.bind(this);
    this.state = {exercises : []};
}

componentDidMount(){
    Axios.get('http://localhost:5000/excerise/')
    .then(response =>{
        this.setState({ exercises : response.data})
    })
    .catch((error) => {
        console.log(error);
    })
}


deleteExercice(id){
    Axios.delete('http://localhost:5000/excerise/' + id)
    .then(res => console.log(res.data));

    this.setState({
        exercises: this.state.exercises.filter(el=> el._id != id)
    })
    
}

exercisesList(){
    return this.state.exercises.map(currentexercise =>{
        return <Exercise exercise={currentexercise} deleteExercice={this.deleteExercice} key={currentexercise._id} />
    })
}

  render() {
    return (
        <div>
            <h2>Logged exercise</h2>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>User Name</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.exercisesList()}
                </tbody>
            </table>

        </div>
    );
  }
}

export default Home;