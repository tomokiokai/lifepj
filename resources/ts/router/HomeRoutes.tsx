import { Home } from "../components/pages/Home";
import { UserManagement } from "../components/pages/UserManagement";
import { ShopManagement } from "../components/pages/ShopManagement";
import { MyPage } from "../components/pages/MyPage"; 

export const homeRoutes = [
  {
    path: "",
    element: <Home />
  },
  {
    path: "user_management",
    element: <UserManagement />
  },
  {
    path: "shop_management", 
    element: <ShopManagement />
  },
  {
    path: "mypage", 
    element: <MyPage />
  },
];
