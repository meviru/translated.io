import styles from "./LanguageItem.module.css";

const LanguageItem = ({ isTranslated, isLastItem, language, langItem, selectLanguage }) => {
    return <>
        <li key={langItem.id} onClick={() => selectLanguage(langItem.code, isTranslated)} className={`${styles.langSwitchItem} ${language === langItem.code ? styles.active : ''} ${isLastItem ? styles.selectLang : ''}`}>{langItem.name}</li>
    </>
}

export default LanguageItem;