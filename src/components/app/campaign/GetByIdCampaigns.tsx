import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetById } from '../../../configurations/crud/campaignsCrud';
import type { Campaign } from '../../../configurations/types/campaign';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { MdErrorOutline } from 'react-icons/md';
import { useToast } from '../../controls/Toast/ToastService';
import Card from '../../base/Card';
import Detail from '../../base/Detail';

export default function GetByIdCampaigns() {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  const [campaign, setCampaignData] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    GetCampaign();
  }, [id]);

  const GetCampaign = () => {
    if (!id) return;
    setLoading(true)
    GetById(id).then(res => {
      let mdata = res.data
      if (mdata) {
        setCampaignData(mdata.campaign ?? mdata)
        toast.open("Campaigns loaded successfully", <IoCheckmarkDoneCircleOutline />, "success")
      } else {
        setCampaignData(null)
        toast.open(mdata?.message, <MdErrorOutline />, "danger")
      }
      setLoading(false)
    }).catch(errors => {
      setCampaignData(null)
      setLoading(false)
      toast.open("Rate limit exceeded. Max 30 requests per minute.", <MdErrorOutline />, "danger", 5000)
    })
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading campaign...
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        'Campaign not found'
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <button
          onClick={() => navigate('/campaigns')}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to campaigns
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">
          Campaign Details
        </h1>

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
              value={`$${campaign.budget?.toLocaleString() ?? '0'}`}
            />
            <Detail
              label="Daily Budget"
              value={`$${campaign.daily_budget?.toLocaleString() ?? '0'}`}
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
      </div>
    </div>

  );
}
