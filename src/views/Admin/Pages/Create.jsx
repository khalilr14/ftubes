//import react
import { useState } from "react";

//import react router dom
import { Link, useNavigate } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

//import react Quill
import ReactQuill from "react-quill";

// quill CSS
import "react-quill/dist/quill.snow.css";

export default function PagesCreate() {
  //title page
  document.title = "Membuat Rekap Tentang";

  //navigata
  const navigate = useNavigate();

  //define state for form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "storePage"
  const storePage = async (e) => {
    e.preventDefault();

    //sending data
    await Api.post(
      "/api/admin/pages",
      {
        //data
        title: title,
        content: content,
      },
      {
        //header
        headers: {
          //header Bearer + Token
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/admin/pages");
      })
      .catch((error) => {
        //set error message to state "errors"
        setErros(error.response.data);
      });
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/pages"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Kembali
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil-alt"></i> Tambah Halaman
                  </h6>
                  <hr />
                  <form onSubmit={storePage}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Judul</label>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Masukkan Judul Halaman"
                      />
                    </div>
                    {errors.title && (
                      <div className="alert alert-danger">
                        {errors.title[0]}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-bold">Konten Berita</label>
                      <ReactQuill
                        theme="snow"
                        rows="5"
                        value={content}
                        onChange={(content) => setContent(content)}
                      />
                    </div>
                    {errors.content && (
                      <div className="alert alert-danger">
                        {errors.content[0]}
                      </div>
                    )}

                    <div>
                      <button
                        type="submit"
                        className="btn btn-md btn-primary me-2"
                      >
                        <i className="fa fa-save"></i> Simpan
                      </button>
                      <button type="reset" className="btn btn-md btn-warning">
                        <i className="fa fa-redo"></i> Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}