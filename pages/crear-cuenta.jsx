import Layout from '../components/layout/Layout'

export default function CrearCuenta() {
  return (
    <div>
      <Layout>
        <>
          <h1 className='title_crear_cuenta'>Crear cuenta</h1>
          <form className='formulario'>
            <div className='campo'>
              <label htmlFor='nombre'>Nombre</label>
              <input
                type='text'
                id='nombre'
                placeholder='Tu nombre'
                name='nombre'
              />
            </div>
            <div className='campo'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                placeholder='Tu email'
                name='email'
              />
            </div>
            <div className='campo'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Tu password'
                name='password'
              />
            </div>
            <input type='submit' value='Crear cuenta' className='inputSubmit' />
          </form>
        </>
      </Layout>
    </div>
  )
}
