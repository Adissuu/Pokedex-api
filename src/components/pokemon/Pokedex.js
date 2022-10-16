import React, { Component } from 'react';
import axios from 'axios';
import './Pokedex.css'
import PokeCard from './PokeCard';
import Navbar from '../layout/Navbar';


export default class Pokedex extends Component {
    state = {
        url: 'https://pokeapi.co/api/v2/pokemon/?limit=905',
        pokemon: null
    };

    async componentDidMount() {
        const res = await axios.get(this.state.url);
        this.setState({ pokemon: res.data['results'] })
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.pokemon ? (
                        <div className='pokedex-container'><Navbar /><div className='grid'>
                            {this.state.pokemon.map(pokemon => (
                                <PokeCard
                                    key={pokemon.name}
                                    name={pokemon.name}
                                    url={pokemon.url} />
                            ))}
                        </div></div>) : (<h1>Loading</h1>)
                }
            </React.Fragment >
        )
    }
}
