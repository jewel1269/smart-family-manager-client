import {
  DashboardRounded,
  AccountBalanceWalletRounded,
  ShoppingCartRounded,
  TaskRounded,
  SavingsRounded,
  AccountCircleRounded,
  LogoutRounded,
  DocumentScanner,
  AttachMoney,
  ListAlt,
  ShoppingBasket,
  AddCircleOutline,
} from "@mui/icons-material";
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  const admin = true;
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
              icon={<DashboardRounded style={{ color: "#1e88e5" }} />}
              component={<NavLink to="/dashboard" />}
            >
              ড্যাশবোর্ড
            </MenuItem>

            <SubMenu
              label="আয় ও ব্যয়"
              icon={
                <AccountBalanceWalletRounded style={{ color: "#4caf50" }} />
              }
            >
              <MenuItem component={<NavLink to="/incomeForm" />}>
                <AddCircleOutline style={{ color: "#ff9800" }} /> আয় লিখো
              </MenuItem>
              <MenuItem component={<NavLink to="/incomeList" />}>
                <ListAlt style={{ color: "#ff9800" }} /> আয় দেখো
              </MenuItem>
              <MenuItem component={<NavLink to="/expenseForm" />}>
                <AddCircleOutline style={{ color: "#ff5722" }} /> ব্যয় সংযোজন 
              </MenuItem>
              <MenuItem component={<NavLink to="/expenseList" />}>
                <ListAlt style={{ color: "#ff5722" }} /> ব্যয় দেখো
              </MenuItem>
            </SubMenu>

            <SubMenu
              label="মুদির তালিকা"
              icon={<ShoppingCartRounded style={{ color: "#8bc34a" }} />}
            >
              <MenuItem component={<NavLink to="/grocery" />}>
                <ShoppingBasket style={{ color: "#ff7043" }} /> নতুন মুদির
                তালিকা
              </MenuItem>
              <MenuItem component={<NavLink to="/GroceryList" />}>
                <ListAlt style={{ color: "#ff7043" }} /> মুদির তালিকা দেখুন
              </MenuItem>
            </SubMenu>

            <MenuItem
              icon={<TaskRounded style={{ color: "#9c27b0" }} />}
              component={<NavLink to="/taskhome" />}
            >
              টাস্ক ম্যানেজার
            </MenuItem>

            <MenuItem
              icon={<SavingsRounded style={{ color: "#673ab7" }} />}
              component={<NavLink to="/savings" />}
            >
              ঋণ ও সঞ্চয়
            </MenuItem>

            <MenuItem
              icon={<DocumentScanner style={{ color: "#607d8b" }} />}
              component={<NavLink to="/documentManager" />}
            >
              ডকুমেন্টস ও নোটস
            </MenuItem>

            {admin === true ? (
              <MenuItem
                icon={<AccountCircleRounded style={{ color: "#3f51b5" }} />}
                component={<NavLink to="/profile" />}
              >
                প্রোফাইল
              </MenuItem>
            ) : (
              <MenuItem
                icon={<AccountCircleRounded style={{ color: "#3f51b5" }} />}
                component={<NavLink to="/profile" />}
              >
                প্রোফাইল2
              </MenuItem>
            )}

            <MenuItem
              icon={<LogoutRounded style={{ color: "#f44336" }} />}
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
