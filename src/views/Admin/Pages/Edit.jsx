//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

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

export default function PageEdit() {
  //title page
  document.title = "Mengedit Rekap Tentang";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //define state for form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "fetchDataPage"
  const fetchDataPage = async () => {
    await Api.get(`/api/admin/pages/${id}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call function "fetchDataPage"
    fetchDataPage();
  }, []);

  //function "updatePage"
  const updatePage = async (e) => {
    e.preventDefault();

    //sending data
    await Api.post(
      `/api/admin/pages/${id}`,
      {
        //data
        title: title,
        content: content,
        _method: "PUT",
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
                    <i className="fa fa-pencil-alt"></i> Edit Halaman
                  </h6>
                  <hr />
                  <form onSubmit={updatePage}>
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
                      <label className="form-label fw-bold">Konten</label>
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
                        <i className="fa fa-save"></i> Perbarui
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