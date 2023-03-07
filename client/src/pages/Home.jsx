import React, { useState, useEffect } from "react";
import axios from "axios";
import item1 from "../assets/image 2.png";
import "./Home.css";

import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsFillCalendarEventFill } from "react-icons/bs";
import jamIcon from "../assets/jam ICON.png";
import hallIcon from "../assets/Frame.png";
import kantinIcon from "../assets/Frame (1).png";
import martIcon from "../assets/Frame (2).png";
import mualafIcon from "../assets/Frame (3).png";
import image1 from "../assets/image 3.png";
import image2 from "../assets/image 4.png";
import image3 from "../assets/image 5.png";
import image4 from "../assets/image 12.png";
import image5 from "../assets/image 8.png";
import image6 from "../assets/image 9 (1).png";
import Calendar from "react-calendar";
import moment from "moment";
import "moment/locale/id";

const Home = () => {
  const baseUrl = "http://localhost:3000";
  const [jadwalSolat, setJadwalSolat] = useState();
  const [time, setTime] = useState(new Date());
  const [intervalId, setIntervalId] = useState(null);
  const [hijri, setHijri] = useState(null);
  const [stamp, setStamp] = useState({ month: time?.getMonth() + 1, year: time?.getFullYear() });
  const [dateBokking, setDateBokking] = useState([]);
  // const monthName = moment(time).locale("id").format("MMMM");

  const onActiveStartDateChangeHandler = ({ activeStartDate, value, view }) => {
    setStamp({ month: activeStartDate.getMonth() + 1, year: activeStartDate.getFullYear() });
  };

  const data = [
    {
      title: "Andalusia Islamic Camp",
      description: "Liburan anak islami dengan berbagai tema yang hanya ada Masjid Andalusia Islamic Center.",
      img: image1,
    },
    {
      title: "Kajian Andalusia",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur leo dolor, eget aliquetasdihisdahihsaadads",
      img: image2,
    },
    {
      title: "Mualaf Center",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur leo dolor, eget aliquetasdihisdahihsadsasds",
      img: image3,
    },
  ];

  const getJamSolat = async () => {
    try {
      const response = await axios.get(
        `https://api.banghasan.com/sholat/format/json/jadwal/kota/703/tanggal/${time.getFullYear()}-${time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1}-${
          time.getDate() < 10 ? "0" + time.getDate() : time.getDate()
        }`
      );
      console.log(response.data.jadwal.data);
      setJadwalSolat(response.data.jadwal.data);
    } catch (error) {
      console.log(error);
    }
  };

  const bulan = ["Januari", "Februari", "Maret", "April", "May", "Juni", "Juli", "Agustust", "September", "Oktober", "November", "Desember"];

  const fasilitas = [
    { icon: hallIcon, description: "Alhambra Hall" },
    { icon: kantinIcon, description: "Kantin Halal" },
    { icon: martIcon, description: "Tazkia Mart" },
    { icon: mualafIcon, description: "Mualaf Center" },
  ];

  function solat(time) {
    const jadwal = `${time.getHours() >= 10 ? time.getHours().toString() : "0" + time.getHours().toString()}:${time.getMinutes() >= 10 ? time.getMinutes().toString() : "0" + time.getMinutes().toString()}`;

    if (jadwal >= jadwalSolat?.subuh && jadwal < jadwalSolat?.dzuhur) {
      return "Subuh";
    } else if (jadwal >= jadwalSolat?.dzuhur && jadwal < jadwalSolat?.ashar) {
      return "Dzuhur";
    } else if (jadwal >= jadwalSolat?.ashar && jadwal < jadwalSolat?.maghrib) {
      return "Ashar";
    } else if (jadwal >= jadwalSolat?.maghrib && jadwal < jadwalSolat?.isya) {
      return "Maghrib";
    } else if (jadwal >= jadwalSolat?.isya || jadwal !== "03:00") {
      return "Isya";
    }
  }

  const getTanggalIslamic = async () => {
    try {
      const response = await axios.get(`http://api.aladhan.com/v1/gToH/${time?.getDate()}-${time?.getMonth() + 1}-${time?.getFullYear()}`);
      setHijri(response.data.data.hijri);
    } catch (error) {
      console.log(error);
    }
  };

  const getBokking = async () => {
    try {
      const response = await axios.get(`${baseUrl}/booking/getdate?year=${stamp?.year}&month=${stamp?.month}`);
      setDateBokking(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    setIntervalId(id);
    getTanggalIslamic();
    getJamSolat();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    getBokking();
  }, [stamp]);

  return (
    <section className="container">
      <Carousel showStatus={false} showThumbs={false} showArrows={false} autoPlay={true} infiniteLoop={true} interval={5000}>
        <div className="carousel-item">
          <img src={item1} />
          <div className="color-overlay"></div>
          <div className="description">
            <h1>Oase Spiritual And Financial Umat</h1>
            <p>
              Andalusia Islamic Center (AIC) hadir karena kepedulian akan masalah besar bangsa dan umat Islam Indonesia yang di dominasi oleh kemiskinan, keterbelakangan pendidikan serta rendahnya moralitas baik ditingkat birokrasi maupun
              swasta.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={item1} className="image" />
          <div className="color-overlay"></div>
          <div className="description">
            <h1>Oase Spiritual And Financial Umat</h1>
          </div>
        </div>
      </Carousel>

      <div className="content-1">
        <div className="floating-item">
          <div className="flex-item">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Fasilitas</p>
                <Link style={{ textDecoration: "none", fontSize: "14px", color: "#1EA3C0" }}>Selengkapnya</Link>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "20px", flexWrap: "wrap" }}>
                {fasilitas.map((item, index) => (
                  <div key={index} style={{ cursor: "pointer" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ border: "3px solid #1F4690", height: "50px", width: "50px", borderRadius: "5px", padding: "10px" }}>
                        <img src={item.icon} width="100%" />
                      </div>
                      <p style={{ fontSize: "12px", marginTop: "5px" }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-item">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p>Bogor</p>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "400", fontSize: "10px", lineHeight: "20px" }}>
                    {time.getDate()} {bulan[time.getMonth()]} {time.getFullYear()}
                  </p>
                  <span style={{ height: "20px", width: "1px", backgroundColor: "#232323", marginLeft: "16px", marginRight: "16px" }}></span>
                  <p style={{ fontWeight: "400", fontSize: "10px", lineHeight: "20px" }}>
                    {hijri?.day} {hijri?.month.en} {hijri?.year}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "20px", alignItems: "center" }}>
                <img src={jamIcon} width="30px" />
                <div style={{ flex: 1, border: "2px solid #1F4690", marginLeft: "16px", borderRadius: "5px", padding: "2px 8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                    <p style={{ fontWeight: "700", fontSize: "20px", lineHeight: "49px", color: "#000000" }}>{`${solat(time)}`}</p>
                    <p style={{ fontWeight: "700", fontSize: "20px", lineHeight: "49px", color: "#000000" }}>{`${time.getHours() >= 10 ? time.getHours() : "0" + time.getHours()} : ${
                      time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes()
                    } WIB`}</p>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <p style={{ fontSize: "10px" }}>Berdasarkan lokasi Masjid Andalusia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <h1 style={{ textAlign: "center", marginBottom: "100px" }} id="title-content">
          Program Andalusia Islamic Center
        </h1>
        <div className="listItem">
          <div className="list-program">
            {data.map((item, index) => (
              <div className="program-item" key={index}>
                <div style={{ height: "200px", width: "100%" }}>
                  <img src={item.img} className="image" style={{ borderRadius: "10px 10px 0 0" }} />
                </div>
                <div style={{ height: "auto", width: "100%", padding: "16px 16px", backgroundColor: "#fff", borderRadius: "0px 0px 10px 10px" }}>
                  <p id="title">{item.title}</p>
                  <p style={{ fontSize: "12px" }} id="des-program">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="program">
          <div id="arrow">
            <MdKeyboardArrowDown size="25px" color="#fff" />
          </div>
        </div>
      </div>

      <div className="content flex">
        <div className="flex-item">
          <h1>Al Hambra Ballroom</h1>
          <p style={{ marginTop: "20px", marginBottom: "20px" }}>
            Andalusia Islamic Center (AIC) hadir karena kepedulian akan masalah besar bangsa dan umat Islam Indonesia yang di dominasi oleh kemiskinan, keterbelakangan pendidikan serta rendahnya moralitas baik ditingkat birokrasi maupun
            swasta.
          </p>
          <button className="btn">
            <BsFillCalendarEventFill size="25px" />
            Cek Jadwal Gedung
          </button>
        </div>
        <div className="flex-item">
          <Calendar
            locale="id-ID"
            onActiveStartDateChange={onActiveStartDateChangeHandler}
            tileClassName={({ date, view }) => {
              if (dateBokking.find((bookDate) => parseInt(bookDate) === date.getDate() && stamp.month === date.getMonth() + 1)) {
                return "highlight";
              }
            }}
          />
        </div>
      </div>

      <div className="content flex" style={{ paddingBottom: "100px", columnGap: "24px" }}>
        <div className="flex-item">
          <div style={{ display: "flex" }}>
            <div>
              <img src={image4} width="100%" height="auto" />
            </div>
            <div style={{ transform: "translateY(-40PX)" }}>
              <img src={image4} width="100%" height="auto" />
            </div>
            <div>
              <img src={image4} width="100%" height="auto" />
            </div>
          </div>
        </div>
        <div className="flex-item" style={{ alignSelf: "center" }}>
          <h1>Galeri</h1>
          <p style={{ marginTop: "20px" }}>
            Andalusia Islamic Center (AIC) hadir karena kepedulian akan masalah besar bangsa dan umat Islam Indonesia yang di dominasi oleh kemiskinan, keterbelakangan pendidikan serta rendahnya moralitas baik ditingkat birokrasi maupun
            swasta.
          </p>
        </div>
      </div>

      <div className="insert full-bleed flex" style={{ columnGap: "36px", height: "100%" }}>
        <div className="flex-item">
          <h1 style={{ marginBottom: "30px", fontSize: "35px" }}>Berita dan Artikel</h1>
          <div className="flex" style={{ gap: 0, minHeight: "350px" }}>
            <div className="flex-item berita-utama">
              <img src={image5} className="image" style={{ objectPosition: "left" }} />
            </div>
            <div className="flex-item rounded" style={{ background: "#fff", padding: "24px 24px 16px 24px" }}>
              <p id="title">Tunaikan Zakatmu Di Andalusia</p>
              <p className="desc-berita">
                Andalusia Islamic Center (AIC) hadir karena kepedulian akan masalah besar bangsa dan umat Islam Indonesia yang di dominasi oleh kemiskinan, keterbelakangan pendidikan serta rendahnya moralitas baik ditingkat birokrasi maupun
                swasta.
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                <Link style={{ textDecoration: "none", color: "#0C12D7", fontWeight: "600" }}>Baca selengkapnya</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-item">
          <h2 style={{ marginBottom: "20px" }}>Berita Lainnya</h2>
          <div className="list-berita">
            <div className="flex">
              <div className="flex-item" style={{ maxHeight: "150px", maxWidth: "250px" }}>
                <img src={image6} className="image" />
              </div>
              <div className="flex-item">
                <p id="title">Masjid Mengadakan Acara Tabligh Akbar</p>
                <p id="des-program">Andalusia Islamic Center (AIC) hadir karena kepedulian akan masalah besar bangsa dan umat Islam Indonesia yang di dominasi oleh kemiskinan,</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-item" style={{ maxHeight: "150px", maxWidth: "250px" }}>
                <img src={image6} className="image" />
              </div>
              <div className="flex-item">
                <p id="title">Masjid Mengadakan Acara Tabligh Akbar</p>
                <p id="des-program">Andalusia Islamic Center (AIC) hadir karena kepedulian akan masalah besar bangsa dan umat Islam Indonesia yang di dominasi oleh kemiskinan,</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-item" style={{ maxHeight: "150px", maxWidth: "250px" }}>
                <img src={image6} className="image" />
              </div>
              <div className="flex-item">
                <p id="title">Masjid Mengadakan Acara Tabligh Akbar</p>
                <p id="des-program">Andalusia Islamic Center (AIC) hadir karena kepedulian akan masalah besar bangsa dan umat Islam Indonesia yang di dominasi oleh kemiskinan,</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
