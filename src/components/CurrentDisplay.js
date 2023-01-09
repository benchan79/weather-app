import {FaArrowUp, FaArrowDown, FaThermometer, FaWind, FaWater} from 'react-icons/fa';
import {FaSun, FaCloudRain, FaCloud, FaRegSnowflake, FaThunderstorm, FaSearch} from 'react-icons/fa';

function CurrentDisplay(){
    return (
        <>
            <div className="flex flex-row w-full justify-center text-blue-800 pt-10">
                <div>
                    <div className='text-center'>
                        <h1 className="text-xl font-semibold">Singapore</h1>
                        <p className='font-light text-sm'>Tuesday | 9 May 2023</p>
                    </div>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-x-10 sm:pb-4'>
                        <div className='flex flex-col sm:flex-row align-center items-center py-10'>
                            <FaSun size={100} />
                            <div className='ml-5'>
                                <p className='pt-5 font-light text-center text-9xl whitespace-nowrap'>25<span className='text-5xl'> °C</span></p>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row sm:flex-col sm:pb-4 gap-y-3'>
                            <div className='flex flex-row'>
                                <div className='flex items-center gap-x-2 mr-4'>
                                    <FaArrowUp />
                                    <p className='font-light whitespace-nowrap'>High: 25°C</p>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <FaArrowDown />
                                    <p className='font-light whitespace-nowrap'>Low: 24°C</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <FaThermometer />
                                <p className='font-light whitespace-nowrap'>Feels like 31°C</p>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <FaWind />
                                <p className='font-light whitespace-nowrap'>Wind 3m/s</p>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <FaWater />
                                <p className='font-light whitespace-nowrap'>Humidity: 70%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CurrentDisplay;