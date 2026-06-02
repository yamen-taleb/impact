import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader", () => {
  it("renders the loader text correctly", () => {
    render(<Loader />);
    const loaderText = screen.getByText("جاري التحميل...");
    expect(loaderText).toBeInTheDocument();
  });

  it("applies the provided className", () => {
    render(<Loader className="custom-loader-class" />);
    const loaderElement = screen.getByText("جاري التحميل...");
    expect(loaderElement).toHaveClass("custom-loader-class");
  });
});

