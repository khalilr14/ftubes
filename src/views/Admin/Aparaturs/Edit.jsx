//import React
import React, { useState, useEffect } from "react";

//import React Router DOM
import { Link, useNavigate, useParams } from "react-router-dom";

//import Layout
import LayoutAdmin from "../../../layouts/Admin";

//import API
import Api from "../../../services/Api";

//import js-cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

export default function AparatursEdit() {
  //title page
  document.title = "Mengedit struktur Anggota";

  //navigate
  const navigate = useNavigate();

  //get ID from URL parameter
  const { id } = useParams();

  //define states for form fields
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  //define state for list of roles
  const rolesList = [
    "Ketua",
    "Wakil Ketua",
    "Sekretaris",
    "Wakil Sekretaris",
    "Bendahara",
    "Anggota",
    "Pengembangan Seni & Kreativitas - Ketua",
    "Pengembangan Seni & Kreativitas - Sekretaris",
    "Pengembangan Seni & Kreativitas - Anggota",
    "Pengembangan SDM - Ketua",
    "Pengembangan SDM - Sekretaris",
    "Pengembangan SDM - Anggota",
    "Ekonomi Kreatif - Ketua",
    "Ekonomi Kreatif - Sekretaris",
    "Ekonomi Kreatif - Anggota",
    "Media Kreativitas & Informasi - Ketua",
    "Media Kreativitas & Informasi - Sekretaris",
    "Media Kreativitas & Informasi - Anggota",
  ];

  //get token from cookies
  const token = Cookies.get("token");

  //fetch aparatur data by ID
  const fetchAparatur = async () => {
    try {
      const response = await Api.get(`/api/admin/aparaturs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      setName(data.name);
      setRole(data.role);
      setPhone(data.phone);
    } catch (error) {
      console.error("Error fetching aparatur:", error);
    }
  };

  // useEffect to fetch aparatur data
  useEffect(() => {
    fetchAparatur();
  }, []);

  //function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //create FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("phone", phone);
    if (image) {
      formData.append("image", image);
    }
    formData.append("_method", "PUT");

    try {
      const response = await Api.post(`/api/admin/aparaturs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      //show success toast
      toast.success(response.data.message, {
        position: "top-right",
        duration: 4000,
      });
      //redirect to aparatur list page
      navigate("/admin/aparaturs");
    } catch (error) {
      //set error state
      setErrors(error.response.data);
    }
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/aparaturs"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Kembali
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil"></i> Edit Struktur Anggota
                  </h6>
                  <hr />
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Gambar</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      {errors.image && (
                        <div className="alert alert-danger">
                          {errors.image[0]}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Nama Lengkap</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan Nama Lengkap"
                      />
                      {errors.name && (
                        <div className="alert alert-danger">
                          {errors.name[0]}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Jabatan</label>
                      <select
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">Pilih Jabatan</option>
                        {rolesList.map((roleItem, index) => (
                          <option key={index} value={roleItem}>
                            {roleItem}
                          </option>
                        ))}
                      </select>
                      {errors.role && (
                        <div className="alert alert-danger">
                          {errors.role[0]}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">No. Whatsapp</label>
                      <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Masukkan No. WhatsApp"
                      />
                      {errors.phone && (
                        <div className="alert alert-danger">
                          {errors.phone[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-md btn-primary me-2"
                      >
                        <i className="fa fa-save"></i> Update
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
