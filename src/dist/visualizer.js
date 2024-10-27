"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rbt_1 = require("./rbt");
var tree = new rbt_1.RBTree();
// Obtener elementos del DOM
var insertButton = document.getElementById("insert-button");
var nodeValueInput = document.getElementById("node-value");
var treeVisualization = document.getElementById("tree-visualization");
var nodeInfo = document.getElementById("node-info");
// Función para insertar un nodo y actualizar la visualización
insertButton.addEventListener("click", function () {
    var value = parseInt(nodeValueInput.value);
    if (!isNaN(value)) {
        console.log("Valor insertado:", value); // Depuración: verifica que el valor se obtenga
        tree.insert(value);
        nodeValueInput.value = "";
        renderTree(); // Actualiza la visualización
    }
    else {
        console.log("Valor no válido"); // Depuración: alerta si el valor no es válido
    }
});
// Función para limpiar y renderizar el árbol
function renderTree() {
    treeVisualization.innerHTML = ""; // Limpiar visualización anterior
    renderNode(tree.getRoot(), 300, 20, 200); // Llamar función recursiva para mostrar el nodo raíz
}
// Función recursiva para mostrar cada nodo y sus conexiones
function renderNode(node, x, y, offset) {
    if (node.getData() === 0)
        return;
    var nodeElement = document.createElement("div");
    nodeElement.classList.add("node", node.getColor().toLowerCase());
    nodeElement.style.left = "".concat(x, "px");
    nodeElement.style.top = "".concat(y, "px");
    nodeElement.textContent = node.getData().toString();
    treeVisualization.appendChild(nodeElement);
    if (node.getLeftChild() && node.getLeftChild().getData() !== 0) {
        drawLine(x, y, x - offset, y + 60);
        renderNode(node.getLeftChild(), x - offset, y + 60, offset / 2);
    }
    if (node.getRightChild() && node.getRightChild().getData() !== 0) {
        drawLine(x, y, x + offset, y + 60);
        renderNode(node.getRightChild(), x + offset, y + 60, offset / 2);
    }
}
function drawLine(x1, y1, x2, y2) {
    var line = document.createElement("div");
    line.classList.add("line");
    var length = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    line.style.width = "".concat(length, "px");
    var angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    line.style.transform = "rotate(".concat(angle, "deg)");
    line.style.left = "".concat(x1, "px");
    line.style.top = "".concat(y1, "px");
    treeVisualization.appendChild(line);
}
