import styles from "./Logo.module.css";
import logo from "../../assets/logo.svg"

const Logo = () => {
    return <div className={styles.logo}>
        <a href="#" className={styles.logoLink}>
            <img className={styles.logoImg} src={logo} alt="translated.io" title="translated.io" />
        </a>
    </div>
}

export default Logo;