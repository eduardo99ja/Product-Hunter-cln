import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FirebaseContext } from '../../firebase'
import Error404 from '../../components/layout/Error404'
import Layout from '../../components/layout/Layout'

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

  return (
    <Layout>
      <>
      {error && <Error404 />}
      <h1>desde {id}</h1>
      </>
    </Layout>
  )
}

export default Producto
