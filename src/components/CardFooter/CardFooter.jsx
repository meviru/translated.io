import { useEffect, useRef } from 'react'
import iconSpeaker from "../../assets/sound_max_fill.svg"
import iconCopy from "../../assets/Copy.svg"
import iconTranslate from "../../assets/Sort_alfa.svg"
import styles from "./CardFooter.module.css";

const CardFooter = ({ isPlaying, isTranslatedCard, translate, onListen, onCopy, onTranslateBtn }) => {
    const count = useRef(0);

    useEffect(() => {
        count.current = translate.length;
    }, [translate])

    return <>
        <div className={styles.cardFooter}>
            {!isTranslatedCard && <div className={styles.footerCount}>{count.current}/500</div>}
            <div className={styles.footerButtons}>
                <div className={styles.footerButtonsLeft}>
                    <button type='button' className={`${styles.iconBtn} ${isPlaying ? styles.iconBtnAnimation : ''}`}>
                        <img src={iconSpeaker} alt='speaker' title='Listen' onClick={() => onListen(translate)} />
                    </button>
                    <button type='button' className={styles.iconBtn} onClick={() => onCopy(translate)}>
                        <img src={iconCopy} alt='copy' title='Copy text' />
                    </button>
                </div>
                {!isTranslatedCard && <button onClick={onTranslateBtn} type='button' className={styles.translateBtn}>
                    <img className={styles.translateBtnIcon} src={iconTranslate} alt='copy' title='Copy text' />
                    Translate
                </button>}
            </div>
        </div>
    </>
}

export default CardFooter;