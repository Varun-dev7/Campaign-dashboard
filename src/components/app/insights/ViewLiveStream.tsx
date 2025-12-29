import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Campaign } from '../../../configurations/types/campaign';
import type { CampaignByIdInsights } from '../../../configurations/types/insights';
import { GetById } from '../../../configurations/crud/campaignsCrud';
import { GetByIdInsight } from '../../../configurations/crud/insightsCrud';
import StatCard from '../../controls/StatCard';
import Detail from '../../base/Detail';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { MdErrorOutline } from 'react-icons/md';
import { useToast } from '../../controls/Toast/ToastService';
import Card from '../../base/Card';

export default function ViewLiveStream() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const toast = useToast();
    const [campaign, setCampaignData] = useState<Campaign | null>(null);
    const [insights, setInsightsData] = useState<CampaignByIdInsights | null>(null);
    const [campaignLoading, setCampaignLoading] = useState(false);
    const [insightsLoading, setInsightsLoading] = useState(false);

    useEffect(() => {
        GetCampaign();
        GetInsights();
    }, [id]);

    const GetCampaign = () => {
        if (!id) return;
        setCampaignLoading(true)
        GetById(id).then(res => {
            let mdata = res.data
            if (mdata) {
                setCampaignData(mdata.campaign)
                toast.open("Campaigns loaded successfully", <IoCheckmarkDoneCircleOutline />, "success")
            } else {
                setCampaignData(null)
                toast.open(mdata?.message, <MdErrorOutline />, "danger")
            }
            setCampaignLoading(false)
        }).catch(errors => {
            setCampaignData(null)
            setCampaignLoading(false)
            toast.open("Rate limit exceeded. Max 30 requests per minute.", <MdErrorOutline />, "danger", 5000)
        })
    }

    const GetInsights = () => {
        if (!id) return;
        setInsightsLoading(true)
        GetByIdInsight(id).then(res => {
            let mdata = res.data
            if (mdata) {
                setInsightsData(mdata.insights)
            } else {
                setInsightsData(null)
                toast.open("Server error", <MdErrorOutline />, "danger")
            }
            console.log(mdata.message);
            setInsightsLoading(false)
        }).catch(errors => {
            setInsightsData(null)
            setInsightsLoading(false)
            toast.open("Rate limit exceeded. Max 30 requests per minute.", <MdErrorOutline />, "danger", 5000)
        })
    }

    useEffect(() => {
        if (!id) return;

        const eventSource = new EventSource(
            `https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights/stream`
        );

        eventSource.onmessage = (event) => {
            const data: CampaignByIdInsights = JSON.parse(event.data);
            setInsightsData(data);
        };

        eventSource.onerror = () => {
            toast.open('SSE connection error', <MdErrorOutline />, 'danger');
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [id]);

    if (campaignLoading || insightsLoading) {
        return (
            <div className="flex h-screen items-center justify-center text-gray-500">
                Loading campaign...
            </div>
        );
    }

    if (!campaign || !insights) {
        return (
            <div className="flex h-screen items-center justify-center text-red-600">
                Campaign not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-6xl space-y-8">

                <button
                    onClick={() => navigate('/campaigns')}
                    className="text-sm text-blue-600 hover:underline"
                >
                    ← Back to campaigns
                </button>

                <Card>
                    <Detail label="Campaign Name" value={campaign.name} />

                    <div className="flex gap-6">
                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <span
                                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold
                                           ${campaign.status === 'active'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                    }`}
                            >
                                {campaign.status}
                            </span>
                        </div>

                        <Detail
                            label="Platforms"
                            value={campaign.platforms?.join(', ') ?? 'N/A'}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <Detail
                            label="Total Budget"
                            value={`$${campaign.budget ?? '0'}`}
                        />
                        <Detail
                            label="Daily Budget"
                            value={`$${campaign.daily_budget ?? '0'}`}
                        />
                    </div>

                    <Detail
                        label="Created At"
                        value={
                            campaign.created_at
                                ? new Date(campaign.created_at).toLocaleString()
                                : 'N/A'
                        }
                    />
                </Card>

                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    <span className="text-sm text-gray-600">Live performance metrics</span>
                </div>

                <div>
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        Performance Insights
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard title="Impressions" value={insights.impressions ?? '0'} />
                        <StatCard title="Clicks" value={insights.clicks ?? '0'} />
                        <StatCard title="Conversions" value={insights.conversions ?? '0'} />
                        <StatCard title="Spend" value={`$${insights.spend ?? '0'}`} />
                        <StatCard title="CTR" value={`${insights.ctr ?? 0}%`} />
                        <StatCard title="CPC" value={`$${insights.cpc ?? 0}`} />
                        <StatCard title="Conversion Rate" value={`${insights.conversion_rate ?? 0}%`} />
                    </div>

                    <p className="mt-4 text-sm text-gray-500">
                        Last updated: {new Date(insights.timestamp).toLocaleTimeString()}
                    </p>
                </div>

            </div>
        </div>
    );
}


