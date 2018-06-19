const requirementsArrayToObject = (array) => {
    const result = array.reduce((current, next) => {
        const object = Object.assign(current);
        object[next.requirementid] = next;
        return object;
    }, {});
    return result;
};


module.exports = {
    requirementsArrayToObject,
};
