import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Filters, { FiltersType } from "./Filters";
import { useCategoryContext } from "../../context/CategoryContext";
import { useCollegeContext } from "../../context/CollegeContext";
import { getUserRole } from "../../lib/utils";

jest.mock("../../context/CategoryContext", () => ({
  useCategoryContext: jest.fn(),
}));

jest.mock("../../context/CollegeContext", () => ({
  useCollegeContext: jest.fn(),
}));

jest.mock("../../lib/utils", () => ({
  getUserRole: jest.fn(),
}));

jest.mock("react-router", () => ({
  useLocation: () => ({ pathname: "/initiatives" }),
}));

jest.mock("../SelectField.tsx", () => {
  return function MockSelectField({ field, options, onAfterChange }: any) {
    return (
      <select
        data-testid={`select-${field.name}`}
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value);
          onAfterChange?.();
        }}
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  };
});

jest.mock("../TextField.tsx", () => {
  return function MockTextField({ field, placeholder, onAfterChange }: any) {
    return (
      <input
        data-testid="search-input"
        placeholder={placeholder}
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value);
          onAfterChange?.();
        }}
      />
    );
  };
});

describe("Filters", () => {
  const onFiltersChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCategoryContext as jest.Mock).mockReturnValue({
      categoryOptions: [{ value: "1", label: "Category 1" }],
    });
    (useCollegeContext as jest.Mock).mockReturnValue({
      collegeOptions: [{ value: "1", label: "College 1" }],
    });
    (getUserRole as jest.Mock).mockReturnValue("User");
  });

  const renderSubject = () => {
    return render(<Filters onFiltersChange={onFiltersChangeMock} />);
  };

  it("renders search, college, status, and category fields", () => {
    renderSubject();

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("select-college")).toBeInTheDocument();
    expect(screen.getByTestId("select-status")).toBeInTheDocument();
    expect(screen.getByTestId("select-category")).toBeInTheDocument();
  });

  it("calls onFiltersChange when a select is changed", async () => {
    renderSubject();

    const collegeSelect = screen.getByTestId("select-college");
    fireEvent.change(collegeSelect, { target: { value: "1" } });

    await waitFor(() => {
      expect(onFiltersChangeMock).toHaveBeenCalledWith(
        expect.objectContaining({
          college: "1",
          status: "",
          category: "",
          search: "",
        })
      );
    });
  });

  it("debounces the search field change", async () => {
    renderSubject();

    const searchInput = screen.getByTestId("search-input");

    fireEvent.change(searchInput, { target: { value: "test" } });

    // Ensure it's not called immediately due to debounce
    expect(onFiltersChangeMock).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(onFiltersChangeMock).toHaveBeenCalledWith(
        expect.objectContaining({
          search: "test",
        })
      );
    }, { timeout: 1000 });
  });

  it("filters status options for User on /initiatives route", () => {
    (getUserRole as jest.Mock).mockReturnValue("User");
    renderSubject();

    const statusSelect = screen.getByTestId("select-status");
    const options = Array.from(statusSelect.childNodes).map((node) => (node as HTMLOptionElement).value);

    // According to logic, User on /initiatives shouldn't see PENDING, REJECTED, CANCELED, APPROVED
    expect(options).not.toContain("PENDING");
    expect(options).not.toContain("REJECTED");
    expect(options).not.toContain("CANCELED");
    expect(options).not.toContain("APPROVED");
    expect(options).toContain("all_statuses");
    expect(options).toContain("ONGOING");
    expect(options).toContain("COMPLETED");
  });
});

