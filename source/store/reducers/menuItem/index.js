import pick from 'lodash/pick';

const menuItemProps = [
    'id',
    'text',
    'to',
    'icon'
];

export default (
    state,
    action
) => {
    switch (action.type) {
        case 'ADD_MENU_ITEM':
            return pick(
                action,
                menuItemProps
            );
        default:
            return state;
    }
};
