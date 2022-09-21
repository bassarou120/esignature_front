import { CHANGE_MODAL_TYPE } from "../constants/action-types";

export function changeModal(payload) {
    return { type: CHANGE_MODAL_TYPE, payload }
};

// export function getSignataire(payload) {
//     return { type: GET_SIGNATAIRE, payload }
// };
