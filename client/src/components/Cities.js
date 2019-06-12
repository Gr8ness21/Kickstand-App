import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Cities extends Component {
    state = {
        cities: [],
        newCity: {
            name: ''
        },
        isCityFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('API/city').then(res => {
            this.setState({ cities: res.data })
        })
    }

    toggleCityForm = () => {
        this.setState((state, props) => {
            return ({ isCityFormDisplayed: !state.isCityFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewCity = { ...this.state.newCity }
        cloneNewCity[e.target.name] = e.target.value
        this.setState({ newCity: cloneNewCity })
    }

    createCity = (e) => {
        e.preventDefault()
        axios
            .post('API/city', {
                name: this.state.newCity.name,
                description: this.state.newCity.description
            })
            .then(res => {
                const citiesList = [...this.state.cities]
                citiesList.unshift(res.data)
                this.setState({
                    newCity: {
                        name: ''
                    },
                    isCityFormDisplayed: false,
                    cities: citiesList
                })
            })

    }

    render() {
        return (


            <div className="cityPage">
                <h3>Cities</h3>
                <div className="cityImg"></div>

                <div className="cityList">

                    {this.state.cities.map(city => {
                        return (
                            <div key={city._id}>
                                <Link
                                    to={`/cities/${city._id}`}
                                >
                                    {city.name}
                                </Link>
                            </div>
                        )
                    })
                    }
                    <button onClick={this.toggleCityForm}>+ New City</button>
                    {
                        this.state.isCityFormDisplayed
                            ? <form onSubmit={this.createCity}>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        onChange={this.handleChange}
                                        value={this.state.newCity.name}
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

export default Cities