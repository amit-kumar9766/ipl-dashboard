import React, { useState } from 'react';
import Head from 'next/head';
import { useApi } from '../src/hooks/useApi';
import { useNotifications } from '../src/hooks/useNotifications';
import { usePreferences } from '../src/hooks/usePreferences';
import { Loading } from '../components/ui';
import { 
  StatusBar, 
  TabNavigation, 
  QuickStats, 
  NotificationToast 
} from '../components/dashboard';
import Layout from '../components/layout/Layout';
import LiveMatch from '../components/LiveMatch';
import PointsTable from '../components/PointsTable';
import MatchSchedule from '../components/MatchSchedule';
import HistoricalData from '../components/history/HistoricalData';

// Define the different tabs for navigation
// This helps organize the dashboard into sections
type TabType = 'overview' | 'matches' | 'points' | 'history';

const HomePage: React.FC = () => {
  // State to track which tab is currently active
  // Started with 'overview' as default
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // Custom hooks for managing app state
  // These make the code cleaner and more organized
  const { preferences, updatePreferences } = usePreferences();
  const { notifications, addNotification, removeNotification } = useNotifications();
  
  // Main data fetching hook
  // This handles all the API calls and caching
  const { 
    data: scrapedData, 
    loading, 
    error, 
    dataSource, 
    cacheStatus, 
    lastUpdated, 
    errorCount,
    refreshData 
  } = useApi({
    enabled: true,
    refetchInterval: preferences.autoRefresh ? preferences.refreshInterval : 0,
    onSuccess: (data) => {
      // Show notification when a live match starts
      if (data.liveMatch && data.liveMatch.status === 'live') {
        addNotification(
          'Live Match Started!',
          `${data.liveMatch.team1.name} vs ${data.liveMatch.team2.name} is now live!`,
          'info'
        );
      }
    },
    onError: () => {
      // Show warning when data fetch fails
      addNotification(
        'Data Fetch Error',
        'Failed to fetch latest data. Showing cached information.',
        'warning'
      );
    }
  });

  // Function to manually refresh data
  // Users can click this to get fresh data
  const handleManualRefresh = async () => {
    await refreshData();
    addNotification(
      'Data Refreshed',
      'Latest IPL data has been updated successfully.',
      'success'
    );
  };

  // Toggle auto-refresh feature
  // This was tricky to implement but works well
  const toggleAutoRefresh = () => {
    updatePreferences({ autoRefresh: !preferences.autoRefresh });
  };

  // Handle tab changes
  // This updates the active tab and shows different content
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Show loading screen if no data yet
  if (loading && !scrapedData) {
    return (
      <Layout>
        <Loading 
          size="xl" 
          text="Loading IPL Dashboard..." 
          fullScreen 
        />
      </Layout>
    );
  }

  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange}>
      <Head>
        <title>IPL Dashboard - Live Cricket Updates</title>
        <meta name="description" content="Real-time IPL cricket dashboard with live scores, points table, and match schedule" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Status bar shows data source and refresh controls */}
        <StatusBar
          dataSource={dataSource}
          cacheStatus={cacheStatus}
          lastUpdated={lastUpdated || undefined}
          autoRefresh={preferences.autoRefresh}
          loading={loading}
          onToggleAutoRefresh={toggleAutoRefresh}
          onManualRefresh={handleManualRefresh}
        />

        {/* Notification system for user feedback */}
        <NotificationToast
          notifications={notifications}
          onRemove={removeNotification}
        />

        {/* Show error message if something goes wrong */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mx-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-red-400 font-medium">Connection Error</span>
                {errorCount >= 3 && (
                  <span className="text-yellow-400 text-sm">(Auto-refresh stopped)</span>
                )}
              </div>
              <button
                onClick={handleManualRefresh}
                className="text-blue-400 hover:text-blue-300 text-sm underline"
              >
                Try Again
              </button>
            </div>
            <p className="text-red-300 text-sm mt-1">{error}</p>
            {errorCount >= 3 && (
              <p className="text-yellow-300 text-sm mt-2">
                Auto-refresh has been stopped due to repeated errors. Click "Try Again" to manually refresh.
              </p>
            )}
          </div>
        )}

        {/* Tab navigation - users can switch between different views */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <div className="px-4 pb-8">
          {/* Overview tab - shows live match and quick stats */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Live match component - most important feature */}
              <LiveMatch match={scrapedData?.liveMatch || null} />
              
              {/* Quick stats showing summary information */}
              <QuickStats
                upcomingMatches={scrapedData?.upcomingMatches?.length || 0}
                teams={scrapedData?.pointsTable?.length || 0}
                totalMatches={scrapedData?.schedule?.length || 0}
                liveMatches={scrapedData?.liveMatch ? 1 : 0}
              />

              {/* Points table preview - shows top 5 teams */}
              {scrapedData?.pointsTable && scrapedData.pointsTable.length > 0 && (
                <div className="bg-gray-800 rounded-lg border border-gray-700">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Points Table Preview
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2 text-gray-400">Pos</th>
                            <th className="text-left py-2 text-gray-400">Team</th>
                            <th className="text-center py-2 text-gray-400">P</th>
                            <th className="text-center py-2 text-gray-400">W</th>
                            <th className="text-center py-2 text-gray-400">L</th>
                            <th className="text-center py-2 text-gray-400">Pts</th>
                            <th className="text-center py-2 text-gray-400">NRR</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scrapedData.pointsTable.slice(0, 5).map((team, index) => (
                            <tr key={index} className="border-b border-gray-800">
                              <td className="py-2 text-white font-semibold">{team.position}</td>
                              <td className="py-2 text-white">{team.team.name}</td>
                              <td className="py-2 text-center text-gray-300">{team.played}</td>
                              <td className="py-2 text-center text-green-400">{team.won}</td>
                              <td className="py-2 text-center text-red-400">{team.lost}</td>
                              <td className="py-2 text-center text-white font-bold">{team.points}</td>
                              <td className="py-2 text-center text-gray-300">{team.netRunRate.toFixed(3)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Matches tab - shows full match schedule */}
          {activeTab === 'matches' && (
            <MatchSchedule 
              upcomingMatches={scrapedData?.upcomingMatches || []}
              schedule={scrapedData?.schedule || []}
            />
          )}

          {/* Points tab - shows complete points table */}
          {activeTab === 'points' && (
            <PointsTable pointsTable={scrapedData?.pointsTable || []} />
          )}

          {/* History tab - shows historical data and analytics */}
          {activeTab === 'history' && (
            <HistoricalData
              historicalMatches={scrapedData?.historicalMatches || []}
              playerStats={scrapedData?.playerStats || []}
              teamHistory={scrapedData?.teamHistory || []}
              performanceMetrics={scrapedData?.performanceMetrics || []}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
