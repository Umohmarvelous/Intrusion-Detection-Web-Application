"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import {
    Bell,
    Shield,
    AlertTriangle,
    Play,
    Pause,
    RotateCcw,
    LayoutDashboard,
    Activity,
    FileText,
    Settings,
    Info,
    X,
    Menu,
} from "lucide-react"
import { NetworkSimulator } from "../../utils/network-simulator"
import { RealTimeMonitor } from "../components/real-time-monitor"
import { NetworkTopology } from "../components/network-topology"
import { ThreatAnalytics } from "../components/threat-analytics"
import { ActivitiesTab } from "../components/activities-tab"
import { SettingsTab } from "../components/settings-tab"
import { ThemeProvider } from "../../hooks/use-theme"
import type { IntrusionAttempt, NetworkDevice } from "../types/network"

function IntrusionDetectionApp() {
    const [simulator] = useState(() => new NetworkSimulator())
    const [intrusions, setIntrusions] = useState<IntrusionAttempt[]>([])
    const [devices, setDevices] = useState<NetworkDevice[]>([])
    const [isSimulating, setIsSimulating] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("Dashboard")
    const [metrics, setMetrics] = useState({
        totalEvents: 0,
        criticalAlerts: 0,
        blockedAttempts: 0,
        suspiciousDevices: 0,
    })

    useEffect(() => {
        setDevices(simulator.getDevices())
    }, [simulator])

    useEffect(() => {
        let interval: NodeJS.Timeout

        if (isSimulating) {
            interval = setInterval(() => {
                if (Math.random() < 0.7) {
                    const intrusion = simulator.generateRandomIntrusion()
                    simulator.addIntrusion(intrusion)
                    setIntrusions(simulator.getIntrusions())
                }

                if (Math.random() < 0.1) {
                    simulator.addSuspiciousDevice()
                    setDevices(simulator.getDevices())
                }

                setMetrics(simulator.getMetrics())
            }, 2000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isSimulating, simulator])

    const handleStartSimulation = () => {
        setIsSimulating(true)
    }

    const handleStopSimulation = () => {
        setIsSimulating(false)
    }

    const handleReset = () => {
        setIsSimulating(false)
        setIntrusions([])
        setDevices(simulator.getDevices())
        setMetrics({
            totalEvents: 0,
            criticalAlerts: 0,
            blockedAttempts: 0,
            suspiciousDevices: 0,
        })
    }

    const handleDeleteDevice = (deviceId: string) => {
        const updatedDevices = devices.filter((device) => device.id !== deviceId)
        setDevices(updatedDevices)
    }

    const handleDeleteIntrusion = (intrusionId: string) => {
        const updatedIntrusions = intrusions.filter((intrusion) => intrusion.id !== intrusionId)
        setIntrusions(updatedIntrusions)
        setMetrics(simulator.getMetrics())
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case "Dashboard":
                return (
                    <div className="space-y-6">
                        {/* Metric Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                            <Card className="bg-gray-900 dark:bg-white border-gray-700 dark:border-gray-300 border-t-4 border-t-red-500">
                                <CardContent className="p-4 lg:p-6 text-center">
                                    <Bell className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-2 lg:mb-4 text-gray-300 dark:text-gray-700" />
                                    <div className="text-2xl lg:text-3xl font-bold text-gray-100 dark:text-gray-900 mb-1">
                                        {metrics.criticalAlerts}
                                    </div>
                                    <div className="text-xs lg:text-sm text-gray-400 dark:text-gray-600">ALERTS</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-900 dark:bg-white border-gray-700 dark:border-gray-300 border-t-4 border-t-orange-500">
                                <CardContent className="p-4 lg:p-6 text-center">
                                    <X className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-2 lg:mb-4 text-gray-300 dark:text-gray-700" />
                                    <div className="text-2xl lg:text-3xl font-bold text-gray-100 dark:text-gray-900 mb-1">
                                        {metrics.blockedAttempts}
                                    </div>
                                    <div className="text-xs lg:text-sm text-gray-400 dark:text-gray-600">BLOCKED</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-900 dark:bg-white border-gray-700 dark:border-gray-300 border-t-4 border-t-yellow-500">
                                <CardContent className="p-4 lg:p-6 text-center">
                                    <AlertTriangle className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-2 lg:mb-4 text-gray-300 dark:text-gray-700" />
                                    <div className="text-2xl lg:text-3xl font-bold text-gray-100 dark:text-gray-900 mb-1">
                                        {metrics.suspiciousDevices}
                                    </div>
                                    <div className="text-xs lg:text-sm text-gray-400 dark:text-gray-600">WARNINGS</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-900 dark:bg-white border-gray-700 dark:border-gray-300 border-t-4 border-t-green-500">
                                <CardContent className="p-4 lg:p-6 text-center">
                                    <Info className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-2 lg:mb-4 text-gray-300 dark:text-gray-700" />
                                    <div className="text-2xl lg:text-3xl font-bold text-gray-100 dark:text-gray-900 mb-1">
                                        {metrics.totalEvents}
                                    </div>
                                    <div className="text-xs lg:text-sm text-gray-400 dark:text-gray-600">EVENTS</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Dashboard Widgets */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
                            <div className="xl:col-span-1">
                                <RealTimeMonitor intrusions={intrusions} />
                            </div>
                            <div className="xl:col-span-1">
                                <ThreatAnalytics intrusions={intrusions} />
                            </div>
                        </div>

                        {/* Network Topology at bottom */}
                        <div className="grid grid-cols-1">
                            <NetworkTopology devices={devices} />
                        </div>
                    </div>
                )
            case "Activities":
                return (
                    <ActivitiesTab
                        devices={devices}
                        intrusions={intrusions}
                        onDeleteDevice={handleDeleteDevice}
                        onDeleteIntrusion={handleDeleteIntrusion}
                    />
                )
            case "Details":
                return (
                    <div className="grid grid-cols-1 gap-6">
                        <RealTimeMonitor intrusions={intrusions} />
                        <ThreatAnalytics intrusions={intrusions} />
                    </div>
                )
            case "Settings":
                return <SettingsTab />
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-black dark:bg-gray-50 text-gray-100 dark:text-gray-900">
            {/* Header */}
            <header className="bg-gray-900 dark:bg-white border-b border-gray-700 dark:border-gray-300 px-4 lg:px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 lg:gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden text-gray-400 dark:text-gray-600 hover:text-gray-100 dark:hover:text-gray-900"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-amber-500">KEYHAT</span>
                            <span className="hidden sm:block text-sm text-gray-400 dark:text-gray-600 ml-2">MONITORING SUITE</span>
                        </div>
                        <Badge
                            className={`${isSimulating ? "bg-green-600 text-white" : "bg-gray-600 text-white"} hidden sm:inline-flex`}
                        >
                            {isSimulating ? "ACTIVE" : "STANDBY"}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button
                            onClick={isSimulating ? handleStopSimulation : handleStartSimulation}
                            size="sm"
                            className={`${isSimulating ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                                } text-white px-2 lg:px-4`}
                        >
                            {isSimulating ? (
                                <>
                                    <Pause className="w-4 h-4 lg:mr-2" />
                                    <span className="hidden lg:inline">Stop</span>
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4 lg:mr-2" />
                                    <span className="hidden lg:inline">Start</span>
                                </>
                            )}
                        </Button>
                        <Button
                            onClick={handleReset}
                            variant="outline"
                            size="sm"
                            className="border-gray-600 dark:border-gray-400 text-gray-300 dark:text-gray-700 hover:bg-gray-700 dark:hover:bg-gray-100 px-2 lg:px-4"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 dark:bg-white border-r border-gray-700 dark:border-gray-300 transition-transform duration-300 ease-in-out`}
                >
                    <nav className="p-4 space-y-2 mt-16 lg:mt-0">
                        <Button
                            variant={activeTab === "Dashboard" ? "secondary" : "ghost"}
                            className={`w-full justify-start ${activeTab === "Dashboard"
                                ? "bg-gray-700 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
                                : "text-gray-300 dark:text-gray-700 hover:text-gray-100 dark:hover:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100"
                                }`}
                            onClick={() => setActiveTab("Dashboard")}
                        >
                            <LayoutDashboard className="w-4 h-4 mr-3" />
                            Dashboard
                        </Button>
                        <Button
                            variant={activeTab === "Activities" ? "secondary" : "ghost"}
                            className={`w-full justify-start ${activeTab === "Activities"
                                ? "bg-gray-700 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
                                : "text-gray-300 dark:text-gray-700 hover:text-gray-100 dark:hover:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100"
                                }`}
                            onClick={() => setActiveTab("Activities")}
                        >
                            <Activity className="w-4 h-4 mr-3" />
                            Activities
                        </Button>
                        <Button
                            variant={activeTab === "Details" ? "secondary" : "ghost"}
                            className={`w-full justify-start ${activeTab === "Details"
                                ? "bg-gray-700 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
                                : "text-gray-300 dark:text-gray-700 hover:text-gray-100 dark:hover:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100"
                                }`}
                            onClick={() => setActiveTab("Details")}
                        >
                            <FileText className="w-4 h-4 mr-3" />
                            Details
                        </Button>
                        <Button
                            variant={activeTab === "Settings" ? "secondary" : "ghost"}
                            className={`w-full justify-start ${activeTab === "Settings"
                                ? "bg-gray-700 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
                                : "text-gray-300 dark:text-gray-700 hover:text-gray-100 dark:hover:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100"
                                }`}
                            onClick={() => setActiveTab("Settings")}
                        >
                            <Settings className="w-4 h-4 mr-3" />
                            Settings
                        </Button>
                    </nav>

                    {/* Bottom indicators */}
                    <div className="absolute bottom-16 left-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm text-gray-300 dark:text-gray-700">{metrics.criticalAlerts} Alerts</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-sm text-gray-300 dark:text-gray-700">{metrics.suspiciousDevices} Critical</span>
                        </div>
                    </div>

                    {/* ausecus logo */}
                    <div className="absolute bottom-4 left-4">
                        <span className="text-xs text-gray-500 dark:text-gray-500">ausecus</span>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-6 min-h-screen">
                    {/* Mobile status badge */}
                    <div className="sm:hidden mb-4">
                        <Badge className={`${isSimulating ? "bg-green-600 text-white" : "bg-gray-600 text-white"}`}>
                            {isSimulating ? "SYSTEM ACTIVE" : "SYSTEM STANDBY"}
                        </Badge>
                    </div>

                    {renderTabContent()}
                </main>
            </div>
        </div>
    )
}

export default function Component() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="kritis-theme">
            <IntrusionDetectionApp />
        </ThemeProvider>
    )
}
