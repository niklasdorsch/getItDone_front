const initializeState = () => {};
const StateLoader = () => ({
    loadState: () => {
        try {
            const serializedState = localStorage.getItem('reduxState');
            console.log(serializedState);
            if (serializedState === null) {
                return initializeState();
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return initializeState();
        }
    },

    saveState: (state) => {
        try {
            const serializedState = JSON.stringify(state);
            console.log(serializedState);
            localStorage.setItem('reduxState', serializedState);
        } catch (err) {
            console.log(err);
        }
    },


});

export default StateLoader;
