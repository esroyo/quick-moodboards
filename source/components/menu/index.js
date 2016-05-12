import classNames from 'classnames/dedupe';
import some from 'lodash/some';

import createMenuItem from 'components/menuItem';

export default React => {

    const render = function () {
        const props = Object.assign(
            // defaults
            {
                items: [],
                className: 'menu'
            },
            // overwritten by component props
            this.props
        );
        // dependent components
        const MenuItem = createMenuItem(React);
        // default class
        const defaultClass = ['menu'];
        // some items have a submenu
        const someHaveSubmenu = some(
            props.items,
            i => i.submenu
        );
        // add Foundation dropdown
        if (someHaveSubmenu) {
            require('foundation-sites/dist/plugins/foundation.dropdownMenu');
            defaultClass.push('dropdown');
            props['data-dropdown-menu'] = '';
        }
        // recalculate classes
        props.className = classNames.apply(
            null,
            [
                ...defaultClass,
                ...props.className.split(/\s+/)
            ]
        );
        // return component
        return (
            <ul {...props} ref="menu">
                {props.menuText ?
                    <li className="menu-text">{props.menuText}</li> : ''
                }
                {props.items.map(item =>
                    <MenuItem
                        key={item.id}
                        {...item}
                    >
                        {item.text}
                    </MenuItem>
                )}
            </ul>
        );
    };

    const reInit = function () {
        window.$(this.refs.menu)
            .unbind().removeData().foundation();
    };

    return React.createClass({
        render,
        componentDidMount: reInit,
        componentDidUpdate: reInit
    });
};
