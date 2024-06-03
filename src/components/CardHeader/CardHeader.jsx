import iconSwitch from "../../assets/Horizontal_top_left_main.svg"
import { LANGUAGES } from "../../constants";
import styles from "./CardHeader.module.css";

const CardHeader = ({ isTranslated, selectedLang, selectLanguage, switchTranslation }) => {
    return <>
        <div className={styles.cardHeader}>
            <ul className={styles.langSwitch}>
                {!isTranslated && <li onClick={() => selectLanguage('autodetect')} className={`${styles.langSwitchItem} ${selectedLang === LANGUAGES.AUTO ? styles.active : ''}`}>Detect Language</li>}
                <li onClick={() => selectLanguage('en', isTranslated)} className={`${styles.langSwitchItem} ${selectedLang === LANGUAGES.ENGLISH ? styles.active : ''}`}>English</li>
                <li onClick={() => selectLanguage('fr', isTranslated)} className={`${styles.langSwitchItem} ${selectedLang === LANGUAGES.FRENCH ? styles.active : ''}`}>French</li>
                <li onClick={() => selectLanguage('es', isTranslated)} className={`${styles.selectLang} ${styles.langSwitchItem} ${selectedLang === LANGUAGES.SPANISH ? styles.active : ''}`}>Spanish</li>
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