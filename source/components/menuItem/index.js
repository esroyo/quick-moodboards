import { Link } from 'react-router';

import createMenu from 'components/menu';

let currentActiveClassName;
let parentItem;

const propagateActiveClass = function () {
    const $ = window.$,
            $el = $(parentItem),
            method = $el.children('a').hasClass(currentActiveClassName) ?
            'addClass' : 'removeClass';
    $el[method](currentActiveClassName);
};

export default React => {

    let propTypes;
    propTypes = {
        to: React.PropTypes.string.isRequired,
        icon: React.PropTypes.string,
        submenu: React.PropTypes.shape({
            items: React.PropTypes.arrayOf(
                React.PropTypes.shape(propTypes)
            ),
            title: React.PropTypes.string
        }),
        children: React.PropTypes.node,
        onlyActiveOnIndex: React.PropTypes.bool,
        activeClassName: React.PropTypes.string,
        activeStyle: React.PropTypes.object
    };

    const render = function () {
        const {
            to,
            icon,
            submenu,
            children,
            onlyActiveOnIndex = true,
            activeClassName = 'active',
            activeStyle
        } = this.props;

        const linkProps = {
            to,
            onlyActiveOnIndex,
            activeClassName,
            activeStyle
        };

        // update closure
        currentActiveClassName = activeClassName;

        if (submenu) {
            // create Menu component
            var Menu = createMenu(React);
        }

        return (
            <li ref={node => {
                parentItem = node;
            }}>
                {icon ?
                    <Link {...linkProps} >
                        <i className={`fi-${icon}`}></i>
                        &nbsp;
                        <span>{children}</span>
                    </Link> :
                    <Link {...linkProps} >
                        {children}
                    </Link>
                }
                {submenu ?
                    <Menu items={submenu.items} /> : ''
                }
            </li>
        );
    };

    return React.createClass({
        propTypes,
        render,
        componentDidMount: propagateActiveClass,
        componentDidUpdate: propagateActiveClass,
    });
};
