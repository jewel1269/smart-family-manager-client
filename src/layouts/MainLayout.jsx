import {
  DashboardRounded,
  AccountBalanceWalletRounded,
  ShoppingCartRounded,
  TaskRounded,
  SavingsRounded,
  AccountCircleRounded,
  LogoutRounded,
  DocumentScanner,
} from "@mui/icons-material";
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex">
      <div>
        {/* সাইডবার কনটেন্ট */}
        <Sidebar className="w-64 h-screen">
          <div className="text-lg font-bold text-white flex items-center justify-center h-16 bg-gradient-to-r from-blue-600 to-purple-600">
            🏠 স্মার্ট ফ্যামিলি ম্যানেজার
          </div>
          <Menu
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white",
                },
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                  color: "white",
                },
              },
            }}
          >
            <MenuItem
              icon={<DashboardRounded />}
              component={<NavLink to="/dashboard" />}
            >
              ড্যাশবোর্ড
            </MenuItem>

            <SubMenu label="আয় ও ব্যয়" icon={<AccountBalanceWalletRounded />}>
              <MenuItem component={<NavLink to="/Income" />}>আয়</MenuItem>
              <MenuItem component={<NavLink to="/Expense" />}>ব্যয়</MenuItem>
            </SubMenu>

            <SubMenu label="মুদির তালিকা" icon={<ShoppingCartRounded />}>
              <MenuItem component={<NavLink to="/create-GroceryList" />}>
                নতুন মুদির তালিকা
              </MenuItem>
              <MenuItem component={<NavLink to="/Grocery List" />}>
                মুদির তালিকা দেখুন
              </MenuItem>
            </SubMenu>

            <MenuItem
              icon={<TaskRounded />}
              component={<NavLink to="/Task-Manager" />}
            >
              টাস্ক ম্যানেজার
            </MenuItem>

            <MenuItem
              icon={<SavingsRounded />}
              component={<NavLink to="/Loan-Saving" />}
            >
              ঋণ ও সঞ্চয়
            </MenuItem>

            <MenuItem
              icon={<DocumentScanner />}
              component={<NavLink to="/Documents-Notes" />}
            >
              ডকুমেন্টস ও নোটস
            </MenuItem>

            <MenuItem
              icon={<AccountCircleRounded />}
              component={<NavLink to="/profile" />}
            >
              প্রোফাইল
            </MenuItem>

            <MenuItem
              icon={<LogoutRounded />}
              component={<NavLink to="/logout" />}
            >
              লগআউট
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
