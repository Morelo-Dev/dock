import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, ButtonDock } from '@deandre-dock/buttons';
import { STUDENTS, SUBJECTS } from '../../entities/student/model/mockData';
import styles from './Gradebook.module.css';
const SaveIcon = () => (_jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }), _jsx("polyline", { points: "17 21 17 13 7 13 7 21" }), _jsx("polyline", { points: "7 3 7 8 15 8" })] }));
const ExportIcon = () => (_jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), _jsx("polyline", { points: "17 8 12 3 7 8" }), _jsx("line", { x1: "12", y1: "3", x2: "12", y2: "15" })] }));
const FilterIcon = () => (_jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }));
const PrintIcon = () => (_jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("polyline", { points: "6 9 6 2 18 2 18 9" }), _jsx("path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }), _jsx("rect", { x: "6", y: "14", width: "12", height: "8" })] }));
function gradeColor(grade) {
    if (grade === null)
        return '#94a3b8';
    if (grade >= 9)
        return '#15803d';
    if (grade >= 7)
        return '#0f172a';
    if (grade >= 5)
        return '#b45309';
    return '#dc2626';
}
function average(student) {
    const vals = Object.values(student.grades).filter((v) => v !== null);
    if (!vals.length)
        return '—';
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
}
export function GradebookPage() {
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    function handleSave() {
        setSaving(true);
        setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000); }, 1000);
    }
    return (_jsxs("div", { className: styles.page, children: [_jsxs("div", { className: styles.toolbar, children: [_jsxs("div", { children: [_jsx("h1", { className: styles.title, children: "Planilla de Calificaciones" }), _jsxs("p", { className: styles.subtitle, children: ["Grado 8\u00B0 \u2014 Per\u00EDodo 2 \u00B7 ", STUDENTS.length, " estudiantes \u00B7 ", SUBJECTS.length, " materias"] })] }), _jsxs(ButtonDock, { showMode: true, children: [_jsx(Button, { variant: "ghost", leftIcon: _jsx(FilterIcon, {}), size: "sm", children: "Filtrar" }), _jsx(Button, { variant: "secondary", leftIcon: _jsx(ExportIcon, {}), size: "sm", children: "Exportar" }), _jsx(Button, { variant: "ghost", leftIcon: _jsx(PrintIcon, {}), size: "sm", children: "Imprimir" }), _jsx(Button, { variant: "primary", leftIcon: _jsx(SaveIcon, {}), size: "sm", loading: saving, onClick: handleSave, children: saved ? '¡Guardado!' : 'Guardar' })] })] }), _jsx("div", { className: styles.hint, children: "\u261D Arrastra el handle de la barra de acciones para moverla. Usa el bot\u00F3n \uD83C\uDFE0 o su\u00E9ltala en su lugar reservado para volver." }), _jsx("div", { className: styles.tableWrapper, children: _jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: styles.stickyCol, children: "#" }), _jsx("th", { className: styles.stickyCol2, children: "Estudiante" }), SUBJECTS.map((s) => (_jsx("th", { title: s.name, children: s.shortName }, s.id))), _jsx("th", { className: styles.avgCol, children: "Prom." })] }) }), _jsx("tbody", { children: STUDENTS.map((student, i) => (_jsxs("tr", { className: i % 2 === 0 ? styles.even : '', children: [_jsx("td", { className: styles.stickyCol, style: { color: '#94a3b8', fontSize: '0.75rem' }, children: i + 1 }), _jsx("td", { className: styles.stickyCol2, children: student.name }), SUBJECTS.map((s) => {
                                        const g = student.grades[s.id] ?? null;
                                        return (_jsx("td", { style: { color: gradeColor(g), fontWeight: g !== null && g < 5 ? 600 : 400 }, children: g ?? '—' }, s.id));
                                    }), _jsx("td", { className: styles.avgCol, children: average(student) })] }, student.id))) })] }) })] }));
}
//# sourceMappingURL=index.js.map