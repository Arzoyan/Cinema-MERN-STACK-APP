import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "antd/dist/antd"; // Import Ant Design styles
import App from "./App";
import RoomsPage from "./pages/RoomsPage.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<RoomsPage />} />
          <Route path="/movies" element={<MoviePage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>,
);
