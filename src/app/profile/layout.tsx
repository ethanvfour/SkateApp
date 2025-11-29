import Header from "@/globalComponents/Header"

export default function ProfileLayout({
    children
}:
{
    children: React.ReactNode
})
{
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}