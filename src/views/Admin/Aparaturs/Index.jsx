//import useState and useEffect
import { useState, useEffect } from "react";

//import Link from react router dom
import { Link } from "react-router-dom";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import permissions
import hasAnyPermission from "../../../utils/Permissions";

//import pagination component
import Pagination from "../../../components/general/Pagination";

//import react-confirm-alert
import { confirmAlert } from "react-confirm-alert";

//import CSS react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css";

//import toast
import toast from "react-hot-toast";

export default function AparatursIndex() {
  //title page
  document.title = "Struktur Anggota";

  //define state "aparaturs"
  const [aparaturs, setAparaturs] = useState([]);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //define state "keywords"
  const [keywords, setKeywords] = useState("");

  //token from cookies
  const token = Cookies.get("token");

  //function fetchData
  const fetchData = async (pageNumber = 1, keywords = "") => {
    //define variable "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/aparaturs?search=${keywords}&page=${page}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "setAparaturs"
      setAparaturs(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchData"
    fetchData();
  }, []);

  //function "searchData"
  const searchData = async (e) => {
    //set value to state "keywords"
    setKeywords(e.target.value);

    //call function "fetchData"
    fetchData(1, e.target.value);
  };

  //function "deleteAparatur"
  const deleteAparatur = (id) => {
    //show confirm alert
    confirmAlert({
      title: "Apakah Anda Yakin ?",
      message: "Ingin Menghapus Data Ini ?",
      buttons: [
        {
          label: "YA",
          onClick: async () => {
            await Api.delete(`/api/admin/aparaturs/${id}`, {
              //header
              headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              //show toast
              toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
              });

              //call function "fetchData"
              fetchData();
            });
          },
        },
        {
          label: "TIDAK",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {hasAnyPermission(["aparaturs.create"]) && (
                  <div className="col-md-3 col-12 mb-2">
                    <Link
                      to="/admin/aparaturs/create"
                      className="btn btn-md btn-primary border-0 shadow-sm w-100"
                      type="button"
                    >
                      <i className="fa fa-plus-circle"></i> Tambah Baru
                    </Link>
                  </div>
                )}
                <div className="col-md-9 col-12 mb-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
                      onChange={(e) => searchData(e)}
                      placeholder="Cari Disini..."
                    />
                    <span className="input-group-text border-0 shadow-sm">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-12">
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-centered mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0">
                          <th className="border-0" style={{ width: "5%" }}>
                            No.
                          </th>
                          <th className="border-0">Gambar</th>
                          <th className="border-0">Nama Lengkap</th>
                          <th className="border-0">Jabatan</th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //cek apakah data ada
                          aparaturs.length > 0 ? (
                            //looping data "aparaturs" dengan "map"
                            aparaturs.map((aparatur, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td className="text-center">
                                  <img src={aparatur.image} width="50" />
                                </td>
                                <td>{aparatur.name}</td>
                                <td>{aparatur.role}</td>
                                <td className="text-center">
                                  {hasAnyPermission(["aparaturs.edit"]) && (
                                    <Link
                                      to={`/admin/aparaturs/edit/${aparatur.id}`}
                                      className="btn btn-primary btn-sm me-2"
                                    >
                                      <i className="fa fa-pencil-alt"></i>
                                    </Link>
                                  )}

                                  {hasAnyPermission(["aparaturs.delete"]) && (
                                    <button
                                      onClick={() =>
                                        deleteAparatur(aparatur.id)
                                      }
                                      className="btn btn-danger btn-sm"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            //tampilkan pesan data belum tersedia
                            <tr>
                              <td colSpan={5}>
                                <div
                                  className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                  role="alert"
                                >
                                  Data Belum Tersedia!.
                                </div>
                              </td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    currentPage={pagination.currentPage}
                    perPage={pagination.perPage}
                    total={pagination.total}
                    onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}