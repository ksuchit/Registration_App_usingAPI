import Carousel from 'react-bootstrap/Carousel';

export default function ImgCarousal(props) {
    return (
        <div style={{width:'100%'}}>
            {props.imgData.length >1 ?
            <Carousel interval={null} >
            {props.imgData.map((item,i) => {
            
                return(<Carousel.Item key={i}>
                    <img
                    className="d-block w-100"
                    src={item.url}
                    alt="First slide"
                    />
                    
                </Carousel.Item>)
            })}
    
            </Carousel> :
            <Carousel interval={null} controls={false} indicators={false}>
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
            }           
        </div>
  );
}
