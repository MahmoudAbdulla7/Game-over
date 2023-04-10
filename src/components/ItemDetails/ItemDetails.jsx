import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingDtls from "../LoadingDtls/LoadingDtls";
import { Helmet } from "react-helmet";


export default function ItemDetails() {
  let { id } = useParams();
  const [dtls, setdtls] = useState({});
  const [sysRqr, setsysRqr] = useState({});
  const [photo1, setphoto1] = useState("");
  const [photo2, setphoto2] = useState("");
  const [photo3, setphoto3] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDtls(id);
    const timeOut = setTimeout(() => {
      setIsLoading(false)
    }, 400);
    return ()=> clearTimeout(timeOut);
  }, []);


  async function getDtls(id) {
    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/game`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
        params: {
          id: `${id}`,
        },
      }
    );
    setdtls(data);
    setsysRqr(data.minimum_system_requirements);
    setphoto1(data.screenshots[0].image);
    setphoto2(data.screenshots[1].image);
    setphoto3(data.screenshots[2].image);

    console.log(data);
  }
  return (
    <>

<Helmet>
        <title>{dtls.title}</title>
        <meta name="description" content="My page description" />
      </Helmet>




      {isLoading ? <LoadingDtls/>:       (
        <div style={{backgroundImage : `url(https://www.freetogame.com/g/${id}/background.jpg)`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center center'  }}  className="container-fluid gx-0">
<div className=" gg w-100">
<div className="container">
          <div className="row py-5">
            <div className="col-md-4">
              <div className="position-relative vidplay">
                <video
                  loop
                  muted
                  className="w-100 rounded-2 position-relative"
                  autoPlay
                >
                  <source
                    type="video/webm"
                    src={`https://www.freetogame.com/g/${id}/videoplayback.webm`}
                  />
                </video>
                <img
                  src={dtls.thumbnail}
                  className="w-100 rounded-3 position-absolute top-0 start-0 end-0 bottom-0 "
                  alt=""
                />
              </div>
              <Link target="_blank" to={dtls.game_url}>
                <button className="text-light btn free btn-light form-control my-3">
                  Play now
                </button>
              </Link>
            </div>
            <div className="col-md-8">
              <h1 className="fs-2 mt-1">{dtls.title}</h1>
              <h5 className="fs-4 font-monospace text-muted">
                About {dtls.title} :
              </h5>
              <p className="font text-muted fs-5"> {dtls.description}</p>
              {sysRqr ? (
                <>
                  {" "}
                  <h5 className="font-monospace text-muted fs-4">
                    Minimum System Requirements :
                  </h5>
                  <ul className="list-unstyled ms-2 font">
                    {sysRqr.graphics !== null ? (
                      <li className="py-2">
                        <strong>Graphics :</strong>{" "}
                        <span> {sysRqr.graphics}</span>
                      </li>
                    ) : (
                      ""
                    )}
                    {sysRqr.memory !== null ? (
                      <li className="py-2">
                        <strong>Memory : </strong>
                        <span> {sysRqr.memory}</span>
                      </li>
                    ) : (
                      ""
                    )}
                    {sysRqr.os !== null ? (
                      <li className="py-2">
                        <strong>Os : </strong>
                        <span> {sysRqr.os}</span>
                      </li>
                    ) : (
                      ""
                    )}
                    {sysRqr.processor !== null ? (
                      <li className="py-2">
                        <strong>Processor : </strong>
                        <span> {sysRqr.processor}</span>
                        or AMD equivalent
                      </li>
                    ) : (
                      ""
                    )}

                    {sysRqr.stronge !== null ? (
                      <li className="py-2">
                        <strong>Storage : </strong>
                        <span> {sysRqr.stronge}</span>
                        space
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>{" "}
                </>
              ) : (
                ""
              )}

              {photo1 == null ? '' : (
                <>
                  <h4 className="font-monospace">{dtls.title} Screenshots :</h4>
                  <div
                    id="carouselExampleControlsNoTouching"
                    className="carousel slide"
                    data-bs-touch="false"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          src={`${photo1}`}
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item ">
                        <img
                          src={`${photo2}`}
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item ">
                        <img
                          src={`${photo3}`}
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleControlsNoTouching"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleControlsNoTouching"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </>
              )}
              <h2 className="font-monospace my-2">Additional Information</h2>

              <div className="row">
                <div className="col-md-4 my-2">
                  <strong className="font">Release Date</strong>
                  <br />
                  <span className="font">{dtls.release_date}</span>
                </div>
                <div className="col-md-4 my-2">
                  <strong className="font">Genre</strong>
                  <br />
                  <span className="font">{dtls.genre}</span>
                </div>
                <div className="col-md-4 my-2">
                  <strong className="font">Platform</strong>
                  <br />
                  <span className="font">
                    <i className="fab fa-windows me-1"></i> {dtls.platform}
                  </span>
                </div>
                <div className="col-md-4 my-2">
                  <strong className="font">Title</strong>
                  <br />
                  <span className="font">{dtls.title}</span>
                </div>
                <div className="col-md-4 my-2">
                  <strong className="font">Developer</strong>
                  <br />
                  <span className="font">{dtls.developer}</span>
                </div>
                <div className="col-md-4 my-2">
                  <strong className="font">Publisher</strong>
                  <br />
                  <span className="font">{dtls.publisher}</span>
                </div>
              </div>
            </div>
          </div>
          </div>
</div>
        </div>
      ) }

    </>
  );
}
