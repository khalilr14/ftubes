import React from "react";


export default function footer() {
  return (
    <footer>
      <div class="container-footer">
      <div class="footer">
        <div class="footer-content">
          <div class="footer-main">
            <h2>PP FGI SUMUT</h2>
            <p>Pengurus Provinsi Forum GenRe Indonesia Sumatera Utara</p>
            <div class="social-links">
              <a href="#"><i class="ph-fill ph-instagram-logo"></i></a>
              <a href="#"><i class="ph-fill ph-twitter-logo"></i></a>
              <a href="#"><i class="ph-fill ph-tiktok-logo"></i></a>
              <a href="#"><i class="ph-fill ph-facebook-logo"></i></a>
            </div>
          </div>
          <div class="links">
            <p>Informasi</p>
            <a href="" class="link">Beranda</a>
            <a href="" class="link">Tentang</a>
            <a href="" class="link">Galeri</a>
          </div>
          <div class="links">
            <p>Tentang Kami</p>
            <a href="" class="link">Struktur Organisasi</a>
            <a href="" class="link">Konselor Sebaya</a>
          </div>
          <div class="links">
            <p>Dari Kami</p>
            <a href="" class="link">Berita</a>
            <a href="" class="link">Produk</a>
          </div>
        </div>
        <div className="container-fluid footer-bottom">
        <div className="row p-3">
          <div className="text-center text-white font-weight-bold">
            Copyright © 2023 Salam GenRe. All Rights Reserved.
          </div>
        </div>
      </div>
      </div>
    </div>
    </footer>
  );
}