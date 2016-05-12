import assign from 'lodash/assign';

export default (params) => {
    return assign(
        {},
        params,
        { type: 'ADD_MENU_ITEM' }
    );
};
