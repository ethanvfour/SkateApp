import Header from "@/globalComponents/Header"

export default function MessagesLayout({
    children
}:
{
    children : React.ReactNode
})
{
    return(
        <div>
            <Header />
            {children}
        </div>
    )
}