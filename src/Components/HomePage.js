import React from 'react';
import img from "../../src/IMG/home2.webp"

function HomePage()
{
    return (
        <div className='w-full h-full pt-[6rem] px-5 pb-2 bg-slateBlue'>
            <img src={img} alt="img" className=' w-screen h-screen object-cover  ' />
            <section className="bg-dark-blue text-white py-16 ">
               
            </section>
            <section className="mt-12">
                <div className="w-full flex  gap-5 p-5">
                    <div className="bg-white rounded shadow p-6">
                        <h2 className="text-2xl font-bold text-dark-blue mb-4">Our Services</h2>
                        <p className="text-dark-blue">
                            We provide a wide range of construction services, including residential and commercial construction, remodeling, and renovations. Our team of skilled professionals is dedicated to delivering high-quality workmanship and exceptional customer service.
                        </p>
                        <a href="/services" className="mt-4 inline-block bg-dark-blue text-white py-2 px-4 rounded hover:bg-dark-blue">Learn More</a>
                    </div>

                    <div className="bg-white rounded shadow p-6">
                        <h2 className="text-2xl font-bold text-dark-blue mb-4">Our Projects</h2>
                        <p className="text-dark-blue">
                            Take a look at our completed projects that showcase our expertise and attention to detail. We have successfully delivered residential, commercial, and industrial projects of varying scales, always meeting our clients' expectations.
                        </p>
                        <a href="/projects" className="mt-4 inline-block bg-dark-blue text-white py-2 px-4 rounded hover:bg-dark-blue">View Projects</a>
                    </div>
                </div>

            </section>
            <footer className="bg-dark-blue text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} Hanzee Construction. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
}

export default HomePage;