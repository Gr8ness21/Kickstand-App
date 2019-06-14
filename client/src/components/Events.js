import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Events extends Component {
    state = {
        events: [],
        newEvent: {
            name: '',
            description: '',
            time: '',
            location: ''
        },
        isCityFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('API/events').then(res => {
            this.setState({ events: res.data })
        })
    }

    toggleEventsForm = () => {
        this.setState((state, props) => {
            return ({ isEventsFormDisplayed: !state.isEventsFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewEvent = { ...this.state.newEvent }
        cloneNewEvent[e.target.name] = e.target.value
        this.setState({ newEvent: cloneNewEvent })
    }

    createEvent = (e) => {
        e.preventDefault()
        axios
            .post('API/events', this.state.newEvent)
            .then(res => {
                const eventsList = [...this.state.events]
                eventsList.unshift(res.data)
                this.setState({
                    newEvent: {
                        name: '',
                        description: '',
                        time: '',
                        location: ''
                    },
                    isEventFormDisplayed: false,
                    events: eventsList
                })
            })

    }

    render() {
        return (


            <div className="eventsPage">
                <h3>Events</h3>
                <div className="eventsImg"></div>

                <div className="eventsList">

                    {this.state.events.map(event => {
                        return (
                            <div key={event._id}>
                                <Link
                                    to={`/events/${event._id}`}
                                >
                                    {event.name}
                                </Link>
                            </div>
                        )
                    })
                    }
                    <button onClick={this.toggleEventsForm}>+ New Event</button>
                    {
                        this.state.isEventsFormDisplayed
                            ? <form onSubmit={this.createEvent}>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        onChange={this.handleChange}
                                    // value={this.state.newEvent.name}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        type="text"
                                        name="description"
                                        onChange={this.handleChange}
                                    // value={this.state.newEvent.description}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="time">Time</label>
                                    <textarea
                                        id="time"
                                        type="text"
                                        name="time"
                                        onChange={this.handleChange}
                                    // value={this.state.newEvent.time}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="location">Location</label>
                                    <textarea
                                        id="location"
                                        type="text"
                                        name="location"
                                        onChange={this.handleChange}
                                    // value={this.state.newEvent.location}
                                    />
                                </div>
                                <button>Create</button>
                            </form>
                            : null
                    }
                </div>

            </div>

        )
    }
}

export default Events