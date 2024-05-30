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

//import ReactPhoneInput
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


// quill CSS
import "react-quill/dist/quill.snow.css";
// Phone input CSS
import "react-phone-input-2/lib/style.css";

export default function ProductsCreate() {
  //title page
  document.title = "Membuat Produk";

  //navigate
  const navigate = useNavigate();

  //define state for form
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [owner, setOwner] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "storeProduct"
  const storeProduct = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("image", image);
    formData.append("title", title);
    formData.append("owner", owner);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("content", content);

    //sending data
    await Api.post("/api/admin/products", formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/admin/products");
      })
      .catch((error) => {
        //set error message to state "errors"
        setErros(error.response.data);
      });
  };

  // Function to handle price input
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/products"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Kembali
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil-alt"></i> Buat Produk
                  </h6>
                  <hr />
                  <form onSubmit={storeProduct}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Gambar</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                    {errors.image && (
                      <div className="alert alert-danger">
                        {errors.image[0]}
                      </div>
                    )}

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">Nama</label>
                          <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Title Product"
                          />
                        </div>
                        {errors.title && (
                          <div className="alert alert-danger">
                            {errors.title[0]}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">Phone</label>
                          <PhoneInput
                            country={"us"}
                            value={phone}
                            onChange={setPhone}
                            inputStyle={{ width: "100%" }}
                          />
                        </div>
                        {errors.phone && (
                          <div className="alert alert-danger">
                            {errors.phone[0]}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Content</label>
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

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">Owner</label>
                          <input
                            type="text"
                            className="form-control"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            placeholder="Enter Owner Product"
                          />
                        </div>
                        {errors.owner && (
                          <div className="alert alert-danger">
                            {errors.owner[0]}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">Price</label>
                          <input
                            type="text"
                            className="form-control"
                            value={price}
                            onChange={handlePriceChange}
                            placeholder="Enter Price Product"
                          />
                        </div>
                        {errors.price && (
                          <div className="alert alert-danger">
                            {errors.price[0]}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Address</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter Address"
                      ></textarea>
                    </div>
                    {errors.address && (
                      <div className="alert alert-danger">
                        {errors.address[0]}
                      </div>
                    )}

                    <div>
                      <button
                        type="submit"
                        className="btn btn-md btn-primary me-2"
                      >
                        <i className="fa fa-save"></i> Save
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
