import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FirebaseContext } from '../../firebase'
import Error404 from '../../components/layout/Error404'
import Layout from '../../components/layout/Layout'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import Boton from '../../components/ui/Boton'

const Producto = () => {
  //state del componente

  const [producto, guardarProducto] = useState({})
  const [error, guardarError] = useState(false)
  const [comentario, guardarComentario] = useState({})
  const [consultarDB, guardarConsultarDB] = useState(true)

  //Routing para obtener el id actual

  // Routing para obtener el id actual
  const router = useRouter()
  const {
    query: { id },
  } = router
  // context de firebase
  const { firebase, usuario } = useContext(FirebaseContext)

  useEffect(() => {
    if (id) {
      const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection('productos').doc(id)
        const producto = await productoQuery.get()
        if (producto.exists) {
          guardarProducto(producto.data())
          guardarConsultarDB(false)
        } else {
          guardarError(true)
          guardarConsultarDB(false)
        }
      }
      obtenerProducto()
    }
  }, [id])
  if (Object.keys(producto).length === 0 && !error) return 'Cargando...'
  const {
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    urlimagen,
    votos,
    creador,
    haVotado,
  } = producto
  return (
    <Layout>
      <>
        {error && <Error404 />}
        <div className='contenedor'>
          <h1 className='nombre-producto'>{nombre}</h1>
          <div className='contenedor-producto'>
            <div>
              <p>
                Publicado hace:{' '}
                {formatDistanceToNow(new Date(creado), { locale: es })}{' '}
              </p>
              <p>
                Por {creador.nombre} de {empresa}
              </p>

              <img src={urlimagen} />
              <p>{descripcion}</p>
              <h2>Agrega tu comentario</h2>
              <form>
                <div className='campo'>
                  <input type='text' name='mensaje' />
                </div>
                <input
                  className='inputSubmit'
                  type='submit'
                  value='Agregar Comentario'
                />
              </form>
              <h2 className='comentarios'>Comentarios</h2>
              {comentarios.map(comentario => (
                <li>
                  <p>{comentario.nombre}</p>
                  <p>Escrito por: {comentario.usuario}</p>
                </li>
              ))}
            </div>
            <aside>
              <Boton text='Visitar url' bg='true' target='true' href={url} />

              <p>{votos} votos</p>
              <Boton text='votar' />
            </aside>
          </div>
        </div>
      </>
    </Layout>
  )
}

export default Producto
