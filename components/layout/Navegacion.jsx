import Link from 'next/link'

const Navegacion = () => {
  return (
    <nav className='header__nav'>
      <Link href='/'>Inicio</Link>
      <Link href='/'>Populares</Link>
      <Link href='/'>Nuevo producto</Link>
    </nav>
  )
}

export default Navegacion
