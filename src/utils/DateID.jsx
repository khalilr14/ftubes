export default function dateID(date) {
  let e = date.getDate();
  return `${e} ${
    [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ][date.getMonth()]
  } ${date.getFullYear()}`;
}