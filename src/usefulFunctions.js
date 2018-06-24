const requirementsArrayToObject = (array) => {
    const result = array.reduce((current, next) => {
        const object = Object.assign(current);
        object[next.requirementId] = next;
        return object;
    }, {});
    return result;
};


module.exports = {
    requirementsArrayToObject,
};
