import Link from 'next/link'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'

const DetallesProducto = ({ producto }) => {
  const {
    id,
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    urlimagen,
    votos,
  } = producto
  return (
    <li className='producto'>
      <div className='descripcionProducto'>
        <div>
          <img className='imagen' src={urlimagen} alt={nombre} />
        </div>
        <div>
          <Link href='/productos/[id]' as={`/productos/${id}`}>
            <h1 className='titulo'>{nombre}</h1>
          </Link>
          <p className='textoDescripcion'>{descripcion}</p>
          <div className='comentarios'>
            <div>
              <img src='/static/img/comentario.png' />
              <p>{comentarios.length} Comentarios</p>
            </div>
          </div>
          <p>
            Publicado hace:{' '}
            {formatDistanceToNow(new Date(creado), { locale: es })}{' '}
          </p>
        </div>
      </div>
      <div className='votos'>
        <div> &#9650; </div>
        <p>{votos}</p>
      </div>
    </li>
  )
}

export default DetallesProducto
