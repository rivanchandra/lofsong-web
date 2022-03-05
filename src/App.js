import './styles/index.css'
import './styles/audioControl.css'
import { useState } from 'react'
import AdditionSettings from './components/additionalInfo'
import PauseImage from './components/pauseImage'
import Loading from './components/loadingImage'
import RadioStations from './components/radioStation'
import { motion } from "framer-motion"
import ReactPlayer from 'react-player'
import screenfull from 'screenfull';

import github from './images/github.png'
import play from './images/playBtn.png'
import pauseImg from './images/pause.png'
import volumeOn from './images/volumeOn.png'
import mute from './images/mute.png'
import fullscreen from './images/fullscreen.png';
import compress from './images/compress.png';
import moon from './images/moon.png'
import sun from './images/sun.png'

import chillday from './videos/chillday.mp4';
import chillnight from './videos/chillnight.mp4';
import chillrainyday from './videos/chillrainyday.mp4';
import chillrainynight from './videos/chillrainynight.mp4';
import and_so_it_begins from './musics/and_so_it_begins.mp3';

let lastPlayedVolume = 0;

function App() {


  const [BtnClass, setBtnClass] = useState("PlayPause")           //pause play change
  const [BtnClass2, setBtnClass2] = useState("playBtn")
  const [playPauseImg, setPlayPause] = useState(play)

  const [muteCheck, setUnmute] = useState("volumeOn")             //unmute/mute change
  const [muteCheck2, setUnmute2] = useState("audioOnImg")
  const [volumeImg, setVolumeImg] = useState(volumeOn)

  const [livestream, playLiveStream] = useState(false)
  const [pauseScreen, setPauseScreen] = useState("pauseScreen")
  const [currentLivestream, setLivestream] = useState(and_so_it_begins)

  const [weather, setWeather] = useState(sun);

  const [stationName, setStationName] = useState("And so it begins")
 
  const [volume, setVolume] = useState(1)

  const [rain, setRain] = useState(false);


  const [youtubeChannal, setYoutubeChannal] = useState('')

  const [background, setBackground] = useState(chillday);
  const [fullscreenIcon, setFullscreenIcon] = useState(fullscreen);



  const handlePausePlaySwitch = (e) => {
    let className = e.target.className


    if (className === "PlayPause" || className === "playBtn") {
      setPlayPause(pauseImg)
      setBtnClass("PlayPause2")
      setBtnClass2("playBtn2")
      start()
    } else if (className === "PlayPause2" || className === "playBtn2") {
      setPlayPause(play)
      setBtnClass("PlayPause")
      setBtnClass2("playBtn")
      pause()
    }
  }

  const handleMute = (e) => {
    let classNameVol = e.target.className
   
    if (classNameVol === "volumeOn" || classNameVol === "audioOnImg") {
      setVolumeImg(mute)
      setUnmute("volumeOff")
      setUnmute2("audioOffImg")
      lastPlayedVolume = volume
      setVolume(0)
    } else if (classNameVol === "volumeOff" || classNameVol === "audioOffImg") {
      setVolumeImg(volumeOn)
      setUnmute("volumeOn")
      setUnmute2("audioOnImg")
      setVolume(lastPlayedVolume)
    }
  }


  const start = () => {
    playLiveStream(false)
    playLiveStream(true)
    setPauseScreen("unpauseScreen")
  }

  const pause = () => {
    setPauseScreen("pauseScreen")
    playLiveStream(false)
  }

  const handleChangeBackground  = () => {
    if(weather === sun)
    {
      rain === false?setBackground(chillnight):setBackground(chillrainynight);
      setWeather(moon);
    }
    else if(weather === moon)
    {
      rain === false?setBackground(chillday):setBackground(chillrainyday)
      setWeather(sun);
    }
  }

  const changeRain = (data) => {
    console.log('data', data);
    if(weather === moon)
    {
      data === false?setBackground(chillnight):setBackground(chillrainynight);
    }
    else if(weather === sun)
    {
      data === false?setBackground(chillday):setBackground(chillrainyday)
    }
    setRain(data);
  }

  // <------------- Radio Change section -------------->
  const data = [
    {
      setStationName:"And so it begins",
      setYoutubeChannal:and_so_it_begins,
      setLivestream:and_so_it_begins,
      playLiveStream:true,
      setPauseScreen:"unpauseScreen",
      setPlayPause:pauseImg,
      setBtnClass:"PlayPause2",
      setBtnClass2:"playBtn2"
    }
  ]
  const andSoItBegins = () => {
    setStationName("And so it begins")
    setYoutubeChannal(and_so_it_begins)
    setLivestream(and_so_it_begins)
    playLiveStream(true)
    setPauseScreen("unpauseScreen")
    setPlayPause(pauseImg)
    setBtnClass("PlayPause2")
    setBtnClass2("playBtn2")
  }
  
  const handleClickFullscreen = () => {
    if(screenfull.isFullscreen)
    {
      screenfull.exit();
      setFullscreenIcon(fullscreen);
    }
    else
    {
      screenfull.request();
      setFullscreenIcon(compress);
    }
  }

  return (


    <div className='interfaceContainer'>


      <div className="radioContainer">

        <div className="logo">
          Listen Music
        </div>
        <div className="subHeading">

        </div>
        <div className="radioStationsContainer">
           
        {/* <RadioStations
          Lofi={andSoItBegins}
          data={data}
        /> */}

        </div>
        <div className='socialsContainer2'>
          <div className='socials'>
            
            <motion.div
              whileHover={{ scale: 1.09 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { window.open("https://github.com/rivanchandra") }}
              className="link">
              <img className="githubLogo" src={github} alt="" />
            </motion.div>

           
            
          </div>
        </div>
      </div>
      <div className="audioControlContainer">
        <div className="audioControl">
          <motion.div
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.9 }}
            onClick={()=>handleChangeBackground()} className={muteCheck}>
            <img className="imgSizing" src={weather} alt="" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.9 }}
            onClick={()=>handleClickFullscreen()} className={muteCheck}>
            <img className="imgSizing" src={fullscreenIcon} alt="" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePausePlaySwitch} className={BtnClass}>
            <img src={playPauseImg} className={BtnClass2} alt="" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleMute} className={muteCheck}>
            <img className={muteCheck2} src={volumeImg} alt="" />
          </motion.div>
          <div >
            <input className="volumeDial"
              type="range"
              min={0}
              max={1}
              value={volume}
              step={0.01}
              onChange={event => {
                setVolume(event.target.valueAsNumber)
              }}
            />
          </div>
        </div>


      </div>
      {/* <div className={pauseScreen}> */}
            {/* <PauseImage/>
        <p style={{ marginTop: "0rem" }}>Music Paused</p> */}
      {/* </div> */}
      <AdditionSettings 
        // youtube={youtubeChannal}
        radio={stationName}
        changeRain={changeRain}
      />
      <div class="videoContainer">
        <ReactPlayer
          // className="vid"
          width="140%" 
          height="140%"
          loop="true"
          playing={livestream}
          volume="mute"
          url={background} 
        />
        {/* <video className='videoTag' autoPlay loop muted>
          <source src={background} type='video/mp4' />
        </video> */}
      </div>
      <ReactPlayer
        className="liveStreamPlayer"
        playing={livestream}
        volume={volume}
        url={currentLivestream}
      />
      <Loading/>


    </div>








  )
}

export default App

