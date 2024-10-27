import { RBTree } from "./rbt";

const tree = new RBTree();

// Obtener elementos del DOM
const insertButton = document.getElementById("insert-button") as HTMLButtonElement;
const searchButton = document.getElementById("search-button") as HTMLButtonElement;
const inorderButton = document.getElementById("inorder-button") as HTMLButtonElement;
const preorderButton = document.getElementById("preorder-button") as HTMLButtonElement;
const postorderButton = document.getElementById("postorder-button") as HTMLButtonElement;
const nodeValueInput = document.getElementById("node-value") as HTMLInputElement;
const nodeInfo = document.getElementById("node-info") as HTMLDivElement;

// Función para insertar un nodo
insertButton.addEventListener("click", () => {
    const value = parseInt(nodeValueInput.value);
    if (!isNaN(value)) {
        tree.insert(value);
        nodeValueInput.value = "";
        displayTree();
    }
});

// Función para buscar un nodo
searchButton.addEventListener("click", () => {
    const value = parseInt(nodeValueInput.value);
    const result = tree.searchNode(value);
    nodeInfo.textContent = result;
});

// Funciones para realizar recorridos
inorderButton.addEventListener("click", () => {
    tree.inOrderTraversal();
});

preorderButton.addEventListener("click", () => {
    tree.preOrderTraversal();
});

postorderButton.addEventListener("click", () => {
    tree.postOrderTraversal();
});

// Función para visualizar el árbol
function displayTree() {
    console.log("Visualización del árbol:");
    tree.printAll();
}
