import {
  MenuRounded,
  DashboardRounded,
  AccountBalanceWalletRounded,
  ShoppingCartRounded,
  TaskRounded,
  SavingsRounded,
  AccountCircleRounded,
  LogoutRounded,
  ListAlt,
  ShoppingBasket,
  AddCircleOutline,
  CalculateOutlined,
  ResetTvOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { handleLogout } from "../services/api";
import { Toaster } from "react-hot-toast";
import useUser from "../hooks/useUser";

const MainLayout = () => {
  const navigate = useNavigate();
  const { data } = useUser();
  const user = data?.data || "";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const Logout = () => {
    handleLogout(navigate);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Hamburger Icon for Mobile */}
 
      <button
        className="md:hidden absolute top-4 left-4 z-50 p-2 bg-white rounded shadow"
        onClick={toggleSidebar}
      >
        <MenuRounded />
      </button>
    
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40  bg-opacity-30 md:hidden" onClick={toggleSidebar}></div>
      )}
      <div
        className={`fixed z-50 md:static transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar className="w-64 h-screen  bg-white shadow-lg border-r">
          <div className="text-lg font-bold text-white flex items-center justify-center h-16 bg-gradient-to-r from-indigo-600 to-purple-600 tracking-wide">
            🏠 স্মার্ট ফ্যামিলি ম্যানেজার
          </div>
          <Menu
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white",
                  fontWeight: "bold",
                },
                "&:hover": {
                  background: "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                  color: "white",
                },
              },
            }}
          >
            <MenuItem icon={<DashboardRounded />} component={<NavLink to="/dashboard" />}>
              ড্যাশবোর্ড
            </MenuItem>
            <SubMenu label="আয় ও ব্যয়" icon={<AccountBalanceWalletRounded />}>
              <MenuItem component={<NavLink to="/incomeForm" />}>
                <AddCircleOutline /> আয় লিখো
              </MenuItem>
              <MenuItem component={<NavLink to="/incomeList" />}>
                <ListAlt /> আয় দেখো
              </MenuItem>
              <MenuItem component={<NavLink to="/expenseForm" />}>
                <AddCircleOutline /> ব্যয় সংযোজন
              </MenuItem>
              <MenuItem component={<NavLink to="/expenseList" />}>
                <ListAlt /> ব্যয় দেখো
              </MenuItem>
            </SubMenu>
            <SubMenu label="মুদির তালিকা" icon={<ShoppingCartRounded />}>
              <MenuItem component={<NavLink to="/grocery" />}>
                <ShoppingBasket /> নতুন মুদির তালিকা
              </MenuItem>
              <MenuItem component={<NavLink to="/GroceryList" />}>
                <ListAlt /> মুদির তালিকা দেখুন
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<TaskRounded />} component={<NavLink to="/taskhome" />}>
              টাস্ক ম্যানেজার
            </MenuItem>
            <MenuItem icon={<SavingsRounded />} component={<NavLink to="/savings" />}>
              ঋণ ও সঞ্চয়
            </MenuItem>
            <MenuItem icon={<CalculateOutlined />} component={<NavLink to="/calculator" />}>
              ক্যালকুলেটর
            </MenuItem>
            {user?.role === "admin" && (
              <MenuItem icon={<ResetTvOutlined />} component={<NavLink to="/semester" />}>
                সেমিস্টার তালিকা
              </MenuItem>
            )}
            <MenuItem icon={<AccountCircleRounded />} component={<NavLink to="/profile" />}>
              প্রোফাইল
            </MenuItem>
            <MenuItem icon={<LogoutRounded />} onClick={Logout}>
              লগআউট
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 z-10">
        <Outlet />
      </div>

      <Toaster position="bottom-center" />
    </div>
  );
};

export default MainLayout;
