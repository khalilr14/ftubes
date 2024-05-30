import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const { pathname } = location;
  const activeRoute = pathname.split("/");

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light nav-web">
        <div className="container">
          <div className="navbar-brand d-flex align-items-center">
            <img
              src="/images/logo-jbg.png"
              width="40"
              className="img-responsive"
              alt="Logo"
            />
            <div className="text-black ms-2">
              <h4 className="header-school">PP FGI SUMUT</h4>
            </div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === ""
                      ? "nav-link active"
                      : "nav-link "
                  }
                  to="/"
                >
                  <i className="fa fa-home"></i> Beranda
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "pages"
                      ? "nav-link active"
                      : "nav-link "
                  }
                  to="/pages"
                >
                  <i className="fa fa-info-circle"></i> Tentang
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "aparaturs"
                      ? "nav-link active"
                      : "nav-link "
                  }
                  to="/aparaturs"
                >
                  <i className="fa fa-users"></i> Struktur
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "konselors"
                      ? "nav-link active"
                      : "nav-link "
                  }
                  to="/konselors"
                >
                  <i className="fa fa-user-circle"></i> Konsul
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "posts"
                      ? "nav-link active"
                      : "nav-link "
                  }
                  to="/posts"
                >
                  <i className="fa fa-book"></i> Berita
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "products"
                      ? "nav-link active"
                      : "nav-link "
                  }
                  to="/products"
                >
                  <i className="fa fa-shopping-bag"></i> GenSuPly
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "photos"
                      ? "nav-link active"
                      : "nav-link "
                  }
                  to="/photos"
                >
                  <i className="fa fa-images"></i> Galeri
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "login"
                      ? "nav-link "
                      : "nav-link "
                  }
                  to="/login"
                >
                  <i className="fa fa-sign-in"></i> Masuk
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="jumbotron-header pb-3">
        <div className="container">
          <div className="row">
            <div className="row d-block d-md-none d-lg-none">
              <div className="col-md-6 text-center mt-3">
                <a href="#">
                  <img
                    src="/images/logo-jbg.png"
                    width="110"
                    className="img-responsive"
                    alt="Logo"
                  />
                </a>
              </div>
              <div className="col-md-12 text-center text-white mb-3">
                <h2 className="header-school">PP FGI SUMUT</h2>
                <hr />
                <div className="header-address">Pengurus Provinsi Forum GenRe Indonesia</div>
                <div className="header-address">Sumatera Utara</div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className=""
                style={{ marginTop: "0px" }}
              ></div>
              <form className="d-flex" action="#" method="GET"></form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
