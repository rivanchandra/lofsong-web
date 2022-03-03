import React from 'react'
import { motion } from "framer-motion"
import triangle from '../images/playBtn.png'

const RadioStations = ({ Ambient, Anime, Astral, ChillHop, Cow, Cloud, Ivy, High, Lofi, Study, Jazz }) => {
    return (
        <div className='radioList'>

            <motion.div
             animate={{ opacity: [0, 1] }}
             transition={{ delay: 1.05 }}
            >
            <motion.div
                whileHover={{ scale: 1.09 }}
                whileTap={{ scale: 0.9 }}
                onClick={Jazz}
                className="station">
                <img className="triangle" src={triangle} alt="" />
                And so it begins
            </motion.div>
            </motion.div>



        </div>
    )
}

export default RadioStations