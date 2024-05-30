import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce';
import styles from "./Card.module.css";
import CardHeader from "../CardHeader/CardHeader"
import CardBody from '../CardBody/CardBody';
import CardFooter from '../CardFooter/CardFooter';
import { API_URL, XI_API_URL, XI_API_KEY, VOICE_ID } from "../../config";

const TOAST_CONFIG = {
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
}

const Card = ({ isTranslatedCard }) => {
    // Hello, how are you?
    const [translate, setTranslate] = useState("");
    const [translateValue] = useDebounce(translate, 400);
    const [translated, setTranslated] = useState("");

    const [selectedLang, setSelectedLang] = useState("");

    const [language, setLanguage] = useState("en");
    const selectLanguage = (lang, isTranslatedCard) => {
        if (!isTranslatedCard) {
            setLanguage(lang);
            setSelectedLang(lang);
            onTranslate(lang, languageTo);
        } else {
            selectLanguageTo(lang);
        }
    }

    const [languageTo, setLanguageTo] = useState("fr");
    const selectLanguageTo = (langTo) => {
        setLanguageTo(langTo);
        setSelectedLang(langTo);
        onTranslate(language, langTo);
    }

    const switchTranslation = () => {
        setTranslate(translated);
        setLanguage(languageTo);
        setLanguageTo(language);
    }


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

    const onTranslateBtn = () => {
        onTranslate(language, languageTo);
    }

    const onCopy = (value) => {
        navigator.clipboard.writeText(value);
        toast.info("Copied to clipboard", {
            autoClose: 1500,
            ...TOAST_CONFIG
        });
    }

    const [isPlaying, setIsPlaying] = useState(false);
    const onListen = (text) => {
        if (text.length > 0) {
            setIsPlaying(true);
            const options = {
                method: 'POST',
                headers: {
                    'xi-api-key': XI_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: `{"text":"${text}","voice_settings":{"stability":0.5,"similarity_boost":0.5}}`,
            };

            fetch(`${XI_API_URL}/${VOICE_ID}`, options, { parseType: 'arrayBuffer' })
                .then(response => {
                    response && response.blob().then((audioBlob) => {
                        // Convert the binary data to a blob
                        const audioUrl = URL.createObjectURL(audioBlob);

                        // Create an audio element and set its source to the audio URL
                        const audio = new Audio(audioUrl);
                        audio.play(); // Play the audio

                        audio.addEventListener('loadedmetadata', () => {
                            // do stuff with the duration
                            const duration = (audio.duration * 1000) + 200;
                            setTimeout(() => {
                                setIsPlaying(false);
                            }, duration);
                        });
                    })
                })
                .catch(error => console.error(error));
        }
    }
    return <>
        <div className={`${styles.card} ${isTranslatedCard ? styles.cardAlt : ''}`}>
            <CardHeader selectedLang={selectedLang} selectLanguage={selectLanguage} switchTranslation={switchTranslation} isTranslatedCard={isTranslatedCard} />
            <CardBody translate={translate} setTranslate={setTranslate} />
            <CardFooter translate={translate} onCopy={onCopy} onListen={onListen} isPlaying={isPlaying} isTranslatedCard={isTranslatedCard} />
        </div >
    </>
}

export default Card;