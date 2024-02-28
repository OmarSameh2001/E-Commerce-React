import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import { UserContextProvider } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductPage from "./Components/ProductPage/ProductPage";
import CartContextProvider from "./Context/cartContext";
import { ToastContainer } from "react-toastify";
import Checkout from "./Components/Checkout/Checkout";
import Orders from "./Components/Orders/Orders";
import NotFound from "./Components/NotFound/NotFound";
import WishListContextProvider from "./Context/wishlistContext";
import Wishlist from "./Components/Wishlist/Wishlist";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import EmailReset from "./Components/EmailReset/EmailReset";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/E-Commerce-React",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/E-Commerce-React",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/productpage/:id",
          element: (
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },

        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/resetcode",
          element: <EmailReset />,
        },
        {
          path: "/forget",
          element: <ForgetPassword />,
        },
        {
          path: "/*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <UserContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={route} />
            <ToastContainer />
          </QueryClientProvider>
        </WishListContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
