import React, { useState, useEffect } from "react";
import LayoutWeb from "../../../layouts/Web";
import Api from "../../../services/Api";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import Loading from "../../../components/general/Loading";
import { useNavigation } from "react-router-dom";

const Aparaturs = () => {
  document.title = "Aparatur - PP FGI SUMUT";
  const [aparaturs, setAparaturs] = useState([]);
  const [loadingAparatur, setLoadingAparatur] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDataAparaturs = async () => {
    setLoadingAparatur(true);
    await Api.get("/api/public/aparaturs").then((response) => {
      setAparaturs(response.data.data);
      setLoadingAparatur(false);
    });
  };

  useEffect(() => {
    fetchDataAparaturs();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const roles = {
    BPH: ["Ketua", "Wakil Ketua", "Sekretaris", "Wakil Sekretaris", "Bendahara"],
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

  const getSortedAparaturs = () => {
    // Jika ada pencarian, kembalikan daftar aparatur yang difilter berdasarkan pencarian
    if (searchTerm) {
      return aparaturs.filter((aparatur) =>
        aparatur.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Jika tidak ada pencarian, kembalikan daftar aparatur yang diurutkan berdasarkan peran di dalam divisi
    return aparaturs.sort((a, b) => {
      const roleA = Object.values(roles).flat().indexOf(a.role);
      const roleB = Object.values(roles).flat().indexOf(b.role);
      return roleA - roleB;
    });
  };

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-user-circle"></i> Aparatur PP FGI SU
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Cari aparatur..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        {loadingAparatur ? (
          <Loading />
        ) : (
          <>
            {Object.keys(roles).map((group, idx) => (
              <div key={idx}>
                <h6 className="mt-4 mb-2">{group}</h6>
                <div className="row">
                  {getSortedAparaturs()
                    .filter((aparatur) => roles[group].includes(aparatur.role))
                    .map((aparatur) => (
                      <div className="col-md-4 mb-4" key={aparatur.id}>
                        <div className="card border-4 border-black shadow-sm aparatur-card">
                          <img
                            src={aparatur.image}
                            className="card-img-top aparatur-image"
                            alt={aparatur.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{aparatur.name}</h5>
                            <p className="card-text">{aparatur.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </>
        )}
        {(!loadingAparatur && getSortedAparaturs().length === 0) && <AlertDataEmpty />}
      </div>
      <style jsx>{`
        .aparatur-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }
      `}</style>
    </LayoutWeb>
  );
};

export default Aparaturs;
