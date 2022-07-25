import {error404InitialState} from "./error404InitialState";

export const error404Reducer = (state = error404InitialState, action: any) => {
    switch (action.type) {


        default: {
            return state;
        }
    }
};
