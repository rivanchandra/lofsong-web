import './styles/index.css'
import './styles/audioControl.css'
import workday from './videos/workday.mp4';
import musics from './musics/and_so_it_begins.mp3';

let audio = new Audio(musics)

function App() {

  const start = () => {
    audio.play()
  }

  return (
    <div>
      {/* <video className='videoTag' autoPlay loop muted>
          <source src={workday} type='video/mp4' />
      </video> */}

      <button onClick={start}>Play</button>
    </div>
  )
}

export default App

