import style from './NotFound.module.scss';

const index = () => {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <h1 className={style.title}>404 - Страница не найдена</h1>
                <p className={style.message}>Извините, запрошенная вами страница не существует.</p>
            </div>
        </div>
    );
};

export default index
