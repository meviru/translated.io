import iconCopy from "../../assets/Copy.svg"
import styles from "./CopyButton.module.css";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "../../constants/index"

const CopyButton = ({ text }) => {

    const onCopy = () => {
        if (text.length > 0) {
            navigator.clipboard.writeText(text);
            toast.info("Copied to clipboard", {
                autoClose: 1500,
                ...TOAST_CONFIG
            });
        }
    }

    return <>
        <button type='button' className={styles.iconBtn} onClick={onCopy}>
            <img src={iconCopy} alt='copy' title='Copy text' />
        </button>
    </>
}

export default CopyButton;