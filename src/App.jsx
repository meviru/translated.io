import styles from './App.module.css'
import Hero from './components/Hero/Hero'
import Logo from './components/Logo/Logo'
import { ToastContainer, toast } from 'react-toastify'
import Card from './components/Card/Card'
import { LANGUAGES } from './constants';
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce';
import { API_URL } from "./config";

const TOAST_CONFIG = {
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "colored",
}

function App() {
  // Hello, how are you?
  const [text, setText] = useState("");
  const [textValue] = useDebounce(text, 400);
  const [translatedText, setTranslatedText] = useState("");

  const [sourceLanguage, setSourceLanguage] = useState(LANGUAGES.ENGLISH);

  const selectSourceLanguage = (sourceLang, isTranslated) => {
    if (!isTranslated) {
      setSourceLanguage(sourceLang);
      onTranslate(sourceLang, targetLanguage);
    } else {
      selectTargetLanguage(sourceLang);
    }
  }

  const [targetLanguage, setTargetLanguage] = useState(LANGUAGES.FRENCH);
  const selectTargetLanguage = (targetLang) => {
    setTargetLanguage(targetLang);
    onTranslate(sourceLanguage, targetLang);
  }

  const switchTranslation = () => {
    setText(translatedText);
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  }

  const onTranslateButtonClick = () => {
    onTranslate(sourceLanguage, targetLanguage);
  }


  useEffect(() => {
    if (textValue.length > 0) {
      onTranslate(sourceLanguage, targetLanguage);
    } else {
      setTranslatedText("");
    }
  }, [textValue])

  const onTranslate = (sourceLang, targetLang) => {
    if (textValue.length > 0) {
      fetch(`${API_URL}/get?q=${textValue}&langpair=${sourceLang}|${targetLang}`)
        .then(response => response.json())
        .then(data => {
          switch (data.responseStatus) {
            case "403":
              toast.error(data.responseDetails, {
                autoClose: 5000,
                ...TOAST_CONFIG
              });
              break;
            case 429:
              toast.error(data.responseDetails, {
                autoClose: 5000,
                ...TOAST_CONFIG
              });
              break;
            case 200:
              setTranslatedText(data.responseData.translatedText);
              break;
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <>
      <ToastContainer />
      <Hero />
      <main className={styles.mainContent}>
        <div className="container">
          <Logo />
          <div className={styles.appContainer}>
            <div className="row">
              <Card text={text} setText={setText} language={sourceLanguage} selectLanguage={selectSourceLanguage} onTranslateButtonClick={onTranslateButtonClick} />
              <Card text={translatedText} setText={setTranslatedText} language={targetLanguage} selectLanguage={selectTargetLanguage} switchTranslation={switchTranslation} isTranslated={true} />
            </div>
          </div>
        </div>
      </main >
    </>
  )
}

export default App
