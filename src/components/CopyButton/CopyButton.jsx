import iconCopy from "../../assets/Copy.svg"
import styles from "./CopyButton.module.css";

const CopyButton = ({ text }) => {

    const onCopy = () => {
        navigator.clipboard.writeText(text);
        // toast.info("Copied to clipboard", {
        //     autoClose: 1500,
        //     ...TOAST_CONFIG
        // });
    }

    return <>
        <button type='button' className={styles.iconBtn} onClick={onCopy}>
            <img src={iconCopy} alt='copy' title='Copy text' />
        </button>
    </>
}

export default CopyButton;