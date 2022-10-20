import React, { Component } from 'react'
import Pokedex from '../pokemon/Pokedex'
import { motion } from 'framer-motion'


export default class Dashboard extends Component {
    render() {
        return (
            <motion.div initial="pageInitial" animate="pageAnimate" variants={{
                pageInitial: {
                    opacity: 0,
                    transition: { duration: .6 },
                },
                pageAnimate: {
                    opacity: [0, 1],
                    transition: { duration: .6 },
                }
            }}>
                < div >
                    <Pokedex />
                </ div>
            </motion.div>
        )
    }
}
