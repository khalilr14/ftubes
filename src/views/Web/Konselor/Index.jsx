import React, { useState, useEffect } from "react";
import LayoutWeb from "../../../layouts/Web";
import Api from "../../../services/Api";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import Loading from "../../../components/general/Loading";

const Konselors = () => {
  document.title = "Konselors - De";
  const [konselors, setKonselors] = useState([]);
  const [loadingKonselor, setLoadingKonselor] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDataKonselors = async () => {
    setLoadingKonselor(true);
    try {
      const response = await Api.get("/api/public/konselor");
      setKonselors(response.data.data);
      setLoadingKonselor(false);
    } catch (error) {
      console.error("Error fetching konselors:", error);
      setLoadingKonselor(false);
    }
  };

  useEffect(() => {
    fetchDataKonselors();
  }, []);

  const handleWhatsApp = (phone, name) => {
    const formattedPhone = phone.replace(/\D/g, "");
    const message = encodeURIComponent(`Halo kak ${name}. Saya mau konsul`);
    window.open(`https://api.whatsapp.com/send?phone=${formattedPhone}&text=${message}`, "_blank");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter konselors based on the search term
  const filteredKonselors = konselors.filter((konselor) =>
    konselor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-user-circle"></i> Konsul Teman Seb
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Cari konselor..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="row">
          {loadingKonselor ? (
            <Loading />
          ) : filteredKonselors.length > 0 ? (
            filteredKonselors.map((konselor, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="card border-3 border-black shadow-sm aparatur-card">
                  <img
                    src={konselor.image}
                    className="card-img-top aparatur-image"
                    alt={konselor.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{konselor.name}</h5>
                    <p className="card-text">{konselor.role}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleWhatsApp(konselor.phone, konselor.name)}
                    >
                      <i className="fab fa-whatsapp"></i> Hubungi via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <AlertDataEmpty />
          )}
        </div>
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

export default Konselors;
