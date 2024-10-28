function drawArrow(context, fromX, fromY, toX, toY) {
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.strokeStyle = "black"; 
    context.lineWidth = 2;
    context.stroke();

    const headLength = 10; 
    const angle = Math.atan2(toY - fromY, toX - fromX);

    context.beginPath();
    context.moveTo(toX, toY);
    context.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    context.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    context.lineTo(toX, toY);
    context.fillStyle = "black";
    context.fill();
}

function drawCircle(number, centerX, centerY,color) {
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");

    const radius = 30; 

    context.beginPath(); 
    context.arc(centerX, centerY, radius, 0, Math.PI * 2); 
    context.fillStyle = color; 
    context.fill(); 
    context.stroke(); 

    
    context.fillStyle = "white"; 
    context.font = "30px Arial"; 
    context.textAlign = "center"; 
    context.textBaseline = "middle"; 
    context.fillText(number, centerX, centerY); 

    drawArrow(context, centerX - radius, centerY + radius, centerX - radius - 20, centerY + radius + 20); 
    drawArrow(context, centerX + radius, centerY + radius, centerX + radius + 20, centerY + radius + 20); 
}

class NodeRBT {
    constructor(data, isLeaf) {
        this.data = data;
        this.color = "RED";
        if (isLeaf) {
            this.color = "BLACK";
        }
        this.father = null;
        this.leftChild = null;
        this.rightChild = null;
    }

    getData() {
        return this.data;
    }

    setFather(newFather) {
        this.father = newFather;
    }

    getFather() {
        return this.father;
    }

    setLeftChild(newChild) {
        this.leftChild = newChild;
    }

    getLeftChild() {
        return this.leftChild;
    }

    setRightChild(newChild) {
        this.rightChild = newChild;
    }

    getRightChild() {
        return this.rightChild;
    }

    setNodeAsRed() {
        this.color = "RED";
    }

    setNodeAsBlack() {
        this.color = "BLACK";
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }
}

class RBTree {
    constructor() {
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
    }

    fixDelete(node) {
        while (node !== this.root && node.getColor() === "BLACK") {
            if (node === node.getFather().getLeftChild()) {
                let sibling = node.getFather().getRightChild();
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
                    node.setColor(node.getFather().getColor());
                    node.getFather().setNodeAsBlack();
                    sibling.getRightChild().setNodeAsBlack();
                    this.leftRotate(node.getFather());
                    node = this.root;
                }
            } else {
                let sibling = node.getFather().getLeftChild();
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
                    node.setColor(node.getFather().getColor());
                    node.getFather().setNodeAsBlack();
                    sibling.getLeftChild().setNodeAsBlack();
                    this.rightRotate(node.getFather());
                    node = this.root;
                }
            }
        }
        node.setNodeAsBlack();
    }

    transplant(u, v) {
        if (u.getFather() === this.leaf) {
            this.root = v;
        } else if (u === u.getFather().getLeftChild()) {
            u.getFather().setLeftChild(v);
        } else {
            u.getFather().setRightChild(v);
        }
        v.setFather(u.getFather());
    }

    delete(data) {
        let nodeToDelete = this.search(data);
        if (nodeToDelete === this.leaf) {
            console.log("El nodo no existe.");
            return;
        }

        let y = nodeToDelete;
        let yOriginalColor = y.getColor();
        let x;

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
            nodeToDelete.getColor() === "BLACK" ? y.setNodeAsBlack() : y.setNodeAsRed();
        }

        if (yOriginalColor === "BLACK") {
            this.fixDelete(x);
        }
    }

    minimum(node) {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node;
    }

    fixInsert(testNode) {
        while (testNode !== this.root && testNode.getFather().getColor() === "RED") {
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                let uncle = testNode.getFather().getFather().getRightChild();
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
                let uncle = testNode.getFather().getFather().getLeftChild();
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

    leftRotate(x) {
        let y = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() !== this.leaf) {
            y.getLeftChild().setFather(x);
        }
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf) {
            this.root = y;
        } else if (x === x.getFather().getLeftChild()) {
            x.getFather().setLeftChild(y);
        } else {
            x.getFather().setRightChild(y);
        }
        y.setLeftChild(x);
        x.setFather(y);
    }

    rightRotate(x) {
        let y = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() !== this.leaf) {
            y.getRightChild().setFather(x);
        }
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf) {
            this.root = y;
        } else if (x === x.getFather().getRightChild()) {
            x.getFather().setRightChild(y);
        } else {
            x.getFather().setLeftChild(y);
        }
        y.setRightChild(x);
        x.setFather(y);
    }

    printNode(node) {
        if (node.getLeftChild() !== this.leaf) {
            this.printNode(node.getLeftChild());
        }
        console.log(node.getData() + "(" + node.getColor() + ")");
        if (node.getRightChild() !== this.leaf) {
            this.printNode(node.getRightChild());
        }
    }

    printAll() {
        this.printNode(this.root);
    }

    insert(data) {
        let newNode = new NodeRBT(data);
        let parent = this.leaf;
        let current = this.root;
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
            newNode.setNodeAsBlack();
            return;
        }
        if (newNode.getFather().getFather() === this.leaf) {
            return;
        }

        this.fixInsert(newNode);
    }

    inOrderTraversal(node = this.root) {
        if (node !== this.leaf) {
            this.inOrderTraversal(node.getLeftChild());
            console.log(node.getData() + "(" + node.getColor() + ")");
            this.inOrderTraversal(node.getRightChild());
        }
    }

    preOrderTraversal(node = this.root) {
        if (node !== this.leaf) {
            console.log(node.getData() + "(" + node.getColor() + ")");
            this.preOrderTraversal(node.getLeftChild());
            this.preOrderTraversal(node.getRightChild());
        }
    }

    postOrderTraversal(node = this.root) {
        if (node !== this.leaf) {
            this.postOrderTraversal(node.getLeftChild());
            this.postOrderTraversal(node.getRightChild());
            console.log(node.getData() + "(" + node.getColor() + ")");
        }
    }

    dibujar_nodos(node = this.root,posX = 500 , posY = 60) {
        if (node !== this.leaf) {
            this.dibujar_nodos(node.getLeftChild(),posX-80,posY+80);
            this.dibujar_nodos(node.getRightChild(),posX+80,posY+80);
            drawCircle(node.getData(), posX, posY,node.getColor());
        }
    }

    searchNode(data) {
        let currentNode = this.root;

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

    search(data) {
        let currentNode = this.root;

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

const myRBTree = new RBTree();

//myRBTree.insert(9);
//myRBTree.insert(12);
//myRBTree.insert(20);
//myRBTree.insert(30);
//myRBTree.insert(25);
//myRBTree.printAll();

//console.log("\nRecorrido en Inorden:");
//myRBTree.inOrderTraversal();

//console.log("\nRecorrido en Preorden:");
//myRBTree.preOrderTraversal();

//console.log("\nRecorrido en Postorden:");
//myRBTree.postOrderTraversal();

//console.log("\n");


//console.log(myRBTree.searchNode(15));


//myRBTree.delete(25);
//myRBTree.printAll();


document.getElementById("insert").addEventListener("click", function() {
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    myRBTree.insert(parseInt(document.getElementById("value").value));
    myRBTree.dibujar_nodos();
});



