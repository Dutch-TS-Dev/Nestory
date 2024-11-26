import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from "./ScrollTopTop";
import SlideCard from "./SlideCard";
import Was from "./Was";
import { Link } from "react-router-dom";

const cards = [
    {
        title: "Fullstack Web Developer",
        name: "Jian Lu",
        image: "/images/person/jian5.jpeg",
        git: "https://github.com/LuJian2024",
        in: "https://www.linkedin.com/in/jian-lu-705184330/",
        inLogo: "https://www.multi-sonic.de/wp-content/uploads/2024/06/linkedin-logo-linkedin-icon-transparent-free-png.webp",
        gitLogo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbqj9Ii13d6hx5a9kyLnC5A8A96LDSaSZv_w&s",
    },
    {
        title: "Fullstack Web Developer",
        name: "Anna Popova",
        //image:"https://avatars.githubusercontent.com/u/150809381?v=4",
        image: "https://media.licdn.com/dms/image/v2/C4E03AQGqcnAuU--aQw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1517526492455?e=1737590400&v=beta&t=S1nOy5n0oewFWO7GgetdmXo22AVOAXocTxd548d5hiE",
        //image: "https://ornithology.com/wp-content/uploads/2022/11/image-1-768x1024.png",
        git: "https://github.com/anyuka007",
        in: "https://www.linkedin.com/in/anna-popova-95b27393/",
        inLogo: "https://www.multi-sonic.de/wp-content/uploads/2024/06/linkedin-logo-linkedin-icon-transparent-free-png.webp",
        gitLogo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbqj9Ii13d6hx5a9kyLnC5A8A96LDSaSZv_w&s",
    },
    {
        title: "Fullstack Web Developer",
        name: "Julijana Uneva ",
        image: "https://avatars.githubusercontent.com/u/156179252?v=4",
        //image: "https://sinavet.com/wp-content/uploads/2024/04/Persian-Mastiff.jpg",
        git: "https://github.com/JulijanaUneva",
        in: "https://www.linkedin.com/in/julijana-uneva-b28a751b5/",
        inLogo: "https://www.multi-sonic.de/wp-content/uploads/2024/06/linkedin-logo-linkedin-icon-transparent-free-png.webp",
        gitLogo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbqj9Ii13d6hx5a9kyLnC5A8A96LDSaSZv_w&s",
    },
    {
        title: "Fullstack Web Developer",
        name: "Alex Nezhad",
        //image:"https://avatars.githubusercontent.com/u/156181139?s=400&u=20219720d0fa93d373cbad911981f8f0f2bf1a0d&v=4",
        //image:"https://avatars.githubusercontent.com/u/156181139?v=4",
        //image: "https://media.licdn.com/dms/image/v2/D5603AQFwE7CkLVULQw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1732186793071?e=1737590400&v=beta&t=Upy0kEB_ith281esjIlF8E7rvcsnyv9HwR8OEewttj4",
        //image: alexImage,
        //image: "https://www.zootierliste.de/imagedb/1120919/cf453487/ciscaucasica.jpg",
        image: "/images/person/alex-jungfer.jpeg",
        gitLogo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbqj9Ii13d6hx5a9kyLnC5A8A96LDSaSZv_w&s",
        in: "https://www.linkedin.com/in/alex-nezhad-2517a6322/",
        git: "https://github.com/Alexxmanii",
        inLogo: "https://www.multi-sonic.de/wp-content/uploads/2024/06/linkedin-logo-linkedin-icon-transparent-free-png.webp",
    },
];
export default function AboutUs() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };
    return (
        <>
            <ScrollToTop /> {/* Scroll-to-Top Funktionalität */}
            {/*   */}
            <div
                style={{ backgroundColor: "#0b3954", marginBottom: "80px" }}
                className=" rounded-3xl "
            >
                <main
                    style={{ position: "relative", top: "60px", left: "55px" }}
                    className="flex"
                >
                    <div>
                        <div style={styles.container}>
                            {" "}
                            <section>
                                <h2 style={styles.title}>neSTory Team</h2>
                                <p style={styles.description}>
                                    This online store is the final project of
                                    our Web Development course, created by a
                                    team of passionate students. It showcases
                                    our dedication, teamwork, and skills gained
                                    with modern web technologies. More than a
                                    shopping platform, it reflects our growth
                                    and potential as developers, ready for
                                    future challenges!
                                </p>
                                <Slider {...settings}>
                                    {cards.map((card, index) => (
                                        <div key={index} style={styles.card}>
                                            <div style={styles.name}>
                                                {card.name}
                                            </div>

                                            <div>
                                                <Link
                                                    to={card.git}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        style={{
                                                            padding: "5px",
                                                            width: "300px",
                                                            height: "230px",
                                                            borderRadius:
                                                                "80px",
                                                        }}
                                                        src={card.image}
                                                        alt=""
                                                    />
                                                </Link>
                                            </div>
                                            <h3 style={styles.cardTitle}>
                                                {card.title}
                                            </h3>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Link
                                                    to={card.git}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {" "}
                                                    <img
                                                        style={styles.logo}
                                                        src={card.gitLogo}
                                                        alt="github logo"
                                                    />
                                                </Link>

                                                <Link
                                                    to={card.in}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        style={styles.logo}
                                                        src={card.inLogo}
                                                        alt="LinkedIn logo"
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>{" "}
                            </section>
                        </div>
                    </div>
                    <section
                        style={styles.container}
                        className="was bg-red-300 w-[800px] p-8 rounded-3xl "
                    >
                        <div style={{ margin: "0px" }}>
                            <Was />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                margin: "50px",
                                color: "#0b3954",
                            }}
                        >
                            <SlideCard
                                title="HTML"
                                //description="This card slides in when visible."
                                image="https://cdn.iconscout.com/icon/free/png-256/free-html-5-logo-icon-download-in-svg-png-gif-file-formats--programming-langugae-language-pack-logos-icons-1175208.png?f=webp"
                            />
                            <SlideCard
                                title="CSS"
                                //description="This card slides in when visible."
                                //image="https://static-00.iconduck.com/assets.00/file-type-css-icon-902x1024-dqy5inwy.png"
                                image="https://cdn.iconscout.com/icon/free/png-512/free-css-logo-icon-download-in-svg-png-gif-file-formats--logos-pack-icons-722685.png?f=webp&w=256"
                            />
                            <SlideCard
                                title="JavaScript"
                                //description="Another card that slides in."
                                image="https://miro.medium.com/v2/resize:fit:344/1*tZHcs0d7MAG-BBcjBekZYA.png"
                            />
                            <SlideCard
                                title="React"
                                //description="This card slides in when visible."
                                image="https://github.com/facebook/react/wiki/react-logo-1000-transparent.png"
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                margin: "50px",
                                color: "#0b3954",
                            }}
                        >
                            <SlideCard
                                title="Node.js"
                                //description="This card slides in when visible."
                                image="https://pluralsight2.imgix.net/paths/images/nodejs-45adbe594d.png"
                            />
                            <SlideCard
                                title="Tailwind"
                                //description="This card slides in when visible."
                                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s"
                            />
                            <SlideCard
                                title="Mongodb"
                                //description="Another card that slides in."
                                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ZYtHv2OLXmthRPbkmENZRXuqBVDwlsrZ1A&s"
                            />
                            <SlideCard
                                title="Three.js"
                                image="https://d2ooyrflu7lhqd.cloudfront.net/three_js_c065f86333.png"
                            />
                        </div>
                        {/* <div
                        style={{ display: "flex", gap: "20px", margin: "50px" }}
                    >
                        <SlideCard
                            title="Canva"
                            //description="This card slides in when visible."
                            image="https://static-cse.canva.com/blob/571644/Untitleddesign9.png"
                        />
                        <SlideCard
                            title="Express.js"
                            //description="This card slides in when visible."
                            image="https://www.peanutsquare.com/wp-content/uploads/2024/04/Express.png"
                        />
                        <SlideCard
                            title="Mongodb-Compass"
                            //description="Another card that slides in."
                            image="https://www.kenwalger.com/twitter_cards/mongodb-compass.png"
                        />
                        <SlideCard
                            title="Schema"
                            image="https://spin.atomicobject.com/wp-content/uploads/typescript-json-schema.png"
                            //image="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnLxTLqF9OdBjMGYIlDs2tlu1Rw1s4C-hVs96zrki0TlB4Ho_SHbyt_lfFsKZ_hcYXMtceO8LUvgfks01xXpdr6wMJq9JT_UZeDV-ayBv5sBYYwTPaHbQME-1UyQLfxxAqxjntAj8TdYSG/w1200-h630-p-k-no-nu/JSON+Schema.jpg"
                        />
                    </div> */}
                    </section>
                </main>
            </div>
        </>
    );
}
const styles = {
    container: {
        //backgroundColor: "#1A202C", // Dunkler Hintergrund
        //backgroundColor: "#0b3954",
        backgroundColor: "#f3f4f6",
        // backgroundColor:"#b4b4a8",
        //color: "#E2E8F0", // Hellgrauer Text
        boxShadow: "4px 5px 5px ",
        color: "#0b3954",
        padding: "40px",
        borderRadius: "20px",
        textAlign: "center",
        maxWidth: "700px",
        margin: "",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "10vh",
    },
    title: {
        fontSize: "33px",
        fontWeight: "bold",
        color: "#0b3954",
    },
    description: {
        fontSize: "16px",
        //color: "#A0AEC0",
        margin: "25px 0",
    },
    card: {
        backgroundColor: "#2D3748",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s",
        cursor: "pointer",
    },
    cardTitle: {
        // color:"#0b3954",        //color: "#E2E8F0",
        color: "#0b3954",
        marginTop: "10px",
        fontSize: "18px",
    },
    name: {
        font: "bold",
        color: "#ffb128",
        marginBottom: "10px",
        fontSize: "19px",
    },
    logo: {
        width: "50px",
        height: "50px",
        borderRadius: "80px",
    },
};
