import Cart from '../components/Item/Cart'
import style from '../../App.module.scss';

const index = () => {
  return (
    <section className={style.pageProduct}>
      <Cart />
    </section>
  )
}

export default index