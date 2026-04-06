import "./Sidebar.scss";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Recipe Logo" />
      </div>

      <nav className="nav-menu">
        <ul>
          <li className="active">
            <i className="fa-solid fa-utensils"></i> Meals
          </li>
          <li>
            <i className="fa-solid fa-list"></i> Ingredients
          </li>
          <li>
            <i className="fa-solid fa-earth-americas"></i> Area
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
