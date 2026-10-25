import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchUserCart, syncUserCart, clearUserCartAPI } from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Wrapped in useCallback so we can call it whenever login happens
  const loadUserCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      const data = await fetchUserCart();
      const formattedItems = (data.items || []).map((item) => ({
        ...item.productId,
        quantity: item.quantity,
        _id: item.productId._id || item.productId,
      }));
      setCartItems(formattedItems);
    } catch (error) {
      console.error("Failed to load cart from database:", error);
      setCartItems([]);
    }
  }, []);

  // Load cart on initial mount
  useEffect(() => {
    loadUserCart();
  }, [loadUserCart]);

  // Helper to sync updated items list with backend database
  const updateBackendCart = async (newItems) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payloadItems = newItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));
      await syncUserCart(payloadItems);
    } catch (error) {
      console.error("Failed to sync cart with database:", error);
    }
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item._id === product._id
      );

      let updatedItems;
      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
      }

      updateBackendCart(updatedItems);
      return updatedItems;
    });
  };

  const increaseQuantity = (_id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item._id === _id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      updateBackendCart(updatedItems);
      return updatedItems;
    });
  };

  const decreaseQuantity = (_id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) =>
          item._id === _id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      updateBackendCart(updatedItems);
      return updatedItems;
    });
  };

  const removeFromCart = (_id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item._id !== _id);
      updateBackendCart(updatedItems);
      return updatedItems;
    });
  };

  const clearCart = async () => {
    setCartItems([]);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await clearUserCartAPI();
      } catch (error) {
        console.error("Failed to clear cart on backend:", error);
      }
    }
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        loadUserCart, // <-- Exposed so your Login component can trigger it!
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);