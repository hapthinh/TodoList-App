import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("@headlessui/react", () => ({
  Combobox: ({ children }: any) => <div>{children}</div>,
  ComboboxInput: (props: any) => <input {...props} />,
  ComboboxOption: (props: any) => <div {...props} />,
  ComboboxOptions: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("@deemlol/next-icons", () => ({
  CheckSquare: () => <span>Check Square</span>,
  X: () => <span>X</span>,
  PenTool: () => <span>PenTool</span>,
}));

jest.mock("next/link", () => ({ children }: any) => <a>{children}</a>);

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => "",
    toString: () => "",
  }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: () => ({
    data: {
      todos: [
        {
          id: 1,
          todo: "Test todo",
          status: false,
          createdDate: new Date().toISOString(),
        },
      ],
      total: 1,
    },
    isLoading: false,
  }),
  useMutation: () => ({ mutate: jest.fn() }),
  useQueryClient: () => ({}),
  keepPreviousData: {},
}));

import TodoPage from "./TodoPage";

// TEST RENDER BUTTON
describe("TodoPage UI", () => {
  it("render Them Todo Button", () => {
    render(<TodoPage />),
      expect(screen.getByText("Thêm Todo")).toBeInTheDocument();
  });
});

describe("TodoPage UI", () => {
  it("render Pagination button", () => {
    render(<TodoPage />),
      expect(screen.getByText("Trang sau")).toBeInTheDocument();
  });
});

describe("TodoPage UI", () => {
  it("render Delete Btn", () => {
    render(<TodoPage />), expect(screen.getByText("Xóa")).toBeInTheDocument();
  });
});

describe("TodoPage UI", () => {
  it("render Change btn", () => {
    render(<TodoPage />),
      expect(screen.getByText("Đổi trạng thái")).toBeInTheDocument();
  });
});

// TEST RENDER INPUT
describe("TodoPage UI", () => {
  it("render search input", () => {
    render(<TodoPage />),
      expect(
        screen.getByPlaceholderText("Tìm theo từ khóa")
      ).toBeInTheDocument();
  });
});

describe("TodoPage UI", () => {
  it("render add input", () => {
    
  })
})
