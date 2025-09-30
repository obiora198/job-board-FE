import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-800 text-white mt-10">
            <div >
                <ul className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-end items-center gap-4 text-xs p-4 space-y-4 sm:space-y-0">
                    <li className="mb-2"><Link href="/" className="hover:underline">Home</Link></li>
                    <li className="mb-2"><Link href="/about" className="hover:underline">About Us</Link></li>
                    <li className="mb-2"><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                </ul>
            </div>
        </footer>
    );
}