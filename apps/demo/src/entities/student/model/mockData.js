export const SUBJECTS = [
    { id: 'mat', name: 'Matemáticas', shortName: 'Mat' },
    { id: 'esp', name: 'Español', shortName: 'Esp' },
    { id: 'cien', name: 'Ciencias', shortName: 'Cien' },
    { id: 'hist', name: 'Historia', shortName: 'Hist' },
    { id: 'geo', name: 'Geografía', shortName: 'Geo' },
    { id: 'ing', name: 'Inglés', shortName: 'Ing' },
    { id: 'arte', name: 'Arte', shortName: 'Arte' },
    { id: 'ef', name: 'Ed. Física', shortName: 'EF' },
    { id: 'tec', name: 'Tecnología', shortName: 'Tec' },
    { id: 'mus', name: 'Música', shortName: 'Mús' },
];
const NAMES = [
    'Valentina Torres', 'Sebastián Ramírez', 'Isabella Gómez', 'Mateo López', 'Sofía Martínez',
    'Samuel Herrera', 'Lucía Díaz', 'Daniel Vargas', 'Camila Jiménez', 'Andrés Moreno',
    'Mariana Castro', 'Juan Rodríguez', 'Valeria Romero', 'Diego Álvarez', 'Ana García',
    'Miguel Pérez', 'Laura Sánchez', 'Carlos González', 'Natalia Reyes', 'Alejandro Cruz',
    'Paula Ortega', 'Julián Navarro', 'Adriana Flores', 'Esteban Ramos', 'Gabriela Mendez',
    'Nicolás Suárez', 'Sara Paredes', 'Tomás Ríos', 'Fernanda Luna', 'Ricardo Mora',
];
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const STUDENTS = NAMES.map((name, i) => ({
    id: `s${i + 1}`,
    name,
    grades: Object.fromEntries(SUBJECTS.map((s) => [s.id, Math.random() > 0.08 ? rand(1, 10) : null])),
}));
//# sourceMappingURL=mockData.js.map