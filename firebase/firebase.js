import app from 'firebase/app'
import firebaseConfig from './config'

class Firebase {
  //Cuando se instancia Firebase, se inicia la app de firebase
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig)
      
    }
  }
}

const firebase = new Firebase()
export default firebase
