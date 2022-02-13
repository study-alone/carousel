const createStore = (initialStore, reducer) => {
    let state = initialStore;
    const events = {};

    const subscribe = (actionType, eventCallback) => {
        if (!events[actionType]) {
            events[actionType] = [];
        }
        events[actionType].push(eventCallback);
    };

    const publish = (actionType) => {
        if (events[actionType]) {
            events[actionType].map((cb) => cb());
        }
    };

    const dispatch = (action) => {
        state = reducer(state, action);
        publish(action.type);
    };

    const getState = () => state;

    return {
        getState,
        subscribe,
        dispatch,
    };
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        // 더하기(addition)
        case "ADD":
            if (payload.index >= state.length) {
                payload.index = 0;
            }
            return { ...state, ...payload };
        // 빼기(subtraction)
        case "SUB":
            if (payload.index < 0) {
                payload.index = state.length - 1;
            }
            return { ...state, ...payload };
        default:
            return state;
    }
};
