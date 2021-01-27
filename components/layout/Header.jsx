import Buscar from '../ui/Buscar'
import Navegacion from './Navegacion'
import Link from 'next/link'
import Boton from '../ui/Boton'

const Header = () => {
  const user = true
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
              <Link href='/'>
                <Boton text='Login' bg='true' />
              </Link>
              <Link href='/'>
                <Boton text='Crear Cuenta' />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
