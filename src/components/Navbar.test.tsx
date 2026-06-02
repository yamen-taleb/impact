import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from "./Navbar";
import { getUserRole } from "../lib/utils";

jest.mock("../lib/utils", () => ({
  getUserRole: jest.fn(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderNavbar = (initialEntries = ["/"]) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Navbar />
      </MemoryRouter>
    );
  };

  it("renders the correct links for a User role", () => {
    (getUserRole as jest.Mock).mockReturnValue("User");
    renderNavbar();

    expect(screen.getByText("المبادرات")).toBeInTheDocument();
    expect(screen.getByText("مبادراتي")).toBeInTheDocument();
    expect(screen.getByText("أنشطتي")).toBeInTheDocument();
    expect(screen.getByText("الاحصائيات")).toBeInTheDocument();
  });

  it("renders the correct links for an Admin role", () => {
    (getUserRole as jest.Mock).mockReturnValue("Admin");
    renderNavbar();

    expect(screen.getByText("المبادرات")).toBeInTheDocument();
    expect(screen.getByText("المبادرات الواردة")).toBeInTheDocument();
    expect(screen.getByText("مبادراتي")).toBeInTheDocument();
    expect(screen.getByText("أنشطتي")).toBeInTheDocument();
    expect(screen.getByText("الاحصائيات")).toBeInTheDocument();
  });

  it("renders the correct links for a Manager role", () => {
    (getUserRole as jest.Mock).mockReturnValue("Manager");
    renderNavbar();

    expect(screen.getByText("المبادرات")).toBeInTheDocument();
    expect(screen.getByText("الهيئات الطلابية")).toBeInTheDocument();
    expect(screen.getByText("الطلاب")).toBeInTheDocument();
    expect(screen.getByText("الاحصائيات")).toBeInTheDocument();
    // User / Admin exclusive:
    expect(screen.queryByText("أنشطتي")).not.toBeInTheDocument();
    expect(screen.queryByText("مبادراتي")).not.toBeInTheDocument();
  });

  it("applies the active class when the route matches", () => {
    (getUserRole as jest.Mock).mockReturnValue("User");
    renderNavbar(["/initiatives"]);

    const activeLink = screen.getByText("المبادرات");
    expect(activeLink.className).toContain("bg-zinc-100");
    expect(activeLink.className).toContain("text-zinc-900");

    const inactiveLink = screen.getByText("الاحصائيات");
    expect(inactiveLink.className).toContain("text-zinc-600");
  });
});

