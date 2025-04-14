import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../features/dashboard/Dashboard";
import ExpenseForm from "../features/forms/expanse-form/expense-form";
import IncomeForm from "../features/forms/income-form/income-form";
import Profile from "../user-information/profile";
import Grocery from "../features/grocery/grocery";
import GroceryList from "../features/grocery/grocery-list";
import TaskHome from "../features/task/task-home";
import ExpenseList from "../features/forms/expanse-form/expense-list";
import IncomeList from "../features/forms/income-form/income-list";
import Savings from "../features/savings/savings";
import DocumentManager from "../features/document-manager/document-manager";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/expenseForm",
        element: <ExpenseForm />,
      },
      {
        path: "/expenseList",
        element: <ExpenseList />,
      },
      {
        path: "/incomeForm",
        element: <IncomeForm />,
      },
      {
        path: "/incomeList",
        element: <IncomeList />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/grocery",
        element: <Grocery />,
      },
      {
        path: "/groceryList",
        element: <GroceryList />,
      },
      {
        path: "/taskhome",
        element: <TaskHome />,
      },
      {
        path: "/savings",
        element: <Savings />,
      },
      {
        path: "/documentManager",
        element: <DocumentManager />,
      },
    ],
  },
]);

export default routes;
