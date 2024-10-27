"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBTree = void 0;
var node_rbt_1 = require("./node_rbt");
var RBTree = /** @class */ (function () {
    function RBTree() {
        this.leaf = new node_rbt_1.NodeRBT(0, true);
        this.root = this.leaf;
    }
    RBTree.prototype.getRoot = function () {
        return this.root;
    };
    RBTree.prototype.fixDelete = function (node) {
        while (node !== this.root && node.getColor() === "BLACK") {
            if (node === node.getFather().getLeftChild()) {
                var sibling = node.getFather().getRightChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    node.getFather().setNodeAsRed();
                    this.leftRotate(node.getFather());
                    sibling = node.getFather().getRightChild();
                }
                if (sibling.getLeftChild().getColor() === "BLACK" && sibling.getRightChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    node = node.getFather();
                }
                else {
                    if (sibling.getRightChild().getColor() === "BLACK") {
                        sibling.getLeftChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.rightRotate(sibling);
                        sibling = node.getFather().getRightChild();
                    }
                    node.setColor(node.getFather().getColor());
                    node.getFather().setNodeAsBlack();
                    sibling.getRightChild().setNodeAsBlack();
                    this.leftRotate(node.getFather());
                    node = this.root;
                }
            }
            else {
                var sibling = node.getFather().getLeftChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    node.getFather().setNodeAsRed();
                    this.rightRotate(node.getFather());
                    sibling = node.getFather().getLeftChild();
                }
                if (sibling.getRightChild().getColor() === "BLACK" && sibling.getLeftChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    node = node.getFather();
                }
                else {
                    if (sibling.getLeftChild().getColor() === "BLACK") {
                        sibling.getRightChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.leftRotate(sibling);
                        sibling = node.getFather().getLeftChild();
                    }
                    node.setColor(node.getFather().getColor());
                    node.getFather().setNodeAsBlack();
                    sibling.getLeftChild().setNodeAsBlack();
                    this.rightRotate(node.getFather());
                    node = this.root;
                }
            }
        }
        node.setNodeAsBlack();
    };
    RBTree.prototype.transplant = function (u, v) {
        if (u.getFather() === this.leaf) {
            this.root = v;
        }
        else if (u === u.getFather().getLeftChild()) {
            u.getFather().setLeftChild(v);
        }
        else {
            u.getFather().setRightChild(v);
        }
        v.setFather(u.getFather());
    };
    RBTree.prototype.delete = function (data) {
        var nodeToDelete = this.search(data);
        if (nodeToDelete === this.leaf) {
            console.log("El nodo no existe.");
            return;
        }
        var y = nodeToDelete;
        var yOriginalColor = y.getColor();
        var x;
        if (nodeToDelete.getLeftChild() === this.leaf) {
            x = nodeToDelete.getRightChild();
            this.transplant(nodeToDelete, nodeToDelete.getRightChild());
        }
        else if (nodeToDelete.getRightChild() === this.leaf) {
            x = nodeToDelete.getLeftChild();
            this.transplant(nodeToDelete, nodeToDelete.getLeftChild());
        }
        else {
            y = this.minimum(nodeToDelete.getRightChild());
            yOriginalColor = y.getColor();
            x = y.getRightChild();
            if (y.getFather() === nodeToDelete) {
                x.setFather(y);
            }
            else {
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
    };
    RBTree.prototype.minimum = function (node) {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node;
    };
    RBTree.prototype.fixInsert = function (testNode) {
        while (testNode !== this.root && testNode.getFather().getColor() == "RED") {
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                var uncle = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                }
                else {
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            }
            else {
                var uncle = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                }
                else {
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
    };
    RBTree.prototype.leftRotate = function (x) {
        var y = x.getRightChild();
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
    };
    RBTree.prototype.rightRotate = function (x) {
        var y = x.getLeftChild();
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
    };
    RBTree.prototype.printNode = function (nodo) {
        if (nodo.getLeftChild() !== this.leaf)
            this.printNode(nodo.getLeftChild());
        console.log(nodo.getData() + "(" + nodo.getColor() + ")");
        if ((nodo === null || nodo === void 0 ? void 0 : nodo.getRightChild()) !== this.leaf)
            this.printNode(nodo.getRightChild());
    };
    RBTree.prototype.printAll = function () {
        this.printNode(this.root);
    };
    RBTree.prototype.insert = function (data) {
        var newNode = new node_rbt_1.NodeRBT(data);
        var parent = this.leaf;
        var current = this.root;
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData() < current.getData()) {
                current = current.getLeftChild();
            }
            else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        }
        else if (newNode.getData() < parent.getData()) {
            parent.setLeftChild(newNode);
        }
        else {
            parent.setRightChild(newNode);
        }
        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack();
            return;
        }
        if (newNode.getFather().getFather() == this.leaf)
            return;
        this.fixInsert(newNode);
    };
    // Función para realizar un recorrido inorden
    RBTree.prototype.inOrderTraversal = function (node) {
        if (node === void 0) { node = this.root; }
        if (node !== this.leaf) {
            this.inOrderTraversal(node.getLeftChild());
            console.log(node.getData() + "(" + node.getColor() + ")");
            this.inOrderTraversal(node.getRightChild());
        }
    };
    // Función para realizar un recorrido en preorden
    RBTree.prototype.preOrderTraversal = function (node) {
        if (node === void 0) { node = this.root; }
        if (node !== this.leaf) {
            console.log(node.getData() + "(" + node.getColor() + ")"); // Imprime el nodo
            this.preOrderTraversal(node.getLeftChild());
            this.preOrderTraversal(node.getRightChild());
        }
    };
    // Función para realizar un recorrido en postorden
    RBTree.prototype.postOrderTraversal = function (node) {
        if (node === void 0) { node = this.root; }
        if (node !== this.leaf) {
            this.postOrderTraversal(node.getLeftChild());
            this.postOrderTraversal(node.getRightChild());
            console.log(node.getData() + "(" + node.getColor() + ")"); // Imprime el nodo
        }
    };
    // Función de búsqueda
    RBTree.prototype.searchNode = function (data) {
        var currentNode = this.root;
        while (currentNode !== this.leaf) {
            if (data === currentNode.getData()) {
                return "Nodo encontrado: ".concat(currentNode.getData(), "(").concat(currentNode.getColor(), ")");
            }
            else if (data < currentNode.getData()) {
                currentNode = currentNode.getLeftChild();
            }
            else {
                currentNode = currentNode.getRightChild();
            }
        }
        return "-1 Nodo ".concat(data, " no encontrado en el \u00E1rbol.");
    };
    RBTree.prototype.search = function (data) {
        var currentNode = this.root;
        while (currentNode !== this.leaf) {
            if (data === currentNode.getData()) {
                return currentNode;
            }
            else if (data < currentNode.getData()) {
                currentNode = currentNode.getLeftChild();
            }
            else {
                currentNode = currentNode.getRightChild();
            }
        }
        return this.leaf;
    };
    return RBTree;
}());
exports.RBTree = RBTree;
