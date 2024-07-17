import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

// import "./App.css";
// import Nav from "./components/Nav";
// import Footer from "./components/Footer";
// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Main from "./page/Main";
// import Cart from "./page/Cart";
// import Login from "./page/Login";
// import Detail from "./page/Detail";
// import Category from "./page/Category";
// import Kakao from "./page/Kakao";

// function App() {
//   return (
//     <BrowserRouter basename={process.env.PUBLIC_URL}>
//       <Nav />
//       <Routes>
//         <Route path="/" element={<Main />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/detail/:id" element={<Detail />} />
//         <Route path="/:category" element={<Category />} />
//         <Route path="/kakao/oauth" element={<Kakao />} />
//       </Routes>
//       <Footer />
//     </BrowserRouter>
//   );
// }
