import Link from 'next/link'

const Navegacion = () => {
  return (
    <nav className='header__nav'>
      <Link href='/'>Inicio</Link>
      <Link href='/populares'>Populares</Link>
      <Link href='/nuevo-producto'>Nuevo producto</Link>
    </nav>
  )
}

export default Navegacion
