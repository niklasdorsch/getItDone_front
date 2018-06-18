const initializeState = () => {};
const StateLoader = () => ({
    loadState: () => {
        try {
            const serializedState = localStorage.getItem('reduxState');
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
            localStorage.setItem('reduxState', serializedState);
        } catch (err) {
            console.log(err);
        }
    },

    saveLoginState: (state) => {
        try {
            const { user } = state;
            const serializedState = JSON.stringify({ user });

            localStorage.setItem('reduxState', serializedState);
        } catch (err) {
            console.log(err);
        }
    },


});

const stateLoader = StateLoader();

module.exports = {
    stateLoader,
};
