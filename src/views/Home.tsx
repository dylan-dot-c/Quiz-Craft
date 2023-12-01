import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <header>
                <div className='animate-border p-1'>
                    <div className='text-white text-center bg-dark bg-opacity-75  p-4 rounded-3'>
                        <h1 className='hero-title'>Unleash Your Quiz Craft</h1>
                        <p className='hero-subtitle'>
                            Explore, Create, Excel - Your Ultimate Quiz
                            Experience Awaits!
                        </p>
                        <div className='d-flex gap-3 justify-content-center '>
                            <Link to='/quizzes'>
                                <button className='btn cta border text-white bg-black bg-opacity-25  '>
                                    View Quizzes
                                </button>
                            </Link>
                            <Link to='/dashboard'>
                                <button className='btn cta border text-white '>
                                    Create Your Own!
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>{" "}
            </header>
            <main></main>
        </>
    );
}

export default Home;
