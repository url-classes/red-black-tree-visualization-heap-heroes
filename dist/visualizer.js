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
        tree.insert(value);
        nodeValueInput.value = "";
        renderTree();
    }
});
// Función para limpiar y renderizar el árbol
function renderTree() {
    treeVisualization.innerHTML = ""; // Limpiar visualización anterior
    renderNode(tree.getRoot(), 50, 20, 200); // Llamar función recursiva para mostrar el nodo raíz
}
// Función recursiva para mostrar cada nodo en la posición adecuada
function renderNode(node, x, y, offset) {
    if (node.getData() === 0)
        return; // Caso base: nodo hoja vacío
    // Crear elemento para el nodo
    var nodeElement = document.createElement("div");
    nodeElement.classList.add("node");
    nodeElement.classList.add(node.getColor().toLowerCase()); // Agregar clase 'red' o 'black' según el color
    nodeElement.style.left = "".concat(x, "px");
    nodeElement.style.top = "".concat(y, "px");
    nodeElement.textContent = node.getData().toString();
    treeVisualization.appendChild(nodeElement);
    // Recursión para los hijos izquierdo y derecho
    if (node.getLeftChild() && node.getLeftChild().getData() !== 0) {
        renderNode(node.getLeftChild(), x - offset, y + 60, offset / 2);
    }
    if (node.getRightChild() && node.getRightChild().getData() !== 0) {
        renderNode(node.getRightChild(), x + offset, y + 60, offset / 2);
    }
}
