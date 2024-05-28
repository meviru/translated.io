import styles from './App.module.css'
import Hero from './components/Hero/Hero'
import Logo from './components/Logo/Logo'
import iconSwitch from "./assets/Horizontal_top_left_main.svg"
import iconSpeaker from "./assets/sound_max_fill.svg"
import iconCopy from "./assets/Copy.svg"
import iconTranslate from "./assets/Sort_alfa.svg"
import { useState, useEffect, useRef } from 'react'
import { useDebounce } from 'use-debounce';

const API_URL = "https://api.mymemory.translated.net";

function App() {
  const [translate, setTranslate] = useState("Hello, how are you?");
  const [translateValue] = useDebounce(translate, 500);
  const [translated, setTranslated] = useState("");

  const count = useRef(0);

  const LANGUAGES = {
    AUTO: 'autodetect',
    ENGLISH: 'en',
    FRENCH: 'fr',
    SPANISH: 'es'
  }

  const [language, setLanguage] = useState("en");
  const selectLanguage = (lang) => {
    setLanguage(lang);
  }

  const [languageTo, setLanguageTo] = useState("es");
  const selectLanguageTo = (lang) => {
    setLanguageTo(lang);
  }

  useEffect(() => {
    count.current = translate.length;
  }, [translate])

  useEffect(() => {
    fetch(`${API_URL}/get?q=${translateValue}&langpair=${language}|${languageTo}`)
      .then(response => response.json())
      .then(data => {
        setTranslated(data.responseData.translatedText);
      })
      .catch(error => {
        console.log(error)
      })
  }, [translateValue])

  return (
    <>
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
                        <img src={iconSpeaker} alt='speaker' title='Speaker' />
                      </button>
                      <button type='button' className={styles.iconBtn}>
                        <img src={iconCopy} alt='copy' title='Copy' />
                      </button>
                    </div>
                    <button type='button' className={styles.translateBtn}>
                      <img className={styles.translateBtnIcon} src={iconTranslate} alt='copy' title='Copy' />
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
                    <button type='button' className={styles.iconBtn}>
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
                      <button type='button' className={styles.iconBtn}>
                        <img src={iconSpeaker} alt='speaker' title='Speaker' />
                      </button>
                      <button type='button' className={styles.iconBtn}>
                        <img src={iconCopy} alt='copy' title='Copy' />
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
