import axios from "axios";
import React, { Component } from 'react'
import { bug, dark, dragon, electric, fairy, fighting, fire, flying, ghost, grass, ground, ice, normal, poison, psychic, rock, steel, water } from '../../Assets/types/typeIcons';

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
        imageUrl: [],
        types: [],
        description: '',
        statTitleWidth: 3,
        statBarWidth: 9,
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
        themeColor: '#EF5350'
    };

    async componentDidMount() {
        const { index } = this.props.match.params;

        // Urls for pokemon information
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${index}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${index}/`;

        // Get Pokemon Information
        const pokemonRes = await axios.get(pokemonUrl);

        const name = pokemonRes.data.name;
        const imageUrl = [pokemonRes.data.sprites.front_default, `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`];
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

        const height = pokemonRes.data.height * 10;
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
            <div>
                <h1>{this.state.name}</h1>
                <img src={this.state.imageUrl[1]} alt={this.state.name} />
                <p>{this.state.description}</p>
                {this.state.types.map(type => (
                    <img src={TYPE_COLORS[type]} alt="oui" />
                ))}
            </div >
        )
    };
}

