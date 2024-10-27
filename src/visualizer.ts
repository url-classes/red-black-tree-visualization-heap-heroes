import { RBTree } from "./rbt";
import { NodeRBT } from "./node_rbt";

const tree = new RBTree();

// Obtener elementos del DOM
const insertButton = document.getElementById("insert-button") as HTMLButtonElement;
const nodeValueInput = document.getElementById("node-value") as HTMLInputElement;
const treeVisualization = document.getElementById("tree-visualization") as HTMLDivElement;
const nodeInfo = document.getElementById("node-info") as HTMLDivElement;

// Función para insertar un nodo y actualizar la visualización
insertButton.addEventListener("click", () => {
    const value = parseInt(nodeValueInput.value);
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
function renderNode(node: NodeRBT, x: number, y: number, offset: number) {
    if (node.getData() === 0) return; // Caso base: nodo hoja vacío

    // Crear elemento para el nodo
    const nodeElement = document.createElement("div");
    nodeElement.classList.add("node");
    nodeElement.classList.add(node.getColor().toLowerCase()); // Agregar clase 'red' o 'black' según el color
    nodeElement.style.left = `${x}px`;
    nodeElement.style.top = `${y}px`;
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
