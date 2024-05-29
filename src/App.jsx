import styles from './App.module.css'
import Hero from './components/Hero/Hero'
import Logo from './components/Logo/Logo'
import iconSwitch from "./assets/Horizontal_top_left_main.svg"
import iconSpeaker from "./assets/sound_max_fill.svg"
import iconCopy from "./assets/Copy.svg"
import iconTranslate from "./assets/Sort_alfa.svg"
import { useState, useEffect, useRef } from 'react'
import { useDebounce } from 'use-debounce';
import { ToastContainer, toast } from 'react-toastify'

const API_URL = "https://api.mymemory.translated.net";

const XI_API_KEY = "c40f81375afb77dd3e6157e80c363482";
const VOICE_ID = "P7x743VjyZEOihNNygQ9";

const TOAST_CONFIG = {
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "colored",
}

const LANGUAGES = {
  AUTO: 'autodetect',
  ENGLISH: 'en',
  FRENCH: 'fr',
  SPANISH: 'es',
  HINDI: "hi",
  CHINESE: "zh-CN",
  JAPANESE: "ja",
  GERMAN: "de-DE",
  ARABIC: "ar-AE",
  CZECH: "cs",
}

function App() {
  const [translate, setTranslate] = useState("Hello, how are you?");
  const [translateValue] = useDebounce(translate, 400);
  const [translated, setTranslated] = useState("");

  const count = useRef(0);

  const [language, setLanguage] = useState("en");
  const selectLanguage = (lang) => {
    setLanguage(lang);
    onTranslate(lang, languageTo);
  }

  const [languageTo, setLanguageTo] = useState("fr");
  const selectLanguageTo = (langTo) => {
    setLanguageTo(langTo);
    onTranslate(language, langTo);
  }

  const switchTranslation = () => {
    setTranslate(translated);
    setLanguage(languageTo);
    setLanguageTo(language);
  }

  useEffect(() => {
    count.current = translate.length;
  }, [translate])

  useEffect(() => {
    if (translateValue.length > 0) {
      onTranslate(language, languageTo);
    } else {
      setTranslated("");
    }
  }, [translateValue])

  const onTranslate = (lang, langTo) => {
    if (translateValue.length > 0) {
      fetch(`${API_URL}/get?q=${translateValue}&langpair=${lang}|${langTo}`)
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
              setTranslated(data.responseData.translatedText);
              break;
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const onCopy = (value) => {
    navigator.clipboard.writeText(value);
    toast.info("Copied to clipboard", {
      autoClose: 1500,
      ...TOASTCONFIG
    });
  }

  const onListen = (text) => {

    const options = {
      method: 'POST',
      headers: {
        'xi-api-key': XI_API_KEY,
        'Content-Type': 'application/json'
      },
      body: `{"text":"${text}","voice_settings":{"stability":0.5,"similarity_boost":0.5}}`,
    };

    fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, options, { parseType: 'arrayBuffer' })
      .then(response => {
        response.blob().then((audioBlob) => {
          // Convert the binary data to a blob
          const audioUrl = URL.createObjectURL(audioBlob);

          // Create an audio element and set its source to the audio URL
          const audio = new Audio(audioUrl);
          audio.play(); // Play the audio
        })
      })
      .catch(error => console.error(error));
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
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <ul className={styles.langSwitch}>
                    <li onClick={() => selectLanguage('autodetect')} className={`${styles.langSwitchItem} ${language === LANGUAGES.AUTO ? styles.active : ''}`}>Delete Language</li>
                    <li onClick={() => selectLanguage('en')} className={`${styles.langSwitchItem} ${language === LANGUAGES.ENGLISH ? styles.active : ''}`}>English</li>
                    <li onClick={() => selectLanguage('fr')} className={`${styles.langSwitchItem} ${language === LANGUAGES.FRENCH ? styles.active : ''}`}>French</li>
                    <li onClick={() => selectLanguage('es')} className={`${styles.langSwitchItem} ${language === LANGUAGES.SPANISH ? styles.active : ''}`}>Spanish</li>
                  </ul>
                </div>
                <div className={styles.cardBody}>
                  <textarea value={translate} maxLength={500} className={styles.inputItem} onChange={(e) => setTranslate(e.target.value)} />
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.footerCount}>{count.current}/500</div>
                  <div className={styles.footerButtons}>
                    <div className={styles.footerButtonsLeft}>
                      <button type='button' className={styles.iconBtn}>
                        <img src={iconSpeaker} alt='speaker' title='Listen' onClick={() => onListen(translate)} />
                      </button>
                      <button type='button' className={styles.iconBtn} onClick={() => onCopy(translate)}>
                        <img src={iconCopy} alt='copy' title='Copy' />
                      </button>
                    </div>
                    <button type='button' className={styles.translateBtn}>
                      <img className={styles.translateBtnIcon} src={iconTranslate} alt='copy' title='Copy text' />
                      Translate
                    </button>
                  </div>
                </div>
              </div>
              <div className={`${styles.card} ${styles.cardAlt}`}>
                <div className={styles.cardHeader}>
                  <ul className={styles.langSwitch}>
                    <li onClick={() => selectLanguageTo('en')} className={`${styles.langSwitchItem} ${languageTo === LANGUAGES.ENGLISH ? styles.active : ''}`}>English</li>
                    <li onClick={() => selectLanguageTo('fr')} className={`${styles.langSwitchItem} ${languageTo === LANGUAGES.FRENCH ? styles.active : ''}`}>French</li>
                    <li onClick={() => selectLanguageTo('es')} className={`${styles.langSwitchItem} ${languageTo === LANGUAGES.SPANISH ? styles.active : ''}`}> Spanish</li>
                  </ul>
                  <div className={styles.cardHeaderRight}>
                    <button type='button' className={styles.iconBtn} onClick={switchTranslation}>
                      <img src={iconSwitch} alt='switch' title='Switch' />
                    </button>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <textarea readOnly value={translated} className={styles.inputItem} />
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.footerButtons}>
                    <div className={styles.footerButtonsLeft}>
                      <button type='button' className={styles.iconBtn} onClick={() => onListen(translated)}>
                        <img src={iconSpeaker} alt='speaker' title='Listen' />
                      </button>
                      <button type='button' className={styles.iconBtn} onClick={() => onCopy(translated)}>
                        <img src={iconCopy} alt='copy' title='Copy text' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >
    </>
  )
}

export default App
