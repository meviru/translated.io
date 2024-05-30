import styles from "./CardBody.module.css";

const CardBody = ({ translate, setTranslate }) => {
    return <>
        <div className={styles.cardBody}>
            <textarea value={translate} maxLength={500} className={styles.inputItem} onChange={(e) => setTranslate(e.target.value)} />
        </div>
    </>
}

export default CardBody;