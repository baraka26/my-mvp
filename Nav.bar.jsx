import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Compass, User } from "lucide-react";
import PropTypes from "prop-types";

// Configurable nav items
const navItems = [
  { to: "/feed", icon: Home, label: "Home" },
  { to: "/missions", icon: Compass, label: "Missions" },
  { to: "/profile", icon: User, label: "Profile" },
];

// Reusable, accessible nav item
function NavItem({ to, Icon, label, active }) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center text-xs px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition duration-150 ${
        active ? "text-blue-600 font-semibold" : "text-gray-500"
      } hover:text-blue-500`}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      role="link"
    >
      <Icon size={20} aria-hidden="true" />
      <span className="mt-1">{label}</span>
    </Link>
  );
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default function Navbar() {
  const location = useLocation();

  // Determine active link based on path prefix
  const isActive = (to) =>
    location.pathname === to || location.pathname.startsWith(to + "/");

  return (
    <nav
      className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-sm z-50"
      aria-label="Primary navigation"
    >
      <div className="flex justify-around items-center h-14">
        {navItems.map(({ to, icon, label }) => (
          <NavItem
            key={to}
            to={to}
            Icon={icon}
            label={label}
            active={isActive(to)}
          />
        ))}
      </div>
    </nav>
  );
}
