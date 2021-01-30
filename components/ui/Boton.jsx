import { useContext } from 'react'
import { FirebaseContext } from '../../firebase'

const Boton = ({ text, bg, onClick }) => {
  const style = {
    backgroundColor: bg ? '#DA552F' : 'white',
    color: bg ? 'white' : '#000',
  }
  return (
    <div className='boton' style={style} onClick={onClick}>
      {text}
    </div>
  )
}

export default Boton
