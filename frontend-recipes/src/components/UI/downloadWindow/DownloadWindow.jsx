import s from "./DownloadWindow.module.css";

const DownloadWindow = (onChange) => {
    return (
        <div class={s.modal}>
            <div className={s.spinner}></div>
        </div>
    )
}

export default DownloadWindow;