import styles from './App.module.css'
import Hero from './components/Hero/Hero'
import Logo from './components/Logo/Logo'
import { ToastContainer, toast } from 'react-toastify'
import Card from './components/Card/Card'
import { LANGUAGES } from './constants';

const TOAST_CONFIG = {
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "colored",
}

function App() {
  return (
    <>
      <ToastContainer />
      <Hero />
      <main className={styles.mainContent}>
        <div className="container">
          <Logo />
          <div className={styles.appContainer}>
            <div className="row">
              <Card />
              <Card isTranslatedCard={true} />
            </div>
          </div>
        </div>
      </main >
    </>
  )
}

export default App
