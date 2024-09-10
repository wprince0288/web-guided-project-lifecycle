import React from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';


const fetchDogs = (breed) => {
    return axios.get(`https://dog.ceo/api/breed/${breed}/images`).then(res => res).catch(err => console.error('noooooo'));
}

class App extends React.Component {
    constructor() {
        console.log('constructor ran');
        super();
        this.state = {
            doggos: [],
            breed: 'husky'
        }
    }

    componentDidMount() {
        console.log('component did mount');
        fetchDogs(this.state.breed).then(res => {
            this.setState({ doggos: res.data.message });
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('component did update')
        if (prevState.doggos !== this.state.doggos) {
            console.log('the dogs have changed');
            if (this.state.breed === 'chihuahua') {
                fetchDogs('husky').then(res => {
                    this.setState({ doggos: res.data.message, breed: 'husky' })
                })
            }
        }
    }

    searchDogs = dogName => {
        console.log('search dogs');
        fetchDogs(dogName).then(res => {
            this.setState({ doggos: res.data.message, breed: dogName });
        })
    }

    render() {
        console.log('render function ran');
        return (
            <>
                <h1>My App</h1>
                <SearchForm searchDogs={this.searchDogs} />
                {this.state.doggos.map((dog, index) => (
                    <img width="200" src={dog} key={index} alt={dog} />
                ))}
            </>
        )
    }
}

export default App;