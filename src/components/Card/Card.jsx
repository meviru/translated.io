import { useState } from 'react'
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

const Card = ({ text, setText, language, isTranslated, selectLanguage, switchTranslation, onTranslateButtonClick }) => {

    const onCopy = (value) => {
        navigator.clipboard.writeText(value);
        toast.info("Copied to clipboard", {
            autoClose: 1500,
            ...TOAST_CONFIG
        });
    }

    return <>
        <div className={`${styles.card} ${isTranslated ? styles.cardAlt : ''}`}>
            <CardHeader language={language} selectLanguage={selectLanguage} switchTranslation={switchTranslation} isTranslated={isTranslated} />
            <CardBody text={text} setText={setText} />
            <CardFooter text={text} onCopy={onCopy} onTranslateButtonClick={onTranslateButtonClick} isTranslated={isTranslated} />
        </div >
    </>
}

export default Card;