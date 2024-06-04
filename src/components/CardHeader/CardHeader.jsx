import { useEffect, useState } from "react";
import { LANGUAGES, generateUniqueId } from "../../constants";
import SwitchButton from "../SwitchButton/SwitchButton";
import styles from "./CardHeader.module.css";
import LanguageItem from "../LanguageItem/LanguageItem";

const CardHeader = ({ isTranslated, language, selectLanguage, switchTranslation }) => {
    const defaultLanguages = [];

    const [languageList, setLanguageList] = useState([]);

    useEffect(() => {
        for (const key in LANGUAGES) {
            if (LANGUAGES.hasOwnProperty(key)) {
                const languageObj = {}
                languageObj.id = generateUniqueId('lid');
                languageObj.name = key.charAt(0) + key.substring(1, key.length).toLowerCase();
                languageObj.code = LANGUAGES[key];
                defaultLanguages.push(languageObj);
            }
        }
        setLanguageList(defaultLanguages);
    }, [])

    return <>
        <div className={styles.cardHeader}>
            <ul className={styles.langSwitch}>
                {!isTranslated &&
                    <li onClick={() => selectLanguage('autodetect')} className={`${styles.langSwitchItem} ${language === 'autodetect' ? styles.active : ''}`}>Detect Language</li>
                }
                {languageList.length > 0 && languageList.slice(0, 3).map((langItem, index) =>
                    <LanguageItem key={index} isLastItem={index == 2} langItem={langItem} language={language} isTranslated={isTranslated} selectLanguage={selectLanguage} />
                )}
            </ul>
            {isTranslated &&
                <SwitchButton switchTranslation={switchTranslation} />
            }
        </div>
    </>
}

export default CardHeader;