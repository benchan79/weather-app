import {FaSun, FaCloudRain, FaCloud, FaRegSnowflake,IoMdThunderstorm, FaSearch} from 'react-icons/fa';

function HourlyDisplay(){
    return (
        <>
            <div className='text-blue-800'>
                <div className='flex items-center justify-start'>
                    <p>Hourly Forecast</p>
                </div>
                <hr className='my-3' />
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-col items-center'>
                        <p className='font-light text-sm'>12:00pm</p>
                        <FaCloud size={30} className='my-2' />
                        <p>25°C</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='font-light text-sm'>1:00pm</p>
                        <FaCloud size={30} className='my-2' />
                        <p>25°C</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='font-light text-sm'>2:00pm</p>
                        <FaCloud size={30} className='my-2' />
                        <p>25°C</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='font-light text-sm'>3:00pm</p>
                        <FaCloud size={30} className='my-2' />
                        <p>25°C</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='font-light text-sm'>4:00pm</p>
                        <FaCloud size={30} className='my-2' />
                        <p>25°C</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HourlyDisplay;