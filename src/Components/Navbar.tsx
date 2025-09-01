import { Link } from "react-router";

const NavItem = (props: { item: string, href: string }) => {
  return (
    <li className="navItem surface4">
      <Link to={ props.href }>{props.item}</Link>
    </li>
  );
};

type HRef = string;
export type NavItemPair = [string, HRef];

const Navbar = (props: { items: NavItemPair[] }) => {

  return (
    <nav>
      <ul className="navBar surface4">
        {props.items.map(([ name, href ]) => <NavItem href={ href } item={ name } key={ href } />)}
      </ul>
    </nav>
  );
};

export default Navbar;
