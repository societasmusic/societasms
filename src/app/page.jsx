import Breadcrumbs from "@/components/Breadcrumbs";
import Greeting from "@/components/greeting";

export default function Home() {
    const crumbs = [
        { title: "Dashboard", href: "/" },
        { title: "Shared", href: "/shared", currentPage: true },
    ]
    return (
        <>
            <div className="flex justify-center grow">
                <div className="container p-3">
                    {/* <Breadcrumbs crumbs={crumbs}/> */}
                    {/* <h1 className="text-4xl font-bold"><Greeting/>, Aiden</h1> */}
                </div>
            </div>
        </>
    )
}