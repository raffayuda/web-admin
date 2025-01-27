interface HeadingProps {
    title: string;
    description: string;
}
export const Heading: React.FC<HeadingProps> = ({ title, description }: HeadingProps) => {
    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <p className="ttext-sm text-muted-foreground">{description}</p>
        </div>
    );
};