import React from "react";
import rain from '../images/rain.png';
import { useEffect, useState } from 'react';
import RainASMR from '../sounds/rain.mp3';
import OceanASMR from '../sounds/Ocean.mp3';
import whiteNoiseASMR from '../sounds/whiteNoise.mp3';
import waves from '../images/waves.png';
import youtube from '../images/youtube.png';
import WhiteNoise from '../images/whiteNoise.png';
import { motion } from "framer-motion";
import ReactPlayer from 'react-player';
import Tooltip from '@mui/material/Tooltip';
import { BrowserView, MobileView } from 'react-device-detect';

const Rain = new Audio(RainASMR)
const Ocean = new Audio(OceanASMR)
const whiteNoise = new Audio(whiteNoiseASMR)

// const Rain = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-light-rain-atmosphere-2474.mp3")
// const Ocean = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-chirp-ambiance-69.mp3")
// const whiteNoise = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-road-traffic-sound-2463.mp3")

const AdditionSettings = (props) => {

	const [rainVolume, setRainVolume] = useState(0)
	const [oceanVolume, setOceanVolume] = useState(0)
	const [whiteNoiseVolume, setWhiteNoiseVolume] = useState(0)

	const [transitionValue, setTransitionValue] = useState(0)
	const [TitleLocation, setTitleLocation] = useState(350)

	Ocean.volume = oceanVolume
	Rain.volume = rainVolume
	whiteNoise.volume = whiteNoiseVolume

	Rain.play();
	Ocean.play()
	whiteNoise.play()


	const setTransition = () => {
		setTransitionValue(0)
	}

	setTimeout(function () {
		setTransitionValue(-450)     //Title Pop in and out
		setTitleLocation(420)
	}, 2000);

	useEffect(() => {
		setTransition()
		setTitleLocation(1000)
	}, [props.radio])

	const rainChange = (event) => {
		setRainVolume(event);
		event === 0 ? props.changeRain(false) : props.changeRain(true);
	}

	return (
		<>
			<div className="infoContainer">
				<BrowserView className="songName">
					<motion.div
						animate={{ x: transitionValue }}
						transition={{ delay: 1 }}
						className="radioStationTitle"
						style={{ left: TitleLocation }}
					>
						{props.radio}
					</motion.div>
				</BrowserView>
				<MobileView className="songName-mobile">
					<motion.div
						animate={{ x: transitionValue }}
						transition={{ delay: 1 }}
						className="radioStationTitle"
						style={{ left: TitleLocation }}
					>
						{props.radio}
					</motion.div>
				</MobileView>

				<BrowserView className="otherSoundsContainer">
					<div className="allign">
						<input className="soundDial"
							type="range"
							orient="vertical"
							min={0}
							max={1}
							value={rainVolume}
							onChange={event => {
								rainChange(event.target.valueAsNumber)
							}}
							step={0.2}

						/>
						<div className="otherSounds">
							<img src={rain} className="imgSizing" alt="" />
						</div>
					</div>
					<div className="allign">
						<input className="soundDial"
							type="range"
							orient="vertical"
							min={0}
							max={1}
							value={oceanVolume}
							onChange={event => {
								setOceanVolume(event.target.valueAsNumber)
							}}
							step={0.2}

						/>
						<div className="otherSounds">
							<img src={waves} className="imgSizing" alt="" />
						</div>
					</div>
					<div className="allign">
						<input className="soundDial"
							type="range"
							orient="vertical"
							min={0}
							max={1}
							value={whiteNoiseVolume}
							onChange={event => {
								setWhiteNoiseVolume(event.target.valueAsNumber)
							}}
							step={0.2}

						/>
						<div className="otherSounds">
							<img src={WhiteNoise} className="imgSizing" alt="" />
						</div>
					</div>
				</BrowserView>
			</div>
		</>
	)

}

export default AdditionSettings