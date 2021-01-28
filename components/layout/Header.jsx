import Buscar from '../ui/Buscar'
import Navegacion from './Navegacion'
import Link from 'next/link'
import Boton from '../ui/Boton'

const Header = () => {
  const user = false
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
              <p>Hola: Apodaca</p>
              <Boton text='Cerrar sesion' bg='true' />
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
