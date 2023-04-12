import "./Layout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HomeRouting from "../../Routing/HomeRouting/HomeRouting";
import HeaderRouting from "../../Routing/HeaderRouting/HeaderRouting";
import Menu from "../Menu/Menu";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <header>
        <HeaderRouting />
      </header>
      <aside>
        <Menu />
      </aside>
      <main>
        <HomeRouting />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
