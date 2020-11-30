import {
    CHANGE_BURGER
} from '../actions/actions'

export default function changeBurger() {
    return disatch => {
        disatch(changeBurgerState())
    }

    function changeBurgerState() {
        return {
            type: CHANGE_BURGER
        }
    }
}