import styles from "./CardBody.module.css";

const CardBody = ({ text, setText }) => {
    return <>
        <div className={styles.cardBody}>
            <textarea value={text} maxLength={500} className={styles.inputItem} onChange={(e) => setText(e.target.value)} />
        </div>
    </>
}

export default CardBody;