import createHeader from 'components/header';

export default React => {

    const Header = createHeader(React);

    return ({ children }) => (
        <div>
            <Header />
            {children}
        </div>
    );

};
