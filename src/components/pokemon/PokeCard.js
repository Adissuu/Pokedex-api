import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './PokeCard.css'



export default class PokeCard extends Component {
    state = {
        name: '',
        imageUrl: '',
        index: '',
        types: [],
        clicked: false
    };

    componentDidMount() {
        const { name, url } = this.props;
        const index = url.split("/")[url.split('/').length - 2];
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`;


        this.setState({
            name: name,
            imageUrl: imageUrl,
            index: index,
        });
    }


    render() {
        return (
            <Link to={`pokemon/${this.state.index}`}>
                <div className={`Card ${this.state.clicked ? "clicked" : ""}`} onClick={() => this.setState({ clicked: !this.state.clicked })}>
                    <div className="card-img">
                        <img src={this.state.imageUrl} className='image-pkm'></img>
                    </div>
                    <div className="card-info">
                        <h3>{this.state.index.toString().padStart(3, "0")}</h3>
                        <h3>{this.state.name}</h3>
                    </div>
                </div>
            </Link>
        )
    }
}
