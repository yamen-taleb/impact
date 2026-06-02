import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import StatCard from "./StatCard";

const MockIcon = ({ className }: { className?: string }) => (
  <svg data-testid="mock-icon" className={className} />
);

describe("StatCard", () => {
  const defaultProps = {
    icon: MockIcon,
    label: "Total Users",
    value: 1234,
    description: "Since last month",
    href: "/users",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-500",
    hoverTextColor: "group-hover:text-blue-600",
    disabled: false,
  };

  const renderStatCard = (props = defaultProps) => {
    return render(
      <MemoryRouter>
        <StatCard {...props} />
      </MemoryRouter>
    );
  };

  it("renders correctly with given props", () => {
    renderStatCard();

    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
    expect(screen.getByText("Since last month")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("links to the correct href", () => {
    renderStatCard();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/users");
  });

  it("adds pointer-events-none class when disabled", () => {
    renderStatCard({ ...defaultProps, disabled: true });
    const link = screen.getByRole("link");
    expect(link).toHaveClass("pointer-events-none");
  });

  it("does not have pointer-events-none when not disabled", () => {
    renderStatCard();
    const link = screen.getByRole("link");
    expect(link).not.toHaveClass("pointer-events-none");
  });
});
