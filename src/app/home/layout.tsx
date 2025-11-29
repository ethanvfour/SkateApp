import Footer from "@/globalComponents/Footer"
import Header from "@/globalComponents/Header"


export default function HomeLayout({
    children
}:
{
    children: React.ReactNode
})
{
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}