"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var image_1 = require("next/image");
var react_2 = require("next-auth/react");
// icons & layout
var Grid_1 = require("@mui/material/Grid");
var api_1 = require("../services/api");
var addTodo_1 = require("app/components/input/addTodo");
var filterTodo_1 = require("app/components/input/filterTodo");
var statisticTodo_1 = require("app/components/statisticTodo");
var sortOrder_1 = require("app/components/selectBox/sortOrder");
var selectedPageSize_1 = require("app/components/selectBox/selectedPageSize");
var selectBox_1 = require("app/components/selectBox/selectBox");
var pagination_1 = require("app/components/pagination");
var mutations_1 = require("app/lib/queries/mutations");
var todoCard_1 = require("../components/todoCard");
var deleteSelectedBtn_1 = require("app/components/btn/deleteSelectedBtn");
var appBar_1 = require("app/components/appBar");
var drawerContent_1 = require("app/components/drawer/drawerContent");
function TodoPage() {
    var _this = this;
    var _a = react_2.useSession(), session = _a.data, status = _a.status;
    var router = navigation_1.useRouter();
    var searchParams = navigation_1.useSearchParams();
    console.log(session);
    // check status session
    react_1.useEffect(function () {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);
    // page size
    var _b = react_1.useState(8), pageSize = _b[0], setPageSize = _b[1];
    // get params from url
    var inputSearch = searchParams.get("kw") || "";
    var selectStatus = searchParams.get("status") || "";
    var currentPage = Number(searchParams.get("page")) || 1;
    var sortOrder = searchParams.get("order") || "asc";
    var sortField = searchParams.get("sortField") ||
        "status";
    var limit = Number(searchParams.get("limit")) || pageSize;
    // set state
    var _c = react_1.useState(inputSearch), searchInput = _c[0], setSearchInput = _c[1];
    var _d = react_1.useState(""), input = _d[0], setInput = _d[1];
    var _e = react_1.useState(null), editId = _e[0], setEditId = _e[1];
    var _f = react_1.useState(""), editTodo = _f[0], setEditTodo = _f[1];
    var _g = react_1.useState([]), checked = _g[0], setChecked = _g[1];
    var _h = react_1.useState([]), selectedId = _h[0], setSelectedId = _h[1];
    var _j = react_1.useState(false), open = _j[0], setOpen = _j[1];
    // handle selected Todo
    var handleOnChange = function (idx) {
        // if index = idx => item !
        var updateCheckedState = checked.map(function (item, index) {
            return index === idx ? !item : item;
        });
        // setchecked = arr update..
        setChecked(updateCheckedState);
        // get id
        var id = todos[idx].id;
        // get ... arr num
        var newSelectedId = __spreadArrays(selectedId);
        if (updateCheckedState[idx])
            newSelectedId.push(id);
        else
            newSelectedId = newSelectedId.filter(function (item) { return item !== id; });
        setSelectedId(newSelectedId);
    };
    // search keyword
    var handleSearch = function (event, value) {
        event.preventDefault();
        var params = new URLSearchParams(searchParams.toString());
        params.set("kw", value);
        params.set("page", "1");
        router.push("?" + params.toString());
        setSearchInput("");
    };
    // handle change pagesize => set page = 1
    var handleChangePageSize = function (newPageSize) {
        var params = new URLSearchParams(searchParams.toString());
        params.set("limit", String(newPageSize));
        params.set("page", "1");
        router.push("?" + params.toString());
        setPageSize(newPageSize);
    };
    // Get all Todo or get Todo by keyword or get Todo by status
    var _k = react_query_1.useQuery({
        queryKey: [
            "todos",
            inputSearch,
            selectStatus,
            sortOrder,
            sortField,
            currentPage,
            limit,
        ],
        queryFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api_1.getTodos({
                            kw: inputSearch,
                            status: selectStatus,
                            order: sortOrder,
                            sortField: sortField,
                            currentPage: currentPage,
                            pageSize: limit
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); },
        staleTime: 30 * 1000,
        gcTime: 5 * 1000 * 60,
        placeholderData: react_query_1.keepPreviousData
    }), data = _k.data, isLoading = _k.isLoading;
    // querykey
    var queryKey = [
        "todos",
        inputSearch,
        selectStatus,
        sortOrder,
        sortField,
        currentPage,
        limit,
    ];
    // Get Data Todo
    var todos = Array.isArray(data === null || data === void 0 ? void 0 : data.todos)
        ? data.todos.map(function (todo) { return (__assign(__assign({}, todo), { createdDate: todo.createdDate })); })
        : [];
    // Mutations
    var postTodoMutation = mutations_1.usePostTodoMutation(queryKey);
    var deleteTodoMutation = mutations_1.useDeleteTodoMutation(queryKey);
    var updateTodoMutation = mutations_1.useUpdateTodoMutation(queryKey, setEditId, setEditTodo);
    var deleteMultiTodoMutation = mutations_1.useDeleteSelectedTodoMutation(queryKey, setChecked, setSelectedId, todos.length);
    // if todos.length change =>
    react_1.useEffect(function () {
        setChecked(new Array(todos.length).fill(false));
        setSelectedId([]);
    }, [todos.length]);
    // count selected id
    function Count() {
        return checked.filter(Boolean).length;
    }
    var toggleOpen = function () {
        setOpen(!open);
    };
    // Rendering
    return (react_1["default"].createElement("div", { className: "text-2x1 text-white bg-gradient-to-r from-amber-100 to-amber-300 h-full grid-cols-subgrid border-2 min-h-screen flex" },
        react_1["default"].createElement(appBar_1.ButtonAppBar, { handleMenu: toggleOpen, open: open }),
        react_1["default"].createElement(drawerContent_1["default"], { open: open }),
        react_1["default"].createElement("div", { className: "mt-13" },
            react_1["default"].createElement("div", { className: "basis-128 text-center mb-4 text-5xl bg-gradient-to-r from-amber-100 to-amber-300 text-[#050505] font-extrabold flex justify-center mt-5" },
                react_1["default"].createElement(image_1["default"], { src: "/todo.svg", alt: "todo", width: 40, height: 40 }),
                react_1["default"].createElement("p", { className: "ml-2" }, "YourTODO")),
            react_1["default"].createElement("div", { className: "flex justify-items-center-safe ml-100 gap-4 mb-6 p-4 shadow w-280 text-black h-25 rounded-xl bg-[#eff1a0]" },
                react_1["default"].createElement("div", { className: "w-100 bg-[#FEFFDF] flex-1/3 rounded-xl" },
                    react_1["default"].createElement(addTodo_1["default"], { input: input, setInput: setInput, onAdd: function (e) {
                            e.preventDefault();
                            if (input.trim()) {
                                postTodoMutation.mutate({
                                    todo: input
                                });
                                setInput("");
                            }
                        } })),
                react_1["default"].createElement("div", { className: "flex-1/3 bg-[#FEFFDF] rounded-xl flex justify-center" },
                    react_1["default"].createElement(filterTodo_1["default"], { searchInput: searchInput, setSearchInput: setSearchInput, handleSearch: handleSearch })),
                react_1["default"].createElement("div", { className: "flex flex-1/3 justify-center bg-[#FEFFDF] rounded-xl" },
                    react_1["default"].createElement("div", { className: "flex flex-row mt-0.5" },
                        react_1["default"].createElement(selectBox_1["default"], { selectStatus: selectStatus, searchParams: searchParams, router: router }),
                        react_1["default"].createElement(sortOrder_1["default"], { selectedOrder: sortOrder, searchParams: searchParams, router: router }),
                        react_1["default"].createElement(selectedPageSize_1["default"], { SelectedPageSize: pageSize, onChangePageSize: handleChangePageSize })))),
            react_1["default"].createElement("div", null, data && (react_1["default"].createElement(statisticTodo_1["default"], { completedCount: data.completedCount || 0, unCompletedCount: data.unCompletedCount || 0 }))),
            react_1["default"].createElement("div", { className: "flex justify-end" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(deleteSelectedBtn_1.DeleteSelectedBtn, { selectedId: selectedId, onCount: Count(), onDelete: deleteMultiTodoMutation.mutate }))),
            isLoading ? (react_1["default"].createElement("div", { className: "text-center" }, "Loading...")) : todos.length === 0 ? (react_1["default"].createElement("div", { className: "text-center" }, "No result")) : (react_1["default"].createElement("div", { className: "ml-20 mt-10" },
                react_1["default"].createElement(Grid_1["default"], { container: true, spacing: 4, sx: {
                        justifyContent: "space-between"
                    }, columns: { xs: 4, sm: 8, md: 12 } }, todos.map(function (todo, idx) { return (react_1["default"].createElement(todoCard_1["default"], { key: todo.id, todo: todo, idx: idx, checked: !!checked[idx], editId: editId, editTodo: editTodo, setEditId: setEditId, setEditTodo: setEditTodo, onCheck: handleOnChange, onUpdate: updateTodoMutation.mutate, onDelete: deleteTodoMutation.mutate })); })))),
            data && (react_1["default"].createElement(pagination_1["default"], { currentPage: currentPage, total: data.total, pageSize: limit, router: router, searchParams: searchParams })))));
}
exports["default"] = TodoPage;
