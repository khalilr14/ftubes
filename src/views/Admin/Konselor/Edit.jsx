import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function KonselorEdit() {
  document.title = "Mengedit Konselor";

  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState([]);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`/api/admin/konselors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, role, phone } = response.data;
        setName(name);
        setRole(role);
        setPhone(phone);
      } catch (error) {
        toast.error("Failed to fetch data", {
          position: "top-right",
          duration: 4000,
        });
      }
    };

    fetchData();
  }, [id, token]);

  const updateKonselor = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("name", name);
    formData.append("role", role);
    formData.append("phone", phone);

    console.log("Form Data Entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await Api.put(`/api/admin/konselors/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message, {
        position: "top-right",
        duration: 4000,
      });
      navigate("/admin/konselors");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          duration: 4000,
        });
      }
    }
  };

  const roles = {
    BPH: [
      "Ketua",
      "Wakil Ketua",
      "Sekretaris",
      "Wakil Sekretaris",
      "Bendahara",
    ],
    "Pengembangan Seni & Kreativitas": [
      "Pengembangan Seni & Kreativitas - Ketua",
      "Pengembangan Seni & Kreativitas - Sekretaris",
      "Pengembangan Seni & Kreativitas - Anggota",
    ],
    "Pengembangan SDM": [
      "Pengembangan SDM - Ketua",
      "Pengembangan SDM - Sekretaris",
      "Pengembangan SDM - Anggota",
    ],
    "Ekonomi Kreatif": [
      "Ekonomi Kreatif - Ketua",
      "Ekonomi Kreatif - Sekretaris",
      "Ekonomi Kreatif - Anggota",
    ],
    "Media Kreativitas & Informasi": [
      "Media Kreativitas & Informasi - Ketua",
      "Media Kreativitas & Informasi - Sekretaris",
      "Media Kreativitas & Informasi - Anggota",
    ],
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/konselors"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Kembali
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil"></i> Edit Konselor
                  </h6>
                  <hr />
                  <form onSubmit={updateKonselor}>
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
                      <div className="alert alert-danger">{errors.image[0]}</div>
                    )}
                    <div className="mb-3">
                      <label className="form-label fw-bold">Nama Lengkap</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan Nama Lengkap"
                      />
                    </div>
                    {errors.name && (
                      <div className="alert alert-danger">{errors.name[0]}</div>
                    )}
                    <div className="mb-3">
                      <label className="form-label fw-bold">Jabatan</label>
                      <select
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">Pilih Jabatan</option>
                        {Object.keys(roles).map((group, idx) => (
                          <optgroup label={group} key={idx}>
                            {roles[group].map((roleOption, index) => (
                              <option key={index} value={roleOption}>
                                {roleOption}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    {errors.role && (
                      <div className="alert alert-danger">{errors.role[0]}</div>
                    )}
                    <div className="mb-3">
                      <label className="form-label fw-bold">No. WhatsApp</label>
                      <ReactPhoneInput
                        defaultCountry={"id"}
                        value={phone}
                        onChange={(value) => setPhone(value)}
                      />
                    </div>
                    {errors.phone && (
                      <div className="alert alert-danger">{errors.phone[0]}</div>
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
