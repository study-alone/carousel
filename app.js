const dispatch = (type) => {
    const dict = { ADD: 1, SUB: -1 };
    let index = store.getState().index + dict[type];
    store.dispatch({
        type,
        payload: { index },
    });
};

const setIndex = (index) => {
    document.querySelector(".container").setAttribute("style", `--i: ${index}`);
};
const initialState = {
    index: 0,
    length: document.querySelectorAll(".carousel .container .slide").length,
};
const store = createStore(initialState, reducer);

store.subscribe("ADD", () => {
    setIndex(store.getState().index);
});
store.subscribe("SUB", () => {
    setIndex(store.getState().index);
});

document.querySelector(".next").addEventListener("click", () => {
    dispatch("ADD");
});

document.querySelector(".prev").addEventListener("click", () => {
    dispatch("SUB");
});
