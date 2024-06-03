import styles from './App.module.css'
import Hero from './components/Hero/Hero'
import Logo from './components/Logo/Logo'
import { ToastContainer, toast } from 'react-toastify'
import Card from './components/Card/Card'
import { LANGUAGES } from './constants';
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce';
import { API_URL, XI_API_URL, XI_API_KEY, VOICE_ID } from "./config";

const TOAST_CONFIG = {
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "colored",
}

function App() {
  const [text, setText] = useState("");
  const [textValue] = useDebounce(text, 400);
  const [translatedText, setTranslatedText] = useState("");

  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [selectedLang, setSelectedLang] = useState("");

  const selectLanguage = (sourceLang, isTranslatedCard) => {
    if (!isTranslatedCard) {
      setSourceLanguage(sourceLang);
      setSelectedLang(sourceLang);
      onTranslate(sourceLang, targetLanguage);
    } else {
      selectLanguageTo(sourceLang);
    }
  }

  const [targetLanguage, setTargetLanguage] = useState("fr");
  const selectLanguageTo = (targetLang) => {
    setTargetLanguage(targetLang);
    setSelectedLang(targetLang);
    onTranslate(sourceLanguage, targetLang);
  }

  useEffect(() => {
    if (textValue.length > 0) {
      onTranslate(sourceLanguage, targetLanguage);
    } else {
      setTranslatedText("");
    }
  }, [textValue])

  const onTranslate = (sourceLang, targetLang) => {
    if (translateValue.length > 0) {
      fetch(`${API_URL}/get?q=${translateValue}&langpair=${sourceLang}|${targetLang}`)
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
              <Card text={text} language={sourceLanguage} selectLanguage={selectLanguage} />
              <Card text={translatedText} language={targetLanguage} selectLanguage={selectLanguage} isTranslated={true} />
            </div>
          </div>
        </div>
      </main >
    </>
  )
}

export default App
