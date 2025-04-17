import ctr_logo from "../../assets/ctr_logo.svg";

function Header() {
    return (
        <header>
            <div className="container">
                <img src={ctr_logo} className="header_logo" alt="CTR logo" />
                <h1 className="header_title">CTR</h1>
            </div>
        </header>
    )
}
export default Header;
