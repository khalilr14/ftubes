//import css bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//import font awesome
import "@fortawesome/fontawesome-free/js/all.js";

export default function auth({ children }) {
  return (
    <div
      style={{
        backgroundImage: "url(/images/bg.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-center h-100">{children}</div>
      </div>
    </div>
  );
}