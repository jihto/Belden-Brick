import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

export default function PublicLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    )
}