import Carousel from 'react-bootstrap/Carousel';

export default function ImgCarousal(props) {
    return (
        <div style={{width:'30%'}}>
            <Carousel slide={false}>
                {props.imgData.map((item,i) => {
                
                    return(<Carousel.Item key={i}>
                        <img
                        className="d-block w-100"
                        src={item.url}
                        alt="First slide"
                        />
                        
                    </Carousel.Item>)
                })}
        
            </Carousel>
        </div>
  );
}
