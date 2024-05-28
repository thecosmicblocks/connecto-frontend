interface SectionProps {
    title: string;
    children: React.ReactNode;
}

export default function Section({title, children}: SectionProps) {
    return (
        <div
            className=""
        >
            <h4 className="text-3xl">
                <span>{title}</span>
            </h4>
            {children}
        </div>
    )
}