import iconSwitch from "../../assets/Horizontal_top_left_main.svg"
import { LANGUAGES } from "../../constants";
import styles from "./CardHeader.module.css";

const CardHeader = ({ isTranslated, language, selectLanguage, switchTranslation }) => {
    return <>
        <div className={styles.cardHeader}>
            <ul className={styles.langSwitch}>
                {!isTranslated && <li onClick={() => selectLanguage('autodetect')} className={`${styles.langSwitchItem} ${language === LANGUAGES.AUTO ? styles.active : ''}`}>Detect Language</li>}
                <li onClick={() => selectLanguage(LANGUAGES.ENGLISH, isTranslated)} className={`${styles.langSwitchItem} ${language === LANGUAGES.ENGLISH ? styles.active : ''}`}>English</li>
                <li onClick={() => selectLanguage(LANGUAGES.FRENCH, isTranslated)} className={`${styles.langSwitchItem} ${language === LANGUAGES.FRENCH ? styles.active : ''}`}>French</li>
                <li onClick={() => selectLanguage(LANGUAGES.SPANISH, isTranslated)} className={`${styles.selectLang} ${styles.langSwitchItem} ${language === LANGUAGES.SPANISH ? styles.active : ''}`}>Spanish</li>
            </ul>
            {isTranslated &&
                <div className={styles.cardHeaderRight}>
                    <button type='button' className={styles.iconBtn} onClick={switchTranslation}>
                        <img src={iconSwitch} alt='switch' title='Switch translation' />
                    </button>
                </div>
            }
        </div>
    </>
}

export default CardHeader;