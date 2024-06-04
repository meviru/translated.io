import iconSwitch from "../../assets/Horizontal_top_left_main.svg"
import styles from "./SwitchButton.module.css";

const SwitchButton = ({ switchTranslation }) => {
    return <>
        <div className={styles.cardHeaderRight}>
            <button type='button' className={styles.iconBtn} onClick={switchTranslation}>
                <img src={iconSwitch} alt='switch' title='Switch translation' />
            </button>
        </div>
    </>
}

export default SwitchButton;