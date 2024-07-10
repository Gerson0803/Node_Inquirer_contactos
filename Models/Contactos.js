// Contactos.js
const Contacto = require("./Contacto");

class Contactos {
  _listadoContact = {};
  
  constructor() {
    this._listadoContact = {}; 
  }

  get listadoArr() {
    const listado = [];
    Object.keys(this._listadoContact).forEach((key) => {
      const contacto = this._listadoContact[key]; 
      listado.push(contacto);
    });
    return listado;
  }
  editarContacto(numero, nuevosDatos) {
    const contacto = this.buscarContacto(numero);
    if (contacto) {
      this._listadoContact[numero] = { ...contacto, ...nuevosDatos };
    }
    return contacto;
  }
  buscarContacto(numero) {
    return this.listadoArr.find(contacto => contacto.numero === numero);
  }
  borrarContacto(numero=''){
    if(this._listadoContact[numero]){
        delete this._listadoContact[numero];
    }
}
  crearContacto(nombre = "", numero = "", correo = "") {
    const id = new Date().getTime().toString();
    const contacto = new Contacto(id, nombre, numero, correo);

    this._listadoContact[id] = contacto;
  }

  

  mostrarContactos() {
    console.log("Listado de contactos:");
    this.listadoArr.forEach((contacto) => {
      const { id, nombre, numero, correo } = contacto;
      console.log(`id=${id}. Nombre: ${nombre}, Número: ${numero}, Correo: ${correo}`);
    });
  }

  cargarContactosFromArray(contactos = []) {
    contactos.forEach(contacto => {
      this._listadoContact[contacto.numero] = contacto;
    });
  }
}

module.exports = Contactos;





