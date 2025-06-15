import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

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

import TodoPage from "app/todolist/page";
import { SessionProvider } from "next-auth/react";

function wrapper(ui: React.ReactElement) {
  return render(<SessionProvider session={null}>{ui}</SessionProvider>);
}

// TEST RENDER BUTTON
describe("TodoPage UI", () => {
  it("render Them Todo Button", () => {
    wrapper(<TodoPage />),
      expect(screen.getByText("Thêm Todo")).toBeInTheDocument();
  });
});

describe("TodoPage UI", () => {
  it("render Pagination button", () => {
    wrapper(<TodoPage />),
      expect(screen.getByText("Trang sau")).toBeInTheDocument();
  });
});

describe("TodoPage UI", () => {
  it("render Delete Btn", () => {
    wrapper(<TodoPage />), expect(screen.getByText("Xóa")).toBeInTheDocument();
  });
});

describe("TodoPage UI", () => {
  it("render Change btn", () => {
    wrapper(<TodoPage />),
      expect(screen.getByText("Đổi trạng thái")).toBeInTheDocument();
  });
});

// TEST RENDER INPUT
describe("TodoPage UI", () => {
  it("render search input", () => {
    wrapper(<TodoPage />),
      expect(
        screen.getByPlaceholderText("Tìm theo từ khóa")
      ).toBeInTheDocument();
  });
});
