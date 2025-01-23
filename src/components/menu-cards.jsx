import Link from "next/link";

export default function MenuCards(props) {
    const cards = props.cards.map((e, i) => (
        <Link href={e.href} className="hover:bg-gray-500/5 p-3 pr-6 duration-200" key={i}>
            <div className="flex gap-3">
                <div>
                    <div className="bg-blue-500/10 text-blue-500 p-2">{<e.icon size="16"/>}</div>
                </div>
                <div>
                    <p className="font-bold text-blue-500">{e.title}</p>
                    <p className="text-gray-500">{e.description}</p>
                </div>
            </div>
        </Link>
    ))
    return cards
}