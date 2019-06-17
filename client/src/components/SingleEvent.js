import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";

class SingleEvent extends Component {
    state = {
        singleEvent: {
            name: '',
            description: '',
            time: '',
            location: ''
        },
        redirectToHome: false,
        isEditFormDisplayed: false
    }
getSingleEvent=()=>{
    axios.get(`/API/events/${this.props.match.params.id}`).then(res => {
        console.log(res.data)
        this.setState({ singleEvent: res.data  })
    })
}

    componentDidMount = () => {
        console.log("sup");
        this.getSingleEvent()
       
    }

    deleteSingleEvent = () => {
        axios.delete(`/API/events/${this.props.match.params.id}`).then(res => {
            this.setState({ redirectToHome: true })
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = (e) => {
        const cloneSingleEvent = { ...this.state.singleEvent }
        cloneSingleEvent[e.target.name] = e.target.value
        this.setState({ singleEvent: cloneSingleEvent })
    }

    updateSingleEvent = (e) => {
        e.preventDefault()
        axios
            .put(`/API/events/${this.props.match.params.id}`, {
                name: this.state.singleEvent.name
                // description: this.state.singleEvent.description,
                // time: this.state.singleEvent.time,
                // location: this.state.singleEvent.location
            })
            .then(res => {
                this.setState({ city: res.data, isEditFormDisplayed: false, redirectToHome: true })
            })
            this.getSingleEvent()
    }

    render() {
        if (this.state.redirectToHome) {
            return (<Redirect to="/events" />)
        }

        return (
            <div className="singleEvent">
                <Link to="/events">Back to Events</Link>

                <button onClick={this.toggleEditForm}>Edit</button>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateSingleEvent}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.singleEvent.name}
                                />
                            </div>

                            <button>Update</button>
                        </form>
                        : <div>
                            <div>
                                Name: {this.state.singleEvent.name}
                                Time: {this.state.singleEvent.time}
                                Description: {this.state.singleEvent.description}
                                Location: {this.state.singleEvent.location}
                            </div>
                            <button onClick={this.deleteSingleEvent}>Delete</button>
                        </div>
                }
            </div>
        );
    }
}

export default SingleEvent;