import Buscar from '../ui/Buscar'
import Navegacion from './Navegacion'
import Link from 'next/link'
import Boton from '../ui/Boton'
import { useContext } from 'react'
import { FirebaseContext } from '../../firebase'

const Header = () => {
  const { usuario: user, firebase } = useContext(FirebaseContext)
  return (
    <header>
      <div className='contenedor-header'>
        <div className='botones'>
          <Link href='/'>
            <p className='logo'>P</p>
          </Link>
          <Buscar />

          <Navegacion />
        </div>
        <div className='botones'>
          {user ? (
            <>
              <p>Hola: {user.displayName}</p>
              <Boton
                text='Cerrar sesion'
                bg='true'
                onClick={() => firebase.cerrarSesion()}
              />
            </>
          ) : (
            <>
              <Link href='/login'>
                <a>
                  <Boton text='Login' bg='true' />
                </a>
              </Link>
              <Link href='/crear-cuenta'>
                <a>
                  <Boton text='Crear Cuenta'>as</Boton>
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
