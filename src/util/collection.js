export default class Collection {

    constructor() {
        this.shapes = [];
    }

    /**
     * @param {Object | Array} shapes
     * @param {Function} callback
     * @returns {Self} for chain call
     */
    add(shapes, callback) {
        if (Array.isArray(shapes)) {
            this.shapes.push.apply(this.shapes, shapes);
        } else {
            this.shapes.push(shapes);
        }
        if (callback) {
            this.shapes.forEach((shape) => {
                callback.call(this, shape);
            })
        }
        return this;
    }

    /**
     * @param {Object | Array} shapes Shape(s) to insert
     * @param {Number} index Index to insert shape at
     * @param {Function} callback
     * @returns {Object} for chain call
     */
    insertAt(shapes, index, callback) {
        const args = [index, 0].concat(shapes);
        this.shapes.splice.apply(this.shapes, args);
        if (callback) {
            this.shapes.forEach((shape) => {
                callback.call(this, shape);
            })
        }
        return this;
    }

    /**
     * @param {Object | Array} shapesToRemove shapes to remove
     * @param {Function} [callback] function to call for each shape removed
     * @returns {Array} removed shapes
     */
    remove(shapesToRemove, callback) {
        if(!Array.isArray(shapesToRemove)) shapesToRemove = [shapesToRemove];
        let shapes = this.shapes, removed = [];
        for (let i = 0, shape, index; i < shapesToRemove.length; i++) {
            shape = shapesToRemove[i];
            index = shapes.indexOf(shape);
            // only call onShapeRemoved if an shape was actually removed
            if (index !== -1) {
                shapes.splice(index, 1);
                removed.push(shape);
                callback && callback.call(this, shape);
            }
        }
        return removed;
    }

    /**
     * Executes given function for each shape
     * @param {Function} callback
     * @param {Object} context Context (aka thisObject)
     * @return {Self} thisArg
     * @chainable
     */
    forEach(callback, context,breakByTrue) {
        let res,shapes = this.getshapes();
        for (let i = 0; i < shapes.length; i++) {
            res = callback.call(context, shapes[i], i, shapes);
            if(breakByTrue && res) break;
        }
        return this;
    }

    /**
     * Returns an array of children shapes of this instance
     * @param {string} type when specified, only shapes of these types are returned
     * @return {Array}
     */
    getshapes(type) {
        if(!type) return this.shapes.slice();
        return this._shapes.filter(function (shape) {
            return types.indexOf(shape.type) > -1;
        });
    }

    /**
     * Returns object at specified index
     * @param {Number} index
     * @return {Object}
     */
    item(index) {
        return this.shapes[index];
    }

    /**
     * Returns true if collection contains no shapes
     * @return {Boolean} true if collection is empty
     */
    isEmpty() {
        return this.shapes.length === 0;
    }

    /**
     * Returns a size of a collection (i.e: length of an array containing its shapes)
     * @return {Number} Collection size
     */
    size() {
        return this.shapes.length;
    }

    /*
     * @param {Object} shape
     * @return {Boolean} `true` if collection contains an shape
     */
    contains(shape) {
        return this.shapes.indexOf(shape) > -1;
    }
};