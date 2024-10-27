import { RBTree } from "./rbt";

const myRBTree: RBTree = new RBTree();
// Inserciones.
myRBTree.insert(9);
myRBTree.insert(12);
myRBTree.insert(20);
myRBTree.insert(30);
myRBTree.insert(25);
myRBTree.printAll();

// Recorridos
console.log("\nRecorrido en Inorden:");
myRBTree.inOrderTraversal();  // Impresión en inorden (orden ascendente).

console.log("\nRecorrido en Preorden:");
myRBTree.preOrderTraversal();  // Impresión en preorden (primero raíz y luego los hijos).

console.log("\nRecorrido en Postorden:");
myRBTree.postOrderTraversal();  // Impresión en postorden (primero los hijos y luego la raíz).
console.log("\n");
// Búsqueda
console.log(myRBTree.searchNode(15)); // Nodo buscado.

myRBTree.delete(25);
myRBTree.printAll();