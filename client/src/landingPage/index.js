import { React, useState, useEffect } from 'react';
import './styles.css';
const LandingPage = () => {
    const [url, setUrl] = useState(null);
    const [shortId, setShortId] = useState(null);
    const [longUrl, setLongUrl] = useState(null);
    const [showCreateNew, setShowCreateNew] =  useState(false);

    const shorten = (originalurl) => {
        const payload = { "url": originalurl }
        fetch("http://localhost:8001/url", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).then((res) => res.json())
            .then((data) => {
                setShortId(data.id);
            })
    }
    const checkUrl = (originalUrl) =>{
        try {
            new URL(originalUrl);
            return true;
          } catch (error) {
            alert("Enter a valid URL")
            return false;
          }
    }
    const originalUrl = (e) => {
        setUrl(e.target.value);
    }
      
    const newUrl = () =>{
        setShowCreateNew(false);
        setUrl("");
        setLongUrl("");
    }
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent the default form submission behavior
        if(checkUrl(url)){
            console.log("yes valid")
            shorten(url); // call your API function here
            setLongUrl(url);
        }
    //     else{
    //         console.log("target",e.target.elements[0].defaultValue)
    //         const input = e.target.elements[0].defaultValue;
    //   input.setCustomValidity('Please enter a valid URL.');
    //   input.reportValidity();
    //     }
    }
    useEffect(()=>{
        if(shortId){
            setUrl(`http://localhost:8001/${shortId}`)
            setShowCreateNew(true);
        }
    },[shortId])

    return (
        <div>
            <h1 className='heading'>URL Shortener</h1>
            <div className='main'>
                <div className='centerBox'>
                    <div className='sub-header'>Paste the URL to be shortened</div>
                    <div className='formDiv'><form onSubmit={handleSubmit}>
                        <div className="textBox">
                            <input type="text"
                                value={url}
                                onChange={originalUrl}
                                required
                                style={{width: "350px" ,height: "30px"}}></input>
                            <button type="submit" style={{color: "white", backgroundColor:"rgb(9, 9, 161)"}}>
                                Shorten URL
                            </button>
                        </div>
                        {longUrl && 
                            <p style={{color:"black"}}>
                                {/* eslint-disable-next-line */}
                                LongURL: <a href={longUrl} target="_blank">{longUrl}</a>
                            </p>}
                        {showCreateNew && 
                            <button type="submit" style={{color: "white", backgroundColor:"rgb(9, 9, 161)"}}
                                onClick={newUrl}>
                                Shorten New URL
                            </button>
                        }
                    </form></div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;

