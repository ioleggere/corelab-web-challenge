import React ,{ useState } from 'react';
import Blue from '../img/colors/blue.png';
import GreenB from '../img/colors/green-blue.png';
import Grey from '../img/colors/grey.png';
import Kiwi from '../img/colors/kiwi.png';
import LemonG from '../img/colors/lemon-green.png';
import LGrey from '../img/colors/light-grey.png';
import LRose from '../img/colors/light-rose.png';
import Marine from '../img/colors/marine.png';
import Orange from '../img/colors/orange.png';
import Pink from '../img/colors/pink.png';
import Red from '../img/colors/red.png';
import Yellow from '../img/colors/yellow.png';
const Colors = ({ onColorSelect }: { onColorSelect: (color: string) => void }) => {
    const handleColorClick = (color: string) => {
        onColorSelect(color);
    };
    return (
        <div className='Colors-container'>
            <img src={Blue} alt="blue" className='bluebtn color-btn' onClick={() => handleColorClick('bluebt')}/>
            <img src={GreenB} alt="greenb" className='greenbbtn color-btn' onClick={() => handleColorClick('greenbbt')}/>
            <img src={Grey} alt="grey" className='greybtn color-btn' onClick={() => handleColorClick('greybt')}/>
            <img src={Kiwi} alt="kiwi" className='kiwibbbtn color-btn' onClick={() => handleColorClick('kiwibbbt')}/>
            <img src={LemonG} alt="lemon" className='lemongbtn color-btn' onClick={() => handleColorClick('lemongbt')}/>
            <img src={LGrey} alt="lgrey" className='lgreybtn color-btn' onClick={() => handleColorClick('lgreybt')}/>
            <img src={LRose} alt="lrose" className='lrosebtn color-btn' onClick={() => handleColorClick('lrosebt')}/>
            <img src={Marine} alt="marine" className='marinebtn color-btn' onClick={() => handleColorClick('marinebt')}/>
            <img src={Orange} alt="orange" className='orangebtn color-btn' onClick={() => handleColorClick('orangebt')}/>
            <img src={Pink} alt="pink" className='pinkbtn color-btn' onClick={() => handleColorClick('pinkbt')}/>
            <img src={Red} alt="red" className='redbtn color-btn' onClick={() => handleColorClick('redbt')}/>
            <img src={Yellow} alt="yellow" className='yellowbtn color-btn' onClick={() => handleColorClick('yellowbt')}/>
        </div>
    );
};

export default Colors;