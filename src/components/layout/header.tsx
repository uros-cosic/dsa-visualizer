import { useContext } from "react"
import { Link } from "react-router"

import { AlgorithmContent, AlgorithmContext } from "../../lib/context/algorithm"
import { cn } from "../../lib/utils"

const items = [
    {
        label: 'Path finder',
        href: '/'
    },
    {
        label: 'Sorting',
        href: '/sort'
    }
]

const Header = () => {
    const { algorithm } = useContext<AlgorithmContent>(AlgorithmContext)

    return (
        <header className="w-full h-16 bg-primary text-primary-foreground">
            <nav className="max-w-screen-2xl mx-auto px-2 w-full h-full flex items-center justify-between gap-3">
                <span className="font-bold">DSA Visualizer</span>
                <ul className="flex gap-10 items-center">
                    {items.map(item => (
                        <li key={item.href} className={cn({ "cursor-not-allowed opacity-50": !!algorithm.hasStarted })}>
                            {!!algorithm.hasStarted ? item.label :
                                <Link to={item.href} className="hover:underline">
                                    {item.label}
                                </Link>
                            }
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default Header
