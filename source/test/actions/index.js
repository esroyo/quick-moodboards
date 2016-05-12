import test from 'tape';

import addMenuItem from 'actions/addMenuItem';

test('Actions', nest => {

    nest.test('...addMenuItem', assert => {

        const message = 'should generate an ADD_MENU_ITEM action';

        const expected = {
            type: 'ADD_MENU_ITEM',
            text: 'First Menu Item',
            to: '/first'
        };

        const actual = addMenuItem({
            text: 'First Menu Item',
            to: '/first'
        });

        assert.deepEqual(actual, expected, message);
        assert.end();

    });

});
