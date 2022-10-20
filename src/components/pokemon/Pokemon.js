import axios from "axios";
import { motion } from "framer-motion";
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { bug, dark, dragon, electric, fairy, fighting, fire, flying, ghost, grass, ground, ice, normal, poison, psychic, rock, steel, water } from '../../Assets/types/typeIcons';
import './Pokemon.css'


const TYPE_COLORS = {
    bug: bug,
    dark: dark,
    dragon: dragon,
    electric: electric,
    fairy: fairy,
    fighting: fighting,
    fire: fire,
    flying: flying,
    ghost: ghost,
    grass: grass,
    ground: ground,
    ice: ice,
    normal: normal,
    poison: poison,
    psychic: psychic,
    rock: rock,
    steel: steel,
    water: water
};

export default class Pokemon extends Component {

    state = {
        name: '',
        index: '',
        imgPrev: '',
        imgNext: '',
        imageUrl: [],
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: ''
        },
        height: '',
        weight: '',
        eggGroups: '',
        catchRate: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: '',
        themeColor: '#EF5350',
        toggle: 1
    };


    handleClick() {
        this.setState(prevState => ({
            toggle: ((prevState.toggle + 1) % 2)
        }));
    }

    async componentDidMount() {
        const { index } = this.props.match.params;

        // Urls for pokemon information
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${index}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${index}/`;

        // Get Pokemon Information
        const pokemonRes = await axios.get(pokemonUrl);

        const name = pokemonRes.data.name;
        const imageUrl = [pokemonRes.data.sprites.front_default, `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`];
        const imgPrev = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index - 1}.png`;
        const imgNext = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${(parseInt(index) + 1)}.png`;
        let { hp, attack, defense, speed, specialAtk, specialDef } = ''

        pokemonRes.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAtk = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDef = stat['base_stat'];
                    break;
                default:
                    break;
            }
        });

        const height = pokemonRes.data.height / 10;
        const weight = pokemonRes.data.height / 10;
        const types = pokemonRes.data.types.map(type => type.type.name);


        const abilities = pokemonRes.data.abilities
            .map(ability => {
                return ability.ability.name
                    .toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
            })
            .join(', ');

        const evs = pokemonRes.data.stats
            .filter(stat => {
                if (stat.effort > 0) {
                    return true;
                }
                return false;
            })
            .map(stat => {
                return `${stat.effort} ${stat.stat.name
                    .toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}`;
            })
            .join(', ');
        await axios.get(pokemonSpeciesUrl).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                }
            });

            const femaleRate = res.data['gender_rate'];
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8 - femaleRate);

            const catchRate = Math.round((100 / 255) * res.data['capture_rate']);

            const eggGroups = res.data['egg_groups']
                .map(group => {
                    return group.name
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ');
                })
                .join(', ');

            const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

            this.setState({
                description,
                genderRatioFemale,
                genderRatioMale,
                catchRate,
                eggGroups,
                hatchSteps
            });
        });
        this.setState({
            imageUrl,
            imgNext,
            imgPrev,
            index,
            name,
            types,
            stats: {
                hp,
                attack,
                defense,
                speed,
                specialAtk,
                specialDef
            },
            height,
            weight,
            abilities,
            evs
        });
    };


    render() {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                <>
                    <div className="poke-page">
                        <div className="poke-card" >
                            <div className="name-type">
                                <h1>#{this.state.index.toString().padStart(3, "0")} {this.state.name}</h1>{this.state.types.map(type => (
                                    <img src={TYPE_COLORS[type]} alt="oui" />
                                ))}
                            </div>
                            <img className="poke-img" src={this.state.imageUrl[this.state.toggle]} alt={this.state.name} onClick={() => this.handleClick()} />
                            <div className="underline"></div>
                            <br />
                            <div className="metadata">
                                <p><strong>Height</strong></p>
                                <p>{this.state.height}m</p>
                            </div>
                            <div className="metadata">
                                <p><strong>Weight</strong></p>
                                <p>{this.state.weight}kg</p>
                            </div>
                            <br></br>
                            <div className="metadata">
                                <p><strong>Male</strong></p>
                                <p>{this.state.genderRatioMale}%</p>
                                <p><strong>Female</strong></p>
                                <p>{this.state.genderRatioFemale}%</p>
                            </div>
                            <br></br>
                            <div className="metadata">
                                <p><strong>Egg Group</strong></p>
                                <p>{this.state.eggGroups}</p>
                            </div>
                            <br></br>
                            <div className="metadata">
                                <p><strong>Catch Rate</strong></p>
                                <p>{this.state.catchRate}%</p>
                            </div>
                            <br />
                        </div>
                        <div className="poke-data">
                            <div className="description">
                                <h2>About</h2>
                                <p>{this.state.description}</p>
                            </div>
                            <div className="description">
                                <h2>Abilities</h2>
                                <p>{this.state.abilities}</p>
                            </div>
                            <h2>Base Stats</h2>
                            <div className="base-stats">
                                <div className="stats">
                                    <p>Hp</p>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: `${this.state.stats.hp}%` }}></div>
                                    </div>
                                </div>
                                <div className="stats">
                                    <p>Attack</p>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: `${this.state.stats.attack}%` }}></div>
                                    </div>
                                </div>
                                <div className="stats">
                                    <p>Defense</p>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: `${this.state.stats.defense}%` }}></div>
                                    </div>
                                </div>
                                <div className="stats">
                                    <p>Special-Attack</p>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: `${this.state.stats.specialAtk}%` }}></div>
                                    </div>
                                </div>
                                <div className="stats">
                                    <p>Special-Defense</p>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: `${this.state.stats.specialDef}%` }}></div>
                                    </div>
                                </div>
                                <div className="stats">
                                    <p>Speed</p>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: `${this.state.stats.speed}%` }}></div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <a className="back" href="https://adissuu.github.io/Pokedex-api/#/">
                                <p >
                                    Back
                                </p>
                            </a>
                        </div>
                    </div>
                </>
            </motion.div >
        )
    };
}

