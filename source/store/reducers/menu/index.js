import isInteger from 'lodash/isInteger';
import isNil from 'lodash/isNil';
import assign from 'lodash/assign';

import menuItem from 'store/reducers/menuItem';

const addMenuItem = ({
    newItem,
    position,
    parentTo,
    menu = { items: [] }
}) => {
    let items;

    if (!isNil(parentTo)) {
        items = menu.items.map(i => {
            const found = parentTo === i.to;
            const item = assign({}, i);

            if (found || i.submenu) {
                item.submenu = addMenuItem({
                    newItem,
                    position,
                    parentTo: found ? null : parentTo,
                    menu: i.submenu
                });
            }

            return item;
        });
    } else if (isInteger(position)) {
        items = [
            ...menu.items.slice(0, position),
            newItem,
            ...menu.items.slice(position)
        ];
    } else {
        items = [
            ...menu.items,
            newItem
        ];
    }

    return assign({}, menu, { items});
};

export default (
    state = { items: [] },
    action
) => {
    switch (action.type) {
        case 'ADD_MENU_ITEM':
            return addMenuItem({
                newItem: menuItem(undefined, action),
                position: action.position,
                parentTo: action.parentTo,
                menu: state
            });
        default:
            return state;
    }
};
