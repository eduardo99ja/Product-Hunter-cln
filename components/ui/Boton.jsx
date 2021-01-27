const Boton = ({ text, bg }) => {
  const style = {
    backgroundColor: bg ? '#DA552F' : 'white',
    color: bg ? 'white' : '#000',
  }
  return (
    <a className='boton' style={style}>
      {text}
    </a>
  )
}

export default Boton
