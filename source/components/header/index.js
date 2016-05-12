import { connect } from 'react-redux';

import createMenu from 'components/menu';

export default React => {

    const Menu = createMenu(React);

    const mapStateToProps = (
        state,
        ownProps
    ) => {
        return {
            ...state.menu
        };
    };

    const Header = (props) => (
        <div className="top-bar">
            <div className="top-bar-left">
                <Menu {...props} />
            </div>
        </div>
    );

    return connect(mapStateToProps, null, null, { pure: false })(Header);
};
