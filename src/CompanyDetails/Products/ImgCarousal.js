import Carousel from "react-bootstrap/Carousel";

export default function ImgCarousal(props) {
  return (
    <div style={{ width: "100%", border: "1px solid black", height: "50vh" }}>
      {props.imgData.length > 1 || props.imgData.length === 0 ? (
        props.imgData.length !== 0 ? ( //this is for when there is no img for any product
          <Carousel interval={null}>
            {props.imgData.map((item, i) => {
              return (
                //   style={{ height: "50vh" }}
                <Carousel.Item key={i}>
                  <img className="cardImg" src={item.url} alt="First slide" />
                </Carousel.Item>
              );
            })}
          </Carousel>
        ) : (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
            className="cardImg"
            alt="no data"
          />
        )
      ) : (
        <Carousel interval={null} controls={false} indicators={false}>
          {props.imgData.map((item, i) => {
            return (
              <Carousel.Item key={i}>
                <img className="cardImg" src={item.url} alt="First slide" />
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </div>
  );
}
