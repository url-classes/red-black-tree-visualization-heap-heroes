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
    const value = parseInt(nodeValueInput.value, 10);
    if (!isNaN(value)) {// Depuración: verifica que el valor se obtenga
        tree.insert(value);
        nodeValueInput.value = '';
        renderTree(); // Actualiza la visualización
    } else {
        console.log("Valor no válido"); // Depuración: alerta si el valor no es válido
    }
});

// Función para limpiar y renderizar el árbol
function renderTree() {
    treeVisualization.innerHTML = ""; // Limpiar visualización anterior
    renderNode(tree.getRoot(), 300, 20, 200); // Llamar función recursiva para mostrar el nodo raíz
}

// Función recursiva para mostrar cada nodo y sus conexiones
function renderNode(node: NodeRBT, x: number, y: number, offset: number) {
    if (node.getData() === 0) return;

    const nodeElement = document.createElement("div");
    nodeElement.classList.add("node", node.getColor().toLowerCase());
    nodeElement.style.left = `${x}px`;
    nodeElement.style.top = `${y}px`;
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

function drawLine(x1: number, y1: number, x2: number, y2: number) {
    const line = document.createElement("div");
    line.classList.add("line");

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    line.style.width = `${length}px`;

    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    line.style.transform = `rotate(${angle}deg)`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;

    treeVisualization.appendChild(line);
}

