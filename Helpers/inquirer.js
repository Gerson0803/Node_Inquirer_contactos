require("colors");

const inquirer = async () => {
  const inquirerModule = await import("inquirer");
  return inquirerModule.default;
};

const opcionesMenu = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué deseas hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Agregar contacto`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar contactos`,
      },
      {
        value: "3",
        name: `${"3.".green} Buscar contacto`,
      },
      {
        value: "4",
        name: `${"4.".green} Editar contacto`,
      },
      {
        value: "5",
        name: `${"5.".green} Eliminar contacto`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];
const pausa = async () => {
  const inquirerInstance = await inquirer();
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  await inquirerInstance.prompt(question);
};
const ingresarInformacion = async () => {
  const inquirerInstance = await inquirer();
  const preguntas = [
    {
      type: "input",
      name: "nombre",
      message: "Escribe tu nombre:",
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingresa tu nombre.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "numero",
      message: "Escribe tu teléfono:",
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingresa tu teléfono.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "correo",
      message: "Escribe tu correo:",
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingresa tu correo.";
        }
        return true;
      },
    },
  ];
  const { nombre, numero, correo } = await inquirerInstance.prompt(preguntas);
  return { nombre, numero, correo };
};
const inquirerMenu = async () => {
  console.clear();
  console.log("=================================".green);
  console.log("Seleccione una opción".blue);
  console.log("=================================\n".green);

  const inquirerInstance = await inquirer();
  const { opcion } = await inquirerInstance.prompt(opcionesMenu);
  return opcion;
};
const confirmar = async () => {
  const inquirerInstance = await inquirer(); // Obtener la instancia de inquirer
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message: '¿Estás seguro?',
    },
  ];
  const { ok } = await inquirerInstance.prompt(question);
  return ok;
};


confirmar().then((respuesta) => {
  console.log(`Confirmación: ${respuesta}`);
});

const listadoContactosBorrar = async (contactos = []) => {
  if (!Array.isArray(contactos)) {
    console.error('Error: contactos debe ser un array');
    return;
  }

  const choices = contactos.map((contacto, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: contacto.numero,
      name: `${idx} ${contacto.nombre}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0'.green + ' cancelar',
  });

  const preguntas = [
    {
      type: 'list',
      name: 'numero',
      message: 'Selecciona el contacto a borrar',
      choices,
    },
  ];

  const inquirerInstance = await inquirer();
  const { numero } = await inquirerInstance.prompt(preguntas);
  return numero;
};

const buscarContacto = async (contactos) => {
  const busquedaTelefono = [
    {
      type: "input",
      name: "telefono",
      message: "Ingresa el número de teléfono:",
      validate(value) {
        const valid = /^\d{9}$/.test(value);
        return (
          valid ||
          "Por favor ingresa un número de teléfono válido (9 dígitos numéricos)."
        );
      },
      filter(value) {
        return value.trim();
      },
    },
  ];
 
  const inquirerInstance = await inquirer();
  const respuesta = await inquirerInstance.prompt(busquedaTelefono);
  const { telefono } = respuesta;
  
  const contacto = contactos.buscarContacto(telefono);
  return contacto;
};


module.exports = { inquirerMenu, ingresarInformacion, pausa,buscarContacto,listadoContactosBorrar,confirmar };
