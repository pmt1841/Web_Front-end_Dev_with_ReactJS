const initialState = [
    {id: 1,text:"Learn React"},
    {id: 2,text:"Learn Redux"},
    {id: 3,text:"Build something fun!"}
];

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case "todos/todoAdded":
            return [{ id: action.payload.id, text: action.payload.text }, ...state];
        case "todos/todoDeleted":
            return state.filter((todo) => todo.id !== action.payload);
        default:
            return state;
    }
}