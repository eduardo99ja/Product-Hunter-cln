import { useState, useContext } from 'react'
import Router, { useRouter } from 'next/router'
import FileUploader from 'react-firebase-file-uploader'

import Layout from '../components/layout/Layout'

import { FirebaseContext } from '../firebase'
//validacaiones
import useValidation from '../hooks/useValidation'
import validarCrearProducto from '../validacion/validarCrearProducto'
import Error404 from '../components/layout/Error404'

const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  imagen: '',
  url: '',
  descripcion: '',
}

export default function NuevoProducto() {
  //? state de las imagenes
  const [nombreimagen, guardarNombre] = useState('')
  const [subiendo, guardarSubiendo] = useState(false)
  const [progreso, guardarProgreso] = useState(0)
  const [urlimagen, guardarUrlImagen] = useState('')

  const [error, setError] = useState(false)
  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(STATE_INICIAL, validarCrearProducto, crearProducto)

  const { nombre, empresa, imagen, url, descripcion } = valores
  //hook de routing para redireccionar
  const router = useRouter()

  //context con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext)
  async function crearProducto() {
    //si el usuario no esta autenticado
    if (!usuario) {
      return router.push('login')
    }

    //crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
      },
    }
    //insertarlo en la bd
    firebase.db.collection('productos').add(producto)

    return router.push('/')
  }
  const handleUploadStart = () => {
    guardarProgreso(0)
    guardarSubiendo(true)
  }

  const handleProgress = (progreso, task) => {
    if (progreso === 100) {
      handleUploadSuccess(task.snapshot.ref.name)
    }
    guardarProgreso(progreso)
  }

  const handleUploadError = error => {
    guardarSubiendo(error)
    console.error(error)
  }

  const handleUploadSuccess = async nombre => {
    guardarProgreso(100)
    guardarSubiendo(false)
    guardarNombre(nombre)
    await firebase.storage
      .ref('productos')
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        guardarUrlImagen(url)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <Layout>
        {!usuario ? (
          <Error404 />
        ) : (
          <>
            <h1 className='title_crear_cuenta'>Nuevo producto</h1>
            <form className='formulario' onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>Información general</legend>

                <div className='campo'>
                  <label htmlFor='nombre'>Nombre</label>
                  <input
                    type='text'
                    id='nombre'
                    placeholder='Tu nombre'
                    name='nombre'
                    value={nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errores.nombre && <p className='error'>{errores.nombre}</p>}

                <div className='campo'>
                  <label htmlFor='nombre'>Empresa</label>
                  <input
                    type='text'
                    id='empresa'
                    placeholder='Nombre de la empresa o compañia'
                    name='empresa'
                    value={empresa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errores.empresa && <p className='error'>{errores.empresa}</p>}

                <div className='campo'>
                  <label htmlFor='imagen'>Imagen</label>
                  <FileUploader
                    accept='image/*'
                    id='imagen'
                    name='imagen'
                    randomizeFilename
                    storageRef={firebase.storage.ref('productos')}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    // onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </div>

                <div className='campo'>
                  <label htmlFor='url'>Url</label>
                  <input
                    type='url'
                    id='url'
                    placeholder='Url de tu producto'
                    name='url'
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errores.url && <p className='error'>{errores.url}</p>}
              </fieldset>
              <fieldset>
                <legend>Sobre tu producto</legend>
                <div className='campo'>
                  <label htmlFor='descripcion'>Descripcion</label>
                  <textarea
                    id='descripcion'
                    placeholder=''
                    name='descripcion'
                    value={descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errores.descripcion && (
                  <p className='error'>{errores.descripcion}</p>
                )}
              </fieldset>

              {error && <p className='error'>{error}</p>}

              <input
                type='submit'
                value='Crear producto'
                className='inputSubmit'
              />
            </form>
          </>
        )}
      </Layout>
    </div>
  )
}
