import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
class About extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeduration = this.onChangeduration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username : '',
            description :'',
            duration : 0,
            date : new Date(),
            users : []
        }
    }

    componentDidMount(){
        
        const sentence = this.props.location.pathname;
        const answer_array = sentence.split('/');

        axios.get('http://localhost:5000/excerise/' + answer_array[2])
       .then(response => {
           this.setState({
               username : response.data.username,
               description : response.data.description,
               duration : response.data.duration,
               date : new Date(response.data.date),
           })
       })


       axios.get('http://localhost:5000/user/')
       .then(response => {
           if(response.data.length > 0){
            this.setState({
                users :response.data.map(user => user.username),
               
            })
           }
       }) 
    }


    onChangeUsername(e){
        this.setState({
            username : e.target.value
        });
    }
    onChangeDescription(e){
        this.setState({
            description : e.target.value
        });
    }
    onChangeduration(e){
        this.setState({
            duration : e.target.value
        });
    }
    onChangeDate(date){
        this.setState({
            date : date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const exercise = {
            username : this.state.username,
            description : this.state.description,
            duration : this.state.duration,
            date: this.state.date
        }

        console.log(exercise);
        const sentence = this.props.location.pathname;
        const answer_array = sentence.split('/');
        axios.post('http://localhost:5000/excerise/update/' +answer_array[2], exercise)
        .then(res => console.log(res.data));

    }

  render() {
    return (
        <div>
          <h3> Edit exercise Log</h3>
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                  <label> Username:</label>
                  <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                      {
                          this.state.users.map(function(user){
                          return <option key={user} value={user}>{user} 
                          </option>;
                          })
                      }
                  </select>
              </div>
              <div className="form-group">
                  <label>Description</label>
                  <input type="text" required className="form-control" value={this.state.description} onChange={this.onChangeDescription}>
                  </input>
              </div>
              <div className="form-group">
                  <label>Duration (in minutes)</label>
                  <input type="text" required className="form-control" value={this.state.duration} onChange={this.onChangeduration}>
                  </input>
              </div>
              <div className="form-group">
                  <label>Date</label>
                 <DatePicker
                 selected={this.state.date} onChange={this.onChangeDate}
                 ></DatePicker>
              </div>
            
                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-sm btn-primary"></input>
                </div>

          </form>
        </div>
    );
  }
}

export default About;