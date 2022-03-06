import './styles/index.css';
import './styles/audioControl.css';
import { useEffect, useState } from 'react';
import AdditionSettings from './components/additionalInfo';
import PauseImage from './components/pauseImage';
import Loading from './components/loadingImage';
import RadioStations from './components/radioStation';
import { motion } from "framer-motion";
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import useStateRef from 'react-usestateref';

//Icons
import github from './images/github.png';
import play from './images/playBtn.png';
import pauseImg from './images/pause.png';
import volumeOn from './images/volumeOn.png';
import mute from './images/mute.png';
import fullscreen from './images/fullscreen.png';
import compress from './images/compress.png';
import moon from './images/moon.png';
import sun from './images/sun.png';
import right from './images/right.png';
import left from './images/left.png';
import shuffleIcon from './images/shuffle.png';
import loopIcon from './images/loop.png';

//Videos
import chillday from './videos/chillday.mp4';
import chillnight from './videos/chillnight.mp4';
import chillrainyday from './videos/chillrainyday.mp4';
import chillrainynight from './videos/chillrainynight.mp4';

//Musics
// import and_so_it_begins from './musics/and_so_it_begins.mp3';
// import bedtime_after_a_coffee from './musics/bedtime_after_a_coffee.mp3';
// import dreams_come_true from './musics/dreams_come_true.mp3';
// import morning_routine from './musics/morning_routine.mp3';
// import embrace from './musics/embrace.mp3';
// import equinox from './musics/equinox.mp3';
// import floating_castle from './musics/floating_castle.mp3';
// import green_tea from './musics/green_tea.mp3';
// import missing_you from './musics/missing_you.mp3';
// import on_my_way from './musics/on_my_way.mp3';
// import still_awake from './musics/still_awake.mp3';
// import wanted from './musics/wanted.mp3';
// import wild_strawberry from './musics/wild_strawberry.mp3';

//Videos
// let chillday = "https://drive.google.com/file/d/1vTX_OLXq3V-Oyv3JResCaXltjWPw-uhQ/preview";
// let chillnight = "https://drive.google.com/file/d/1FtsqcdvjT1gIv2jye2KEQVWa4N8-RliV/preview";
// let chillrainyday = "https://drive.google.com/file/d/1hep1kgXiDdRfIAdoDMvx9G17iJdVuBQO/preview";
// let chillrainynight = "https://drive.google.com/file/d/1JMLx8gpxXb7Jz9X9hkUi8pOC0x5LpMDW/preview";

let lastPlayedVolume = 0;
let first = true;

function App() {
  const [musicData, setMusicData] = useState([
    {
      id:0,
      stationName:"And so it begins",
      songName:"https://www.chosic.com/wp-content/uploads/2021/04/And-So-It-Begins-Inspired-By-Crush-Sometimes.mp3",
    },
    {
      id:1,
      stationName:"Bedtime after a coffee",
      songName:"https://www.chosic.com/wp-content/uploads/2020/11/barradeen-bedtime-after-a-coffee.mp3",
    },
    {
      id:2,
      stationName:"Dreams come true",
      songName:"https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-dreams-come-true.mp3",
    },
    {
      id:3,
      stationName:"Morning routine",
      songName:"https://www.chosic.com/wp-content/uploads/2021/09/Morning-Routine-Lofi-Study-Music.mp3",
    },
    {
      id:4,
      stationName:"Embrace",
      songName:"https://www.chosic.com/wp-content/uploads/2021/07/Embrace.mp3",
    },
    {
      id:5,
      stationName:"Equinox",
      songName:"https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-equinox.mp3",
    },
    {
      id:6,
      stationName:"Floating Castle",
      songName:"https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-floating-castle.mp3",
    },
    {
      id:7,
      stationName:"Green Tea",
      songName:"https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-green-tea.mp3",
    },
    {
      id:8,
      stationName:"Missing You",
      songName:"https://www.chosic.com/wp-content/uploads/2022/01/Missing-You.mp3",
    },
    {
      id:9,
      stationName:"On My Way",
      songName:"https://www.chosic.com/wp-content/uploads/2021/09/On-My-Way-Lofi-Study-Music.mp3",
    },
    {
      id:10,
      stationName:"Still Awake",
      songName:"https://www.chosic.com/wp-content/uploads/2021/09/Still-Awake-Lofi-Study-Music.mp3",
    },
    {
      id:11,
      stationName:"Wanted",
      songName:"https://www.chosic.com/wp-content/uploads/2022/01/Wanted.mp3",
    },
    {
      id:12,
      stationName:"Wild Strawberry",
      songName:"https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-wild-strawberry.mp3",
    },
  ]);

  const [BtnClass, setBtnClass] = useState("PlayPause")           //pause play change
  const [BtnClass2, setBtnClass2] = useState("playBtn")
  const [playPauseImg, setPlayPause] = useState(play)

  const [muteCheck, setUnmute] = useState("volumeOn")             //unmute/mute change
  const [muteCheck2, setUnmute2] = useState("audioOnImg")
  const [volumeImg, setVolumeImg] = useState(volumeOn)

  const [livestream, playLiveStream] = useState(false)
  const [pauseScreen, setPauseScreen] = useState("pauseScreen")
  const [currentLivestream, setLivestream] = useState(musicData[0].songName)

  const [weather, setWeather] = useState(sun);
  const [rain, setRain] = useState(false);

  const [stationName, setStationName] = useState(musicData[0].stationName)
 
  const [volume, setVolume] = useState(1)

  const [youtubeChannal, setYoutubeChannal] = useState('')

  const [background, setBackground] = useState(chillday);
  const [fullscreenIcon, setFullscreenIcon] = useState(fullscreen);

  const [currentMusic, setcurrentMusic, currentMusicRef] = useStateRef(0);

  const [loop, setLoop, loopRef] = useStateRef(false);

  useEffect(() => {
    if(first === true)
    {
      let tempData = musicData;
      let result = shuffle(tempData.length);
      setStationName(tempData[result].stationName);
      setLivestream(tempData[result].songName);
      setcurrentMusic(tempData[result].id);
      first = false;
    }
  });

  const nextMusic = () => {
    let number = currentMusicRef.current===musicData.length-1?0:currentMusicRef.current+1;
    console.log('number',number);
    console.log('data', musicData);
    setStationName(musicData[number].stationName);
    setLivestream(musicData[number].songName);
    setcurrentMusic(number);
  }

  const prevMusic = () => {
    let number = currentMusicRef.current===0?musicData.length-1:currentMusicRef.current-1;
    setStationName(musicData[number].stationName);
    setLivestream(musicData[number].songName);
    setcurrentMusic(number);
  }

  const suffleMusic = () => {
    let tempData = musicData;
    let result = shuffle(tempData.length);
    setStationName(tempData[result].stationName);
    setLivestream(tempData[result].songName);
    setcurrentMusic(tempData.indexOf(tempData[result]));
  }

  function shuffle(max) {
    return Math.floor(Math.random() * max);
  }

  const loopFunction = () => {
    if(loopRef.current === false)
    {
      setLoop(true);
    }
    else
    {
      setLoop(false);
    }
  }

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
  // const andSoItBegins = () => {
  //   setStationName("And so it begins")
  //   setYoutubeChannal(and_so_it_begins)
  //   setLivestream(and_so_it_begins)
  //   playLiveStream(true)
  //   setPauseScreen("unpauseScreen")
  //   setPlayPause(pauseImg)
  //   setBtnClass("PlayPause2")
  //   setBtnClass2("playBtn2")
  // }
  
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

           
            {console.log('current', currentMusic)}
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
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.9 }}
            onClick={()=>prevMusic()} className={muteCheck}>
            <img className="imgSizing" src={left} alt="" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.9 }}
            onClick={()=>suffleMusic()} className={muteCheck}>
            <img className="imgSizing" src={shuffleIcon} alt="" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.9 }}
            onClick={()=>nextMusic()} className={muteCheck}>
            <img className="imgSizing" src={right} alt="" />
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
            onClick={()=>loopFunction()} className={muteCheck}>
            <img id={loopRef.current?"spin-loop":''} className={'imgSizing'} src={loopIcon} alt="" />
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
        onEnded={nextMusic}
        loop={loopRef.current}
      />
      <Loading/>
    </div>
  )
}

export default App

