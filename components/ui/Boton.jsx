import { useContext } from 'react'
import { FirebaseContext } from '../../firebase'

const Boton = ({ text, bg, onClick,target,href }) => {
  const style = {
    backgroundColor: bg ? '#DA552F' : 'white',
    color: bg ? 'white' : '#000',
  }
  return (
    <a className='boton' style={style} onClick={onClick} target={ target && '_blank'} href={href && href}>
      {text}
    </a>
  )
}

export default Boton
