"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import {
    Bell,
    X,
    AlertTriangle,
    Info,
    LayoutDashboard,
    Calendar,
    FileText,
    Settings,
    Cog,
    LogOut,
    Shield,
} from "lucide-react"

export default function Component() {
    const [activeTab, setActiveTab] = useState("Details")

    return (
        <div className="min-h-screen bg-slate-800 text-white">
            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-red-500">KRITIS</span>
                        <span className="text-sm text-slate-400 ml-2">MONITORING SUITE</span>
                    </div>
                    <div className="flex gap-1">
                        <Button
                            variant={activeTab === "Status" ? "secondary" : "ghost"}
                            className={`px-6 py-2 ${activeTab === "Status"
                                    ? "bg-slate-700 text-white"
                                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                                }`}
                            onClick={() => setActiveTab("Status")}
                        >
                            Status
                        </Button>
                        <Button
                            variant={activeTab === "Details" ? "secondary" : "ghost"}
                            className={`px-6 py-2 ${activeTab === "Details"
                                    ? "bg-blue-600 text-white border-b-2 border-blue-400"
                                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                                }`}
                            onClick={() => setActiveTab("Details")}
                        >
                            Details
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-slate-900 min-h-screen border-r border-slate-700">
                    <nav className="p-4 space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                            <LayoutDashboard className="w-4 h-4 mr-3" />
                            Dashboard
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                            <Calendar className="w-4 h-4 mr-3" />
                            Ereignisse
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                            <FileText className="w-4 h-4 mr-3" />
                            Resultate
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                            <Settings className="w-4 h-4 mr-3" />
                            Konfiguration
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                            <Cog className="w-4 h-4 mr-3" />
                            Einstellungen
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                            <LogOut className="w-4 h-4 mr-3" />
                            Logout
                        </Button>
                    </nav>

                    {/* Bottom indicators */}
                    <div className="absolute bottom-16 left-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm text-slate-300">2 Alarme</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-sm text-slate-300">4 Kritische</span>
                        </div>
                    </div>

                    {/* ausecus logo */}
                    <div className="absolute bottom-4 left-4">
                        <span className="text-xs text-slate-500">ausecus</span>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Metric Cards */}
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        <Card className="bg-slate-700 border-slate-600 border-t-4 border-t-red-500">
                            <CardContent className="p-6 text-center">
                                <Bell className="w-8 h-8 mx-auto mb-4 text-slate-300" />
                                <div className="text-3xl font-bold text-white mb-1">1</div>
                                <div className="text-sm text-slate-400">ALARME</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-700 border-slate-600 border-t-4 border-t-orange-500">
                            <CardContent className="p-6 text-center">
                                <X className="w-8 h-8 mx-auto mb-4 text-slate-300" />
                                <div className="text-3xl font-bold text-white mb-1">0</div>
                                <div className="text-sm text-slate-400">KRITISCHE</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-700 border-slate-600 border-t-4 border-t-yellow-500">
                            <CardContent className="p-6 text-center">
                                <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-slate-300" />
                                <div className="text-3xl font-bold text-white mb-1">24</div>
                                <div className="text-sm text-slate-400">WARNUNGEN</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-700 border-slate-600 border-t-4 border-t-green-500">
                            <CardContent className="p-6 text-center">
                                <Info className="w-8 h-8 mx-auto mb-4 text-slate-300" />
                                <div className="text-3xl font-bold text-white mb-1">14</div>
                                <div className="text-sm text-slate-400">INFOS</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Dashboard Widgets */}
                    <div className="grid grid-cols-3 gap-6">
                        {/* Event Distribution Chart */}
                        <Card className="bg-slate-700 border-slate-600">
                            <CardHeader>
                                <CardTitle className="text-sm text-slate-400 uppercase">Ereignisverteilung</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center p-6">
                                <div className="relative w-32 h-32">
                                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-red-500"
                                            strokeDasharray="25 75"
                                            strokeDashoffset="0"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-orange-500"
                                            strokeDasharray="20 80"
                                            strokeDashoffset="-25"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-yellow-500"
                                            strokeDasharray="30 70"
                                            strokeDashoffset="-45"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-green-500"
                                            strokeDasharray="25 75"
                                            strokeDashoffset="-75"
                                        />
                                    </svg>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Last Process Chart */}
                        <Card className="bg-slate-700 border-slate-600">
                            <CardHeader>
                                <CardTitle className="text-sm text-slate-400 uppercase">Last Prozessenzte</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="h-32 relative">
                                    <svg className="w-full h-full" viewBox="0 0 200 80">
                                        <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points="10,60 50,40 90,45 130,30 170,35" />
                                        <polyline fill="none" stroke="#10b981" strokeWidth="2" points="10,50 50,35 90,40 130,25 170,30" />
                                        <polyline fill="none" stroke="#f59e0b" strokeWidth="2" points="10,65 50,45 90,50 130,35 170,40" />
                                        {/* Data points */}
                                        <circle cx="10" cy="60" r="2" fill="#3b82f6" />
                                        <circle cx="50" cy="40" r="2" fill="#3b82f6" />
                                        <circle cx="90" cy="45" r="2" fill="#3b82f6" />
                                        <circle cx="130" cy="30" r="2" fill="#3b82f6" />
                                        <circle cx="170" cy="35" r="2" fill="#3b82f6" />
                                    </svg>
                                    <div className="absolute bottom-0 left-0 text-xs text-slate-500">12:00</div>
                                    <div className="absolute bottom-0 right-0 text-xs text-slate-500">18:00</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Top Hosts */}
                        <Card className="bg-slate-700 border-slate-600">
                            <CardHeader>
                                <CardTitle className="text-sm text-slate-400 uppercase">Top Hosts</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-400 w-16">192.168.1.1</span>
                                    <div className="flex-1 bg-slate-600 rounded-full h-2">
                                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-400 w-16">192.168.1.2</span>
                                    <div className="flex-1 bg-slate-600 rounded-full h-2">
                                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-400 w-16">192.168.1.3</span>
                                    <div className="flex-1 bg-slate-600 rounded-full h-2">
                                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-400 w-16">192.168.1.4</span>
                                    <div className="flex-1 bg-slate-600 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
