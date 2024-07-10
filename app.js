// app.js
require('colors');
const { guardarDb,leerDb} = require('./Helpers/GuardarInfo');
const { inquirerMenu, ingresarInformacion, pausa, buscarContacto, listadoContactosBorrar, confirmar} = require('./helpers/inquirer');
const Contactos = require('./models/Contactos');

const main = async () => {
    let opt = '';
    const contactos = new Contactos();
    const contactosDb = leerDb();
    if (contactosDb) {
        contactos.cargarContactosFromArray(contactosDb);
    }
    do {
      opt = await inquirerMenu();
  
      switch (opt) {
        case '1':
          const { nombre, numero, correo } = await ingresarInformacion();
          contactos.crearContacto(nombre, numero, correo);
          console.log('Contacto agregado'.green);
          break;
        case '2':
          console.log('Listar contactos'.blue);
          contactos.mostrarContactos();
          break;
        case '3':
          console.log('Buscar contacto');
          const contactoEncontrado = await buscarContacto(contactos);
          if (contactoEncontrado) {
            console.log(`Contacto encontrado: ${contactoEncontrado.nombre}`);
          } else {
            console.log("No se encontró ningún contacto con ese número de teléfono.");
          }
          break;
        case '4':
          const contactoAEditar=await buscarContacto(contactos);
          if (contactoAEditar) {
              const nuevosDatos=await ingresarInformacion();
              contactos.editarContacto(contactoAEditar.numero,nuevosDatos);
          } else {
            console.log("No se encontró ningún contacto con ese número de teléfono.".red);
          }
          console.log('Editar contacto');
          break;
        case '5':
          console.log('Eliminar contacto');
          const num = await listadoContactosBorrar(contactos.listadoArr);
          if (num !== '0') {
            const confir =await confirmar(
              "Estas seguro de que deseas eliminar esta contacto?"
            );
            if (confir) {
              contactos.borrarContacto(num);
              console.log("Tarea borrada correctamente");
            }
          }
          break;
      }
      
      guardarDb(contactos.listadoArr);
  
      if (opt !== '0') {
        await pausa();
      }
    } while (opt !== '0');
  };
  
  main();