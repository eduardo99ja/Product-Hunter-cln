import Link from 'next/link'
import { useContext } from 'react'
import { FirebaseContext } from '../../firebase'

const Navegacion = () => {
  const { usuario } = useContext(FirebaseContext)
  return (
    <nav className='header__nav'>
      <Link href='/'>Inicio</Link>
      <Link href='/populares'>Populares</Link>
      {usuario && <Link href='/nuevo-producto'>Nuevo producto</Link>}
    </nav>
  )
}

export default Navegacion
