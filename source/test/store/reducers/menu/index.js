import test from 'tape';
import deepFreeze from 'deep-freeze';

import addMenuItem from 'actions/addMenuItem';
import menu from 'store/reducers/menu';

test('Reducer: menu', nest => {

    nest.test('...dispatch ADD_MENU_ITEM', assert => {

        const message = 'should add a menu item to the list';

        const stateBefore = { items: [] };

        const action = addMenuItem({
            text: 'First Menu Item',
            to: '/first',
            icon: 'home'
        });

        const stateExpected = {
            items: [{
                text: 'First Menu Item',
                to: '/first',
                icon: 'home'
            }]
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        const stateActual = menu(stateBefore, action);

        assert.deepEqual(stateActual, stateExpected, message);
        assert.end();

    });

    nest.test('...dispatch ADD_MENU_ITEM with parentTo', assert => {

        const message = 'should add a submenu';

        const stateBefore = {
            items: [
                {
                    text: 'First Menu Item',
                    to: '/first'
                }
            ]
        };

        const action = addMenuItem({
            text: 'First Submenu Item',
            to: '/first/first',
            parentTo: '/first'
        });

        const stateExpected = {
            items: [
                {
                    text: 'First Menu Item',
                    to: '/first',
                    submenu: {
                        items: [
                            {
                                text: 'First Submenu Item',
                                to: '/first/first'
                            }
                        ]
                    }
                }
            ]
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        const stateActual = menu(stateBefore, action);

        assert.deepEqual(stateActual, stateExpected, message);
        assert.end();

    });

    nest.test('...dispatch ADD_MENU_ITEM on position', assert => {

        const message = 'should add an item in the position';

        const stateBefore = {
            items: [
                {
                    text: 'First Menu Item',
                    to: '/first'
                },
                {
                    text: 'Second Menu Item',
                    to: '/second'
                }
            ]
        };

        const action = addMenuItem({
            text: 'Third Menu Item',
            to: '/third',
            position: 1
        });

        const stateExpected = {
            items: [
                {
                    text: 'First Menu Item',
                    to: '/first'
                },
                {
                    text: 'Third Menu Item',
                    to: '/third'
                },
                {
                    text: 'Second Menu Item',
                    to: '/second'
                }
            ]
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        const stateActual = menu(stateBefore, action);

        assert.deepEqual(stateActual, stateExpected, message);
        assert.end();

    });

    nest.test('...dispatch ADD_MENU_ITEM with parentTo and position', assert => {

        const message = 'should add an item in the submenu and position';

        const stateBefore = {
            items: [
                {
                    text: 'First Menu Item',
                    to: '/first',
                    submenu: {
                        items: [
                            {
                                text: 'First Submenu Item',
                                to: '/first/first'
                            },
                            {
                                text: 'Second Submenu Item',
                                to: '/first/second'
                            }
                        ]
                    }
                }
            ]
        };

        const action = addMenuItem({
            text: 'Third Submenu Item',
            to: '/first/third',
            parentTo: '/first',
            position: 0
        });

        const stateExpected = {
            items: [
                {
                    text: 'First Menu Item',
                    to: '/first',
                    submenu: {
                        items: [
                            {
                                text: 'Third Submenu Item',
                                to: '/first/third'
                            },
                            {
                                text: 'First Submenu Item',
                                to: '/first/first'
                            },
                            {
                                text: 'Second Submenu Item',
                                to: '/first/second'
                            }
                        ]
                    }
                }
            ]
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        const stateActual = menu(stateBefore, action);

        assert.deepEqual(stateActual, stateExpected, message);
        assert.end();

    });

});
