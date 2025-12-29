import { useEffect, useState } from 'react';
import type { CampaignInsights } from '../../../configurations/types/insights';
import { GetAll } from '../../../configurations/crud/campaignsCrud';
import { GetAllInsights } from '../../../configurations/crud/insightsCrud';
import type { Campaign } from '../../../configurations/types/campaign';
import StatCard from '../../controls/StatCard';
import { Link } from 'react-router-dom';
import { IoMdOpen } from 'react-icons/io';
import Table from '../../controls/table/Table';
import TableHead from '../../controls/table/TableHead';
import TableTr from '../../controls/table/TableTr';
import TableTh from '../../controls/table/TableTh';
import TableBody from '../../controls/table/TableBody';
import TableTd from '../../controls/table/TableTd';
import { MdErrorOutline } from 'react-icons/md';
import { useToast } from '../../controls/Toast/ToastService';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';

export default function GetAllCampaigns() {
    const toast = useToast();
    const [campaigns, setCampaignData] = useState<Campaign[]>([]);
    const [insights, setInsightsData] = useState<CampaignInsights | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetCampaign();
        GetInsights();
    }, []);

    const GetCampaign = () => {
        setLoading(true)
        GetAll().then(res => {
            let mdata = res.data
            if (mdata) {
                setCampaignData(mdata.campaigns)
                toast.open("Campaigns loaded successfully", <IoCheckmarkDoneCircleOutline />, "success")
            } else {
                setCampaignData([])
                toast.open(mdata?.message, <MdErrorOutline />, "danger")
            }
            setLoading(false)
        }).catch(errors => {
            setCampaignData([])
            setLoading(false)
            toast.open("Rate limit exceeded. Max 30 requests per minute.", <MdErrorOutline />, "danger", 5000)
        })
    }

    const GetInsights = () => {
        setLoading(true)
        GetAllInsights().then(res => {
            let mdata = res.data
            if (mdata) {
                setInsightsData(mdata.insights)
                toast.open("Insights loaded successfully", <IoCheckmarkDoneCircleOutline />, "success")
            } else {
                setInsightsData(null)
                toast.open("Server error", <MdErrorOutline />, "danger")
            }
            console.log(mdata.message);
            setLoading(false)
        }).catch(errors => {
            setInsightsData(null)
            setLoading(false)
            toast.open("Rate limit exceeded. Max 30 requests per minute.", <MdErrorOutline />, "danger", 5000)
        })
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-gray-500">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-6 text-2xl font-semibold text-gray-900">
                    Campaign Dashboard
                </h1>

                {insights && (
                    <div className="mb-8">
                        <h2 className="mb-4 text-lg font-semibold text-gray-800">
                            Campaign Insights
                        </h2>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <StatCard title="Total Campaigns" value={insights.total_campaigns} />
                            <StatCard title="Active Campaigns" value={insights.active_campaigns} />
                            <StatCard title="Paused Campaigns" value={insights.paused_campaigns} />
                            <StatCard title="Completed Campaigns" value={insights.completed_campaigns} />
                            <StatCard
                                title="Total Impressions"
                                value={insights.total_impressions.toLocaleString()}
                            />
                            <StatCard
                                title="Total Clicks"
                                value={insights.total_clicks.toLocaleString()}
                            />
                            <StatCard
                                title="Total Spend"
                                value={`$${insights.total_spend.toLocaleString()}`}
                            />
                            <StatCard title="Avg CTR" value={`${insights.avg_ctr}%`} />
                            <StatCard title="Avg CPC" value={`$${insights.avg_cpc}`} />
                            <StatCard
                                title="Avg Conversion Rate"
                                value={`${insights.avg_conversion_rate}%`}
                            />
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                    <Table>
                        <TableHead>
                            <TableTr>
                                <TableTh>
                                    Campaign
                                </TableTh>
                                <TableTh>
                                    Status
                                </TableTh>
                                <TableTh>
                                    Platforms
                                </TableTh>
                                <TableTh>
                                    Budget
                                </TableTh>
                                <TableTh>
                                    Daily Budget
                                </TableTh>
                                <TableTh>
                                    Created
                                </TableTh>
                                <TableTh>
                                    Details
                                </TableTh>
                                <TableTh>
                                    Insights
                                </TableTh>
                                <TableTh>
                                    Live
                                </TableTh>
                            </TableTr>
                        </TableHead>

                        <TableBody>
                            {campaigns.map((item) => (
                                <TableTr key={item.id} className="hover:bg-gray-50">
                                    <TableTd>
                                        {item.name}
                                    </TableTd>

                                    <TableTd className="px-4 py-3">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-semibold
                        ${item.status === 'active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : item.status === 'paused'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-gray-200 text-gray-700'
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </TableTd>

                                    <TableTd className="px-4 py-3 text-gray-700">
                                        {item.platforms.join(', ')}
                                    </TableTd>
                                    <TableTd className="px-4 py-3 text-right text-gray-700">
                                        ${item.budget}
                                    </TableTd>

                                    <TableTd className="px-4 py-3 text-right text-gray-700">
                                        ${item.daily_budget}
                                    </TableTd>

                                    <TableTd className="px-4 py-3 text-gray-600">
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </TableTd>
                                    <TableTd>
                                        {/* <span onClick={() => navigate(`/campaigns/${item.id}`)}>
                                            View Details
                                        </span> */}
                                        <Link to={"/campaigns/" + item.id} className="cursor-pointer text-2xl  text-sky-500 hover:underline mr-1 p-1 hover:bg-gray-200 hover:rounded-lg" title='Enable'><IoMdOpen /></Link>
                                    </TableTd>
                                    <TableTd>
                                        <Link to={"/campaigns/" + item.id + "/insights"} className="cursor-pointer text-2xl  text-sky-500 hover:underline mr-1 p-1 hover:bg-gray-200 hover:rounded-lg" title='Enable'><IoMdOpen /></Link>
                                    </TableTd>
                                    <TableTd>
                                        <Link to={"/campaigns/" + item.id + "/insights/stream"} className="cursor-pointer text-2xl  text-sky-500 hover:underline mr-1 p-1 hover:bg-gray-200 hover:rounded-lg" title='Enable'><IoMdOpen /></Link>
                                    </TableTd>
                                </TableTr>
                            ))}

                            {campaigns.length === 0 && (
                                <TableTr>
                                    <TableTd colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                        No campaigns found
                                    </TableTd>
                                </TableTr>
                            )}
                        </TableBody>
                    </Table>
                </div>

            </div>
        </div>
    );
}


