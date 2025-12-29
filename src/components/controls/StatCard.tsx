export default function StatCard({
    title,
    value,
}: {
    title: string;
    value: string | number;
}) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
                {value}
            </p>
        </div>
    );
}