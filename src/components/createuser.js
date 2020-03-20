import React, { Component } from 'react';
import axios from 'axios';
class createuser extends Component {

    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username : ''
        }
    }
   
    onChangeUsername(e){
        this.setState({
            username : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            username : this.state.username,
          
        }

        console.log(user);

        axios.post('http://localhost:5000/user/add',user)
        .then(res => console.log("inserted into user table"));

        this.setState({
            username : '',
        })
         
        
    }

  render() {
    return (
        <div>
          <h3> Create new User</h3>
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                  <label> Username:</label>
                  <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                  </input>
              </div>
              <div className="form-group">
                    <input type="submit" value="Create user" className="btn btn-sm btn-primary"></input>
                </div>
            </form>
        </div>
    );
  }
}

export default createuser;