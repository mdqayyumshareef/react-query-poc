import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  {
    text: "Profiles",
    to: "/profiles",
  },
  {
    text: "Timezone",
    to: "/timezone",
  },
  {
    text: "Websocket",
    to: "/websocket",
  },
];

export default function MainLayout() {
  return (
    <main className="flex flex-col h-full">
      <header className="flex flex-col justify-center px-4 shrink-0 h-14 bg-slate-400">
        <p>React Query</p>
      </header>
      <div className="flex grow">
        <aside className="flex flex-col w-56 gap-2 p-4 bg-orange-200">
          {links.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive
                    ? "font-semibold bg-orange-400"
                    : "font-normal hover:bg-orange-300"
                }`
              }
            >
              {item.text}
            </NavLink>
          ))}
        </aside>
        <section className="p-4 overflow-scroll grow">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
