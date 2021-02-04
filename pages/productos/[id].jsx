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
    if (id && consultarDB) {
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

  //administrar y validar los votos
  const votarProducto = () => {
    if (!usuario) {
      return router.push('/login')
    }

    // obtener y sumar un nuevo voto
    const nuevoTotal = votos + 1

    // Verificar si el usuario actual ha votado
    if (haVotado.includes(usuario.uid)) return

    // guardar el ID del usuario que ha votado
    const nuevoHaVotado = [...haVotado, usuario.uid]

    //  Actualizar en la BD
    firebase.db.collection('productos').doc(id).update({
      votos: nuevoTotal,
      haVotado: nuevoHaVotado,
    })

    // Actualizar el state
    guardarProducto({
      ...producto,
      votos: nuevoTotal,
    })

    guardarConsultarDB(true) // hay un voto, por lo tanto consultar a la BD
  }

  //funciones para crear comentarios

  const comentarioChange = e => {
    guardarComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    })
  }
  // Identifica si el comentario es del creador del producto
  const esCreador = id => {
    if (creador.id == id) {
      return true
    }
  }

  const agregarComentario = e => {
    e.preventDefault()

    if (!usuario) {
      return router.push('/login')
    }

    // información extra al comentario
    comentario.usuarioId = usuario.uid
    comentario.usuarioNombre = usuario.displayName

    // Tomar copia de comentarios y agregarlos al arreglo
    const nuevosComentarios = [...comentarios, comentario]

    // Actualizar la BD
    firebase.db.collection('productos').doc(id).update({
      comentarios: nuevosComentarios,
    })

    // Actualizar el state
    guardarProducto({
      ...producto,
      comentarios: nuevosComentarios,
    })

    guardarConsultarDB(true) // hay un COMENTARIO, por lo tanto consultar a la BD
  }
  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
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
                {usuario && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form onSubmit={agregarComentario}>
                      <div className='campo'>
                        <input
                          type='text'
                          name='mensaje'
                          onChange={comentarioChange}
                        />
                      </div>
                      <input
                        className='inputSubmit'
                        type='submit'
                        value='Agregar Comentario'
                      />
                    </form>
                  </>
                )}
                <h2 className='comentarios'>Comentarios</h2>
                {comentarios.lenght === 0 ? (
                  'Aun no hay comentarios'
                ) : (
                  <ul>
                    {comentarios.map((comentario, i) => (
                      <li
                        key={`${comentario.usuarioId}-${i}`}
                        className='comentario'
                      >
                        <p>{comentario.mensaje}</p>
                        <p>
                          Escrito por:
                          <span className='comentario-usuario'>
                            {comentario.usuarioNombre}
                          </span>
                        </p>
                        {esCreador(comentario.usuarioId) && (
                          <p className='creador-producto'>Es creador</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <aside>
                <a href={url} target='_blank'>
                  <Boton text='Visitar url' bg='true' />
                </a>

                <p>{votos} votos</p>
                {usuario && <Boton text='votar' onClick={votarProducto} />}
              </aside>
            </div>
          </div>
        )}
      </>
    </Layout>
  )
}

export default Producto
