//import Link
import { Link, useLocation } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

//import permissions
import hasAnyPermission from "../../utils/Permissions";

export default function sidebar() {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const activeRoute = pathname.split("/");

  //get data user from cookies
  const user = JSON.parse(Cookies.get("user"));

  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading"></div>
          <Link
            className={
              activeRoute[2] === "dashboard"
                ? "nav-link active-sidebar"
                : "nav-link"
            }
            to="/admin/dashboard"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Dashboard
          </Link>

          {(hasAnyPermission(["categories.index"]) ||
            hasAnyPermission(["posts.index"]) ||
            hasAnyPermission(["pages.index"]) ||
            hasAnyPermission(["anggotaroles.index"]) ||
            hasAnyPermission(["products.index"])) && (
            <>
              <div className="sb-sidenav-menu-heading">CONTENT MANAGEMENT</div>
              <a
                className={
                  "nav-link collapsed " +
                  (activeRoute[2] === "categories"
                    ? " active-sidebar"
                    : activeRoute[2] === "posts"
                    ? " active-sidebar"
                    : activeRoute[2] === "pages"
                    ? " active-sidebar"
                    : activeRoute[2] === "products"
                    ? " active-sidebar"
                    : activeRoute[2] === "anggotaroles"
                    ? " active-sidebar"
                    : "")
                }
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-pencil"></i>
                </div>
                Contents
                <div className="sb-sidenav-collapse-arrow">
                  <i
                    className="fas fa-angle-down"
                    style={{ color: "color: rgb(65 60 60)" }}
                  ></i>
                </div>
              </a>
            </>
          )}

          <div
            className={
              "collapse " +
              (activeRoute[2] === "categories"
                ? " show"
                : activeRoute[2] === "posts"
                ? " show"
                : activeRoute[2] === "pages"
                ? " show"
                : activeRoute[2] === "products"
                ? " show"
                : activeRoute[2] === "anggotaroles"
                ? " show"
                : "")
            }
            id="collapseLayouts"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              {hasAnyPermission(["categories.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "categories"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/categories"
                >
                  Categories
                </Link>
              )}

              {hasAnyPermission(["posts.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "posts"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/posts"
                >
                  Posts
                </Link>
              )}

              {hasAnyPermission(["pages.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "pages"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/pages"
                >
                  Pages
                </Link>
              )}

              {hasAnyPermission(["products.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "products"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/products"
                >
                  Products
                </Link>
              )}

              {hasAnyPermission(["anggotaroles.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "anggotaroles"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/anggotaroles"
                >
                  Anggota Roles
                </Link>
              )}
            </nav>
          </div>

          {(hasAnyPermission(["photos.index"]) ||
            hasAnyPermission(["sliders.index"])) && (
            <>
              <div className="sb-sidenav-menu-heading">MEDIA MANAGEMENT</div>
              <a
                className={
                  "nav-link collapsed " +
                  (activeRoute[2] === "photos"
                    ? " active-sidebar"
                    : activeRoute[2] === "sliders"
                    ? " active-sidebar"
                    : "")
                }
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseMedias"
                aria-expanded="false"
                aria-controls="collapseMedias"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-images"></i>
                </div>
                Media
                <div className="sb-sidenav-collapse-arrow">
                  <i
                    className="fas fa-angle-down"
                    style={{ color: "color: rgb(65 60 60)" }}
                  ></i>
                </div>
              </a>
            </>
          )}
          <div
            className={
              "collapse " +
              (activeRoute[2] === "photos"
                ? " show"
                : activeRoute[2] === "sliders"
                ? " show"
                : "")
            }
            id="collapseMedias"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              {hasAnyPermission(["photos.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "photos"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/photos"
                >
                  Photos
                </Link>
              )}

              {hasAnyPermission(["sliders.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "sliders"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/sliders"
                >
                  Sliders
                </Link>
              )}
            </nav>
          </div>

          {hasAnyPermission(["aparaturs.index"] || hasAnyPermission(["konselors.index"]))  && (
            <>
              <div className="sb-sidenav-menu-heading">OTHERS</div>
              <Link
                className={
                  activeRoute[2] === "aparaturs"
                    ? "nav-link active-sidebar"
                    : "nav-link"
                }
                to="/admin/aparaturs"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-user"></i>
                </div>
                Struktur
              </Link>

              <Link
                className={
                  activeRoute[2] === "konselors"
                    ? "nav-link active-sidebar"
                    : "nav-link"
                }
                to="/admin/konselors"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-user"></i>
                </div>
                Konselors
              </Link>

            </>
          )}

          {(hasAnyPermission(["roles.index"]) ||
            hasAnyPermission(["permissions.index"]) ||
            hasAnyPermission(["users.index"])) && (
            <>
              <div className="sb-sidenav-menu-heading">USERS MANAGEMENT</div>
              <a
                className={
                  "nav-link collapsed " +
                  (activeRoute[2] === "roles"
                    ? " active-sidebar"
                    : activeRoute[2] === "permissions"
                    ? " active-sidebar"
                    : activeRoute[2] === "users"
                    ? " active-sidebar"
                    : "")
                }
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseUsers"
                aria-expanded="false"
                aria-controls="collapseUsers"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-user-circle"></i>
                </div>
                Users
                <div className="sb-sidenav-collapse-arrow">
                  <i
                    className="fas fa-angle-down"
                    style={{ color: "color: rgb(65 60 60)" }}
                  ></i>
                </div>
              </a>
            </>
          )}
          <div
            className={
              "collapse " +
              (activeRoute[2] === "roles"
                ? " show"
                : activeRoute[2] === "permissions"
                ? " show"
                : activeRoute[2] === "users"
                ? " show"
                : "")
            }
            id="collapseUsers"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              {hasAnyPermission(["roles.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "roles"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/roles"
                >
                  Roles
                </Link>
              )}

              {hasAnyPermission(["permissions.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "permissions"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/permissions"
                >
                  Permissions
                </Link>
              )}

              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "users"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/users"
                >
                  Users
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        {user.email}
      </div>
    </nav>
  );
}