interface DetailItemProps {
    label: string;
    value: string | number;
}

export default function Detail({ label, value }: DetailItemProps) {
    return (
        <div className="pb-2">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-gray-900 font-medium">
                {value}
            </p>
        </div>
    );
}
