const situacionTributariaArray = [
    "seleccione->",
    "empleado",
    "autonomo",
    "monotributista",
    "freelance",
    "jubilado",
    "otro",
  ];
  const estadoCivilArray = ["seleccione->", "soltero", "casado", "otro"];
  const tarjetaCreditoArray = [
    "seleccione->",
    "visa",
    "mastercard",
    "naranja",
    "cabal",
    "otro",
  ];
const fieldsArrayForm = [
    { id: 1,  fieldId: "nombre", fieldType: "text" , element:"input",placeholder:"",innerHTML:"Nombre",class:""},
    { id: 2,  fieldId: "apellido", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:""},
    { id: 3,  fieldId: "dni", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:""},
    { id: 4,  fieldId: "telefono", fieldType: "number" , element:"input",placeholder:"",innerHTML:"",class:""},
    { id: 5,  fieldId: "direccion", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:""},
    { id: 6,  fieldId: "email", fieldType: "email" , element:"input",placeholder:"",innerHTML:"",class:""},
    { id: 7,  fieldId: "fechaNacimiento", fieldType: "date" , element:"input",placeholder:"",innerHTML:"",class:""},
    { id: 8,  fieldId: "situacionTributaria", fieldType: "text" , element:"select",placeholder:"",innerHTML:"Situacion Tributaria",class:"form-control-sm form-control"},
    { id: 9,  fieldId: "ingresosMensuales", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:""},
    { id: 10,  fieldId: "antiguedad", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:""},
    { id: 11,  fieldId: "estadoCivil", fieldType: "text" , element:"select",placeholder:"",innerHTML:"",class:"form-control-sm form-control"},
    { id: 12,  fieldId: "tarjetaCredito", fieldType: "text" , element:"select",placeholder:"",innerHTML:"",class:"form-control-sm form-control"},
    { id: 13,  fieldId: "ingresosMensualesPareja", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:""},
    { id: 14,  fieldId: "valorProducto", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:"",readonly:"true"},
    { id: 15,  fieldId: "elegirFormaPago", fieldType: "submit" , element:"input",placeholder:"",innerHTML:"",class:"btn btn-primary", value:"Elegir Forma de Pago", onclick:"inputData()"},
   ];
const fieldsArrayElegirFormaPago = [
    { id: 1,  fieldId: "selectCuotas", fieldType: "test" , element:"select",placeholder:"",innerHTML:"",class:"form-control-sm form-control", value:""},
    { id: 2,  fieldId: "montoCuota", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:"", value:"",readonly:"true"},
    { id: 3,  fieldId: "montoConInteres", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:"", value:"",readonly:"true"},
    { id: 4,  fieldId: "solicitar", fieldType: "submit" , element:"input",placeholder:"solicitar",innerHTML:"solicitar",class:"btn btn-primary", value:"Solicitar", onclick:"inputData()"},
];

const arrayOfSmartphones = [
    { id: 1,  cardId: "smartphone1", cardSrc: "/assets/img/portfolio/smartphoneX.jpg" , cardAlt:"", cardTitle:"SmartphoneX", cardText:"Samsung Galaxy S10. 70.000$.-", radioType:"radio", radioId:"radio4", radioValue:"70000"},
    { id: 2,  cardId: "smartphone2", cardSrc: "/assets/img/portfolio/smartphone3.jpg" , cardAlt:"", cardTitle:"Smartphone1", cardText:"Samsung S5 80.000$.-", radioType:"radio", radioId:"radio5", radioValue:"80000"},
    { id: 3,  cardId: "smartphone3", cardSrc: "/assets/img/portfolio/smartphone.jpg" , cardAlt:"", cardTitle:"Smartphone3", cardText:"Samsung S1 S10. 90.000$.-", radioType:"radio", radioId:"radio6", radioValue:"90000"},
];
const arrayOfTecno = [
    { id: 1,  cardId: "accesorio1", cardSrc: "/assets/img/portfolio/smartwatch1.jpg" , cardAlt:"", cardTitle:"Accesorio1", cardText:"Smartwatch Xiaomi Mibro Air Reloj Inteligente 7.000$.-", radioType:"radio", radioId:"radio4", radioValue:"7000"},
    { id: 2,  cardId: "accesorio2", cardSrc: "/assets/img/portfolio/Parlante1.webp" , cardAlt:"", cardTitle:"Accesorio2", cardText:"Parlante Bluetooth JBL 5.000$.-", radioType:"radio", radioId:"radio5", radioValue:"5000"},
    { id: 3,  cardId: "accesorio3", cardSrc: "/assets/img/portfolio/auriculares.jpg" , cardAlt:"", cardTitle:"Accesorio3", cardText:"Auriculares DAUER $4.234 .-", radioType:"radio", radioId:"radio6", radioValue:"4234"},
];
const arrayOfXP = [
    { id: 1,  cardId: "xp1", cardSrc: "/assets/img/portfolio/salta.JPG" , cardAlt:"", cardTitle:"Salta", cardText:"Cerro siete colores Salta 7.000$.-", radioType:"radio", radioId:"radio4", radioValue:"7000"},
    { id: 2,  cardId: "xp2", cardSrc: "/assets/img/portfolio/corrientes.jpg" , cardAlt:"", cardTitle:"Corrientes", cardText:"Estadia playas de Ituzaingó en Corrientes 5.000$.-", radioType:"radio", radioId:"radio5", radioValue:"5000"},
    { id: 3,  cardId: "xp3", cardSrc: "/assets/img/portfolio/chalten.JPG" , cardAlt:"", cardTitle:"Chaltén", cardText:"Caminata guiada Chalten $4.000 .-", radioType:"radio", radioId:"radio6", radioValue:"4000"},
];