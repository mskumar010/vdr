import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

export function renderWithRouter(ui, { routes, route = "/" } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
}
