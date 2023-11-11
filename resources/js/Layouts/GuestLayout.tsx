import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {



    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div> */}
            <nav
                //reverse flex direction
                className='w-full bg-slate-900 px-[2rem] py-[1rem] flex flex-col-reverse gap-4 fixed top-0 left-0 z-10 items-end'
            >
                <Link
                    href={"/login"}
                    className='w-fit bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700'
                >
                    Login
                </Link>
            </nav>


            {/* safe zone */}
            <div
                className='h-[4rem]'
            ></div>

            <main className="w-full">
                {children}
            </main>
        </div >
    );
}
