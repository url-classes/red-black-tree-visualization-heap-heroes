"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeRBT = void 0;
var NodeRBT = /** @class */ (function () {
    function NodeRBT(data, isLeaf) {
        this.data = data;
        this.color = "RED";
        if (isLeaf)
            this.color = "BLACK";
    }
    NodeRBT.prototype.getData = function () {
        return this.data;
    };
    NodeRBT.prototype.setFather = function (newFather) {
        this.father = newFather;
    };
    NodeRBT.prototype.getFather = function () {
        return this.father;
    };
    NodeRBT.prototype.setLeftChild = function (newChild) {
        this.leftChild = newChild;
    };
    NodeRBT.prototype.getLeftChild = function () {
        return this.leftChild;
    };
    NodeRBT.prototype.setRightChild = function (newChild) {
        this.rightChild = newChild;
    };
    NodeRBT.prototype.getRightChild = function () {
        return this.rightChild;
    };
    NodeRBT.prototype.setNodeAsRed = function () {
        this.color = "RED";
    };
    NodeRBT.prototype.setNodeAsBlack = function () {
        this.color = "BLACK";
    };
    NodeRBT.prototype.getColor = function () {
        return this.color;
    };
    NodeRBT.prototype.setColor = function (color) {
        this.color = color;
    };
    return NodeRBT;
}());
exports.NodeRBT = NodeRBT;
