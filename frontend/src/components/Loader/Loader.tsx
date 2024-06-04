import styles from './loader.module.scss';

const Loading: React.FC = () => {
    return (
        <div className={styles.root}>
            <span className={styles.loader}></span>
        </div>
    );
};

export default Loading;
