import './styles/index.css'
import './styles/audioControl.css'
import { useState } from 'react'
import AdditionSettings from './components/additionalInfo'
import PauseImage from './components/pauseImage'
import Loading from './components/loadingImage'
import RadioStations from './components/radioStation'
import github from './images/github.png'
import play from './images/playBtn.png'
import pauseImg from './images/pause.png'
import volumeOn from './images/volumeOn.png'
import mute from './images/mute.png'
import fullscreen from './images/fullscreen.png';
import { motion } from "framer-motion"
import ReactPlayer from 'react-player'
import screenfull from 'screenfull';
import workday from './videos/workday.mp4';
import and_so_it_begins from './musics/and_so_it_begins.mp3';

let lastPlayedVolume = 0;

function App() {


  const [BtnClass, setBtnClass] = useState("PlayPause2")           //pause play change
  const [BtnClass2, setBtnClass2] = useState("playBtn2")
  const [playPauseImg, setPlayPause] = useState(pauseImg)

  const [muteCheck, setUnmute] = useState("volumeOn")             //unmute/mute change
  const [muteCheck2, setUnmute2] = useState("audioOnImg")
  const [volumeImg, setVolumeImg] = useState(volumeOn)

  const [livestream, playLiveStream] = useState(true)
  const [pauseScreen, setPauseScreen] = useState("pauseScreen")
  const [currentLivestream, setLivestream] = useState(and_so_it_begins)

  const [stationName, setStationName] = useState("LofiGirl")

 
  const [volume, setVolume] = useState(1)


  const [youtubeChannal, setYoutubeChannal] = useState('')



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

  const [video, setVideo] = useState(`//www.youtube.com/embed/TURbeWK2wwg?autoplay=1&mute=1&start=1`)



  // <------------- Radio Change section -------------->

  const LofiGirlVideo = () => {
    setVideo(and_so_it_begins)
    setStationName("LofiGirl")
    setYoutubeChannal(and_so_it_begins)
    setLivestream(and_so_it_begins)
    playLiveStream(true)
    setPauseScreen("unpauseScreen")
    setPlayPause(pauseImg)
    setBtnClass("PlayPause2")
    setBtnClass2("playBtn2")
  }
  
  const handleClickFullscreen = () => {
      screenfull.request();
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
           
        <RadioStations
          Lofi={LofiGirlVideo}
        />

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
              onClick={()=>handleClickFullscreen()} className={muteCheck}>
              <img className={muteCheck2} src={fullscreen} alt="" />
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
      <div className={pauseScreen}>
            {/* <PauseImage/>
        <p style={{ marginTop: "0rem" }}>Music Paused</p> */}
      </div>
      <AdditionSettings 
        // youtube={youtubeChannal}
        radio={stationName} 
      />
      <div class="videoContainer">
          <ReactPlayer
            className="vid"
            width="140%" 
            height="140%"
            loop="true"
            playing={livestream}
            volume="mute"
            url={video} 
          />
      </div>
      <video className='videoTag' autoPlay loop muted>
          <source src={workday} type='video/mp4' />
      </video>

      <ReactPlayer
        className="liveStreamPlayer"
        playing={livestream}
        volume={volume}
        url={currentLivestream} />

      <Loading/>


    </div>








  )
}

export default App

