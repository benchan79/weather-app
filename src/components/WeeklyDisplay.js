import {FaSun, FaCloudRain, FaCloud, FaRegSnowflake} from 'react-icons/fa';

function WeeklyForecast(){
    return (
        <>
            <div className='text-blue-800 mt-10'>
                <div className='flex items-center justify-start'>
                    <p>Weekly Forecast</p>
                </div>
                <hr className='my-3' />
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-col items-center'>
                        <p className='font-light text-sm'>Day</p>
                        <FaCloud size={30} className='my-2' />
                        <p>25°C</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='font-light text-sm'>Day</p>
                        <FaCloud size={30} className='my-2' />
                        <p>25°C</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='font-light text-sm'>Day</p>
                        <FaCloud size={30} className='my-2' />
                        <p>25°C</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='font-light text-sm'>Day</p>
                        <FaCloud size={30} className='my-2' />
                        <p>25°C</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='font-light text-sm'>Day</p>
                        <FaCloud size={30} className='my-2' />
                        <p>25°C</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeeklyForecast;