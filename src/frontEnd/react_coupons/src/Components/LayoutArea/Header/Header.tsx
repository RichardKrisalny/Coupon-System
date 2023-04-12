import "./Header.css";

interface HeaderProps {
  title: string;
}

function Header(props: HeaderProps): JSX.Element {
  return (
    <div className="Header">
      <p className="p">{props.title}</p>
    </div>
  );
}

export default Header;
