import Header from "@/src/components/Header/Header";
import Footer from "../Footer/Footer";

export default function MainLayout({children}) {
    return (
        <div className="app">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}