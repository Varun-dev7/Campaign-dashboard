import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GetAllCampaigns from './app/campaign/GetAllCampaigns';
import GetByIdCampaigns from './app/campaign/GetByIdCampaigns';
import GetByIdInsights from './app/insights/GetByIdInsights';
import ViewLiveStream from './app/insights/ViewLiveStream';

export default function RouterContainer() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Default route */}
                <Route path="/" element={<Navigate to="/campaigns" replace />} />

                {/* Campaign list */}
                <Route path="/campaigns" element={<GetAllCampaigns />} />

                {/* Campaign detail */}
                <Route path="/campaigns/:id" element={<GetByIdCampaigns />} />

                <Route path="/campaigns/:id/insights" element={<GetByIdInsights />} />
                <Route path="/campaigns/:id/insights/stream" element={<ViewLiveStream />} />

                {/* Fallback */}
                <Route path="*" element={<div className="p-6">Page not found</div>} />
            </Routes>
        </BrowserRouter>
    );
}
