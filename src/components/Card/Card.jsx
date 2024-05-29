import styles from "./Card.module.css";

const Card = () => {
    return <div className={styles.card}>
        <div className={styles.cardHeader}>
            <ul className={styles.langSwitch}>
                <li onClick={() => selectLanguage('autodetect')} className={`${styles.langSwitchItem} ${language === LANGUAGES.AUTO ? styles.active : ''}`}>Detect Language</li>
                <li onClick={() => selectLanguage('en')} className={`${styles.langSwitchItem} ${language === LANGUAGES.ENGLISH ? styles.active : ''}`}>English</li>
                <li onClick={() => selectLanguage('fr')} className={`${styles.langSwitchItem} ${language === LANGUAGES.FRENCH ? styles.active : ''}`}>French</li>
                <li onClick={() => selectLanguage('es')} className={`${styles.selectLang} ${styles.langSwitchItem} ${language === LANGUAGES.SPANISH ? styles.active : ''}`}>Spanish</li>
            </ul>
        </div>
        <div className={styles.cardBody}>
            <textarea value={translate} maxLength={500} className={styles.inputItem} onChange={(e) => setTranslate(e.target.value)} />
        </div>
        <div className={styles.cardFooter}>
            <div className={styles.footerCount}>{count.current}/500</div>
            <div className={styles.footerButtons}>
                <div className={styles.footerButtonsLeft}>
                    <button type='button' className={`${styles.iconBtn} ${isPlaying ? styles.iconBtnAnimation : ''}`}>
                        <img src={iconSpeaker} alt='speaker' title='Listen' onClick={() => onListen(translate)} />
                    </button>
                    <button type='button' className={styles.iconBtn} onClick={() => onCopy(translate)}>
                        <img src={iconCopy} alt='copy' title='Copy text' />
                    </button>
                </div>
                <button onClick={onTranslateBtn} type='button' className={styles.translateBtn}>
                    <img className={styles.translateBtnIcon} src={iconTranslate} alt='copy' title='Copy text' />
                    Translate
                </button>
            </div>
        </div>
    </div>
}

export default Card;