import {Component, useState, useEffect, useCallback} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';





const Slider = (props) => {


    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);


    const getSomeImages = useCallback( () => {
        console.log("fetching");
        return [
            "https://www.planetware.com/wpimages/2022/12/michigan-grand-haven-top-rated-things-to-do-intro-paragraph-downtown.jpg",
            "https://www.planetware.com/wpimages/2022/12/michigan-grand-haven-top-rated-things-to-do-view-grand-haven-lighthouse-pier.jpg"
        ]
    }, [slide])
    
    
   function logging(){
    // console.log("log!!")
   }

    useEffect(()=>{
        // console.log('effect update');
        document.title = `Slide : ${slide}`;

        window.addEventListener('click', logging);

        return ()=>{
            window.removeEventListener('click', logging);
        }
    }, [slide]);

    useEffect(()=>{
        console.log('autoplay');
    }, [autoplay]);

    // const [state,setState] = useState({slide: 0, autoplay: false});

    // function changeSlide(i){
    //     setState(state => ({...state, slide: state.slide + i}));
    // }

    // function toggleAutoplay(){
    //     setState(state => ({...state, autoplay: !state.autoplay}));
    // }
    
    function changeSlide(i){
        setSlide(slide => slide + i);
    }

    function toggleAutoplay(){
        setAutoplay(autoplay => !autoplay);
    }
    
    return (
        <Container>
            <div className="slider w-50 m-auto">
                
                
                {/* {
                    getSomeImages().map((url,i)=>{
                        return (
                            <img key ={i} className="d-block w-100" src={url} alt="slide"></img>
                        )
                    })
                } */}
                <Slide getSomeImages={getSomeImages} />

                <div className="text-center mt-5">Active slide {slide} <br/> 
                {autoplay ? 'auto' : null}
                </div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages})=>{
    const [images, setImages]= useState([]);

    useEffect(()=>{
        setImages(getSomeImages())
    }, [getSomeImages])

    return (
        <>
            {images.map((url, i)=> <img key ={i} className="d-block w-100" src={url} alt="slide"></img>)}
            
        </>
    )

}

function App() {
    const [slider,setSlider]= useState(true);
  return (
    <>
        <button onClick={() => setSlider(false)}>Click me</button>
        {slider ? <Slider/> : null}
    </>
  );
}

export default App;
