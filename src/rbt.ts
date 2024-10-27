import { NodeRBT } from "./node_rbt";

export class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;

    constructor() {
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
    }

    public getRoot(): NodeRBT {
        return this.root;
    }

    private fixDelete(node: NodeRBT): void {
        while (node !== this.root && node.getColor() === "BLACK") {
            if (node === node.getFather().getLeftChild()) {
                let sibling: NodeRBT = node.getFather().getRightChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    node.getFather().setNodeAsRed();
                    this.leftRotate(node.getFather());
                    sibling = node.getFather().getRightChild();
                }
                if (sibling.getLeftChild().getColor() === "BLACK" && sibling.getRightChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    node = node.getFather();
                } else {
                    if (sibling.getRightChild().getColor() === "BLACK") {
                        sibling.getLeftChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.rightRotate(sibling);
                        sibling = node.getFather().getRightChild();
                    }
                    node.setColor(node.getFather().getColor())
                    node.getFather().setNodeAsBlack();
                    sibling.getRightChild().setNodeAsBlack();
                    this.leftRotate(node.getFather());
                    node = this.root;
                }
            } else {
                let sibling: NodeRBT = node.getFather().getLeftChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    node.getFather().setNodeAsRed();
                    this.rightRotate(node.getFather());
                    sibling = node.getFather().getLeftChild();
                }
                if (sibling.getRightChild().getColor() === "BLACK" && sibling.getLeftChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    node = node.getFather();
                } else {
                    if (sibling.getLeftChild().getColor() === "BLACK") {
                        sibling.getRightChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.leftRotate(sibling);
                        sibling = node.getFather().getLeftChild();
                    }
                    node.setColor(node.getFather().getColor())
                    node.getFather().setNodeAsBlack();
                    sibling.getLeftChild().setNodeAsBlack();
                    this.rightRotate(node.getFather());
                    node = this.root;
                }
            }
        }
        node.setNodeAsBlack();
    }

    private transplant(u: NodeRBT, v: NodeRBT): void {
        if (u.getFather() === this.leaf) {
            this.root = v;
        } else if (u === u.getFather().getLeftChild()) {
            u.getFather().setLeftChild(v);
        } else {
            u.getFather().setRightChild(v);
        }
        v.setFather(u.getFather());
    }

    public delete(data: number): void {
        let nodeToDelete: NodeRBT = this.search(data);
        if (nodeToDelete === this.leaf) {
            console.log("El nodo no existe.");
            return;
        }

        let y: NodeRBT = nodeToDelete;
        let yOriginalColor: string = y.getColor();
        let x: NodeRBT;

        if (nodeToDelete.getLeftChild() === this.leaf) {
            x = nodeToDelete.getRightChild();
            this.transplant(nodeToDelete, nodeToDelete.getRightChild());
        } else if (nodeToDelete.getRightChild() === this.leaf) {
            x = nodeToDelete.getLeftChild();
            this.transplant(nodeToDelete, nodeToDelete.getLeftChild());
        } else {
            y = this.minimum(nodeToDelete.getRightChild());
            yOriginalColor = y.getColor();
            x = y.getRightChild();
            if (y.getFather() === nodeToDelete) {
                x.setFather(y);
            } else {
                this.transplant(y, y.getRightChild());
                y.setRightChild(nodeToDelete.getRightChild());
                y.getRightChild().setFather(y);
            }
            this.transplant(nodeToDelete, y);
            y.setLeftChild(nodeToDelete.getLeftChild());
            y.getLeftChild().setFather(y);
            nodeToDelete.getColor() == "BLACK" ? y.setNodeAsBlack() : y.setNodeAsRed();
        }

        if (yOriginalColor === "BLACK") {
            this.fixDelete(x);
        }
    }

    private minimum(node: NodeRBT): NodeRBT {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node;
    }

    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather().getColor() == "RED") {
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                let uncle: NodeRBT = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                let uncle: NodeRBT = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getLeftChild()) {
                        testNode = testNode.getFather();
                        this.rightRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    }

    private leftRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() != this.leaf)
            y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getLeftChild())
            x.getFather().setLeftChild(y);
        else
            x.getFather().setRightChild(y);
        y.setLeftChild(x);
        x.setFather(y);
    }

    private rightRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() != this.leaf)
            y.getRightChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getRightChild())
            x.getFather().setRightChild(y);
        else
            x.getFather().setLeftChild(y);
        y.setRightChild(x);
        x.setFather(y);
    }

    private printNode(nodo: NodeRBT): void {
        if (nodo.getLeftChild() !== this.leaf)
            this.printNode(nodo.getLeftChild());
        console.log(nodo.getData() + "(" + nodo.getColor() + ")");
        if (nodo?.getRightChild() !== this.leaf)
            this.printNode(nodo.getRightChild());
    }

    public printAll(): void {
        this.printNode(this.root);
    }

    public insert(data: number): void {
        let newNode: NodeRBT = new NodeRBT(data);
        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData() < current.getData()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getData() < parent.getData()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack()
            return;
        }
        if (newNode.getFather().getFather() == this.leaf)
            return;

        this.fixInsert(newNode);
    }

    // Función para realizar un recorrido inorden
    public inOrderTraversal(node: NodeRBT = this.root): void {
        if (node !== this.leaf) {
            this.inOrderTraversal(node.getLeftChild());
            console.log(node.getData() + "(" + node.getColor() + ")");
            this.inOrderTraversal(node.getRightChild());
        }
    }

    // Función para realizar un recorrido en preorden
    public preOrderTraversal(node: NodeRBT = this.root): void {
        if (node !== this.leaf) {
            console.log(node.getData() + "(" + node.getColor() + ")"); // Imprime el nodo
            this.preOrderTraversal(node.getLeftChild());
            this.preOrderTraversal(node.getRightChild());
        }
    }

    // Función para realizar un recorrido en postorden
    public postOrderTraversal(node: NodeRBT = this.root): void {
        if (node !== this.leaf) {
            this.postOrderTraversal(node.getLeftChild());
            this.postOrderTraversal(node.getRightChild());
            console.log(node.getData() + "(" + node.getColor() + ")"); // Imprime el nodo
        }
    }

    // Función de búsqueda
    public searchNode(data: number): string | null {
        let currentNode: NodeRBT = this.root;

        while (currentNode !== this.leaf) {
            if (data === currentNode.getData()) {
                return `Nodo encontrado: ${currentNode.getData()}(${currentNode.getColor()})`;
            } else if (data < currentNode.getData()) {
                currentNode = currentNode.getLeftChild();
            } else {
                currentNode = currentNode.getRightChild();
            }
        }
        return `-1 Nodo ${data} no encontrado en el árbol.`;
    }

    public search(data: number): NodeRBT {
        let currentNode: NodeRBT = this.root;

        while (currentNode !== this.leaf) {
            if (data === currentNode.getData()) {
                return currentNode;
            } else if (data < currentNode.getData()) {
                currentNode = currentNode.getLeftChild();
            } else {
                currentNode = currentNode.getRightChild();
            }
        }
        return this.leaf;
    }

}