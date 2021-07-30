import WbBaseNode from './WbBaseNode.js';
import WbWorld from './WbWorld.js';

export default class WbSlot extends WbBaseNode {
  constructor(id, type = '', endPoint = null) {
    super(id);
    this.type = type;
    this.endPoint = endPoint;
  }

  delete(isBoundingObject) {
    if (typeof this.parent === 'undefined') {
      const index = WbWorld.instance.sceneTree.indexOf(this);
      WbWorld.instance.sceneTree.splice(index, 1);
    } else {
      const parent = WbWorld.instance.nodes.get(this.parent);
      if (typeof parent !== 'undefined') {
        if (isBoundingObject)
          parent.isBoundingObject = null;
        else if (typeof parent.endPoint !== 'undefined')
          parent.endPoint = null;
        else {
          const index = parent.children.indexOf(this);
          parent.children.splice(index, 1);
        }
      }
    }

    if (typeof this.endPoint !== 'undefined' && this.endPoint !== null)
      this.endPoint.delete();

    super.delete();
  }

  createWrenObjects() {
    super.createWrenObjects();

    if (typeof this.endPoint !== 'undefined' && this.endPoint !== null)
      this.endPoint.createWrenObjects();
  }

  preFinalize() {
    super.preFinalize();

    if (typeof this.endPoint !== 'undefined' && this.endPoint !== null)
      this.endPoint.preFinalize();
  }

  postFinalize() {
    super.postFinalize();

    if (typeof this.endPoint !== 'undefined' && this.endPoint !== null)
      this.endPoint.postFinalize();
  }
}
