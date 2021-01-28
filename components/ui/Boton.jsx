const Boton = ({ text, bg }) => {
  const style = {
    backgroundColor: bg ? '#DA552F' : 'white',
    color: bg ? 'white' : '#000',
  }
  return (
    <div className='boton' style={style}>
      {text}
    </div>
  )
}

export default Boton
