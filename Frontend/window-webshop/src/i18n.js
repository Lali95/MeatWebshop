import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "companyLogoAlt": "Company Logo",
      "companyName": "Sülysápi Húsmester",
      "about": "About",
      "browse": "Browse",
      "searchPlaceholder": "Search",
      "profile": "Profile",
      "cart": "Cart",
      "logout": "Logout",
      "register": "Register",
      "login": "Login",
      "search": "Search",
      "browseItems": "Browse Items",
      "selectProduct": "Select product",
      "sausage": "Sausage",
      "steak": "Steak",
      "chicken": "Chicken",
      "shoppingCart": "Shopping Cart",
      "cartEmpty": "Your cart is empty",
      "pieces": "pieces",
      "price": "price",
      "removeAll": "Remove All",
      "sum": "Sum",
      "checkout": "Checkout",
      "error": "Error",
      "loading": "Loading...",
      "itemDetail": "Item Detail",
      "description": "Description",
      "addToCart": "Add to Cart",
      "back": "Back",
      "alreadyLoggedIn": "You are already logged in.",
      "logIn": "Log in",
      "email": "Email",
      "password": "Password",
      "profileHeading": "Profile",
      "yourBalance": "Your Balance",
      "role": "Role",
      "updateBalance": "Update Balance",
      "adminSection": "Admin Section",
      "addItemToStock": "Add Item to Stock",
      "quantity": "Quantity",
      "orders": "Orders",
      "enterData": "Enter your data",
      "username": "Username",
      "confirmPassword": "Confirm password",
      "dateOfBirth": "Date of birth",
      "address": "Address",
      "registering": "Registering...",
      "passwordsDoNotMatch": "Passwords do not match.",
      "orderDetails": "Order Details"
    }
  },
  hu: {
    translation: {
      "companyLogoAlt": "Cég Logó",
      "companyName": "Sülysápi Húsmester",
      "about": "Rólunk",
      "browse": "Böngészés",
      "searchPlaceholder": "Keresés",
      "profile": "Profil",
      "cart": "Kosár",
      "logout": "Kijelentkezés",
      "register": "Regisztráció",
      "login": "Bejelentkezés",
      "search": "Keresés",
      "browseItems": "Termékek Böngészése",
      "selectProduct": "Válasszon terméket",
      "sausage": "Kolbász",
      "steak": "Steak",
      "chicken": "Csirke",
      "shoppingCart": "Bevásárlókosár",
      "cartEmpty": "Az Ön kosara üres",
      "pieces": "darabok",
      "price": "ár",
      "removeAll": "Összes eltávolítása",
      "sum": "Összeg",
      "checkout": "Fizetés",
      "error": "Hiba",
      "loading": "Betöltés...",
      "itemDetail": "Termék részletei",
      "description": "Leírás",
      "addToCart": "Kosárba",
      "back": "Vissza",
      "alreadyLoggedIn": "Már be van jelentkezve.",
      "logIn": "Bejelentkezés",
      "email": "Email",
      "password": "Jelszó",
      "profileHeading": "Profil",
      "yourBalance": "Az egyenlege",
      "role": "Fiókstátusz",
      "updateBalance": "Egyenleg frissítése",
      "adminSection": "Adminisztrátor rész",
      "addItemToStock": "Tétel hozzáadása a készlethez",
      "quantity": "Mennyiség",
      "orders": "Rendelések",
      "enterData": "Adatok megadása",
      "username": "Felhasználónév",
      "confirmPassword": "Jelszó megerősítése",
      "dateOfBirth": "Születési dátum",
      "address": "Cím",
      "registering": "Regisztráció folyamatban...",
      "passwordsDoNotMatch": "A jelszavak nem egyeznek.",
      "orderDetails": "Rendelési adatok"
    }
  }
};

const savedLanguage = localStorage.getItem('language') || 'en'; 

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
