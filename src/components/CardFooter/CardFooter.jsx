import { useEffect, useRef } from 'react'
import iconTranslate from "../../assets/Sort_alfa.svg"
import styles from "./CardFooter.module.css";
import ListenButton from '../ListenButton/ListenButton';
import CopyButton from '../CopyButton/CopyButton';

const CardFooter = ({ isTranslated, text, onCopy, onTranslateButtonClick }) => {
    const count = useRef(0);

    useEffect(() => {
        count.current = text.length;
    }, [text])

    return <>
        <div className={styles.cardFooter}>
            {!isTranslated && <div className={styles.footerCount}>{count.current}/500</div>}
            <div className={styles.footerButtons}>
                <div className={styles.footerButtonsLeft}>
                    <ListenButton text={text} />
                    <CopyButton text={text} />
                </div>
                {!isTranslated && <button onClick={onTranslateButtonClick} type='button' className={styles.translateBtn}>
                    <img className={styles.translateBtnIcon} src={iconTranslate} alt='copy' title='Copy text' />
                    Translate
                </button>}
            </div>
        </div>
    </>
}

export default CardFooter;