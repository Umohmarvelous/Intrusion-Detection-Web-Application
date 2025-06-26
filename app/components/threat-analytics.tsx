"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import type { IntrusionAttempt } from "../types/network"
import { BarChart3, TrendingUp } from "lucide-react"

interface ThreatAnalyticsProps {
    intrusions: IntrusionAttempt[]
}

export function ThreatAnalytics({ intrusions }: ThreatAnalyticsProps) {
    const attackTypeCounts = intrusions.reduce(
        (acc, intrusion) => {
            acc[intrusion.attackType] = (acc[intrusion.attackType] || 0) + 1
            return acc
        },
        {} as Record<string, number>,
    )

    const maxCount = Math.max(...Object.values(attackTypeCounts), 1)

    const getAttackTypeLabel = (type: string) => {
        switch (type) {
            case "port_scan":
                return "Port Scans"
            case "brute_force":
                return "Brute Force"
            case "dos":
                return "DDoS Attacks"
            case "malware":
                return "Malware"
            default:
                return type
        }
    }

    const getBarColor = (type: string) => {
        switch (type) {
            case "port_scan":
                return "bg-blue-500"
            case "brute_force":
                return "bg-orange-500"
            case "dos":
                return "bg-red-500"
            case "malware":
                return "bg-purple-500"
            default:
                return "bg-gray-500"
        }
    }

    return (
        <Card className="bg-gray-900 dark:bg-white border-gray-700 dark:border-gray-300">
            <CardHeader>
                <CardTitle className="text-sm text-gray-400 dark:text-gray-600 uppercase flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Threat Analytics</span>
                    <span className="sm:hidden">Analytics</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-4">
                        {Object.entries(attackTypeCounts).map(([type, count]) => (
                            <div key={type} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-300 dark:text-gray-700">{getAttackTypeLabel(type)}</span>
                                    <span className="text-sm font-bold text-gray-100 dark:text-gray-900">{count}</span>
                                </div>
                                <div className="w-full bg-gray-600 dark:bg-gray-400 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${getBarColor(type)}`}
                                        style={{ width: `${(count / maxCount) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}

                        {Object.keys(attackTypeCounts).length === 0 && (
                            <div className="text-center py-4 text-gray-400 dark:text-gray-600">
                                <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No threat data available</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-black dark:bg-gray-100 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-4 h-4 text-green-400" />
                                <span className="text-sm font-medium text-green-400">Threat Trend</span>
                            </div>
                            <p className="text-xs text-gray-400 dark:text-gray-600">
                                {intrusions.length > 0
                                    ? `${intrusions.filter((i) => i.timestamp > new Date(Date.now() - 60 * 60 * 1000)).length} threats detected in the last hour`
                                    : "No recent threats detected"}
                            </p>
                        </div>

                        <div className="p-4 bg-black dark:bg-gray-100 rounded-lg">
                            <div className="text-sm font-medium text-gray-300 dark:text-gray-700 mb-2">System Status</div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400 dark:text-gray-600">Total Events</span>
                                    <span className="text-gray-100 dark:text-gray-900">{intrusions.length}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400 dark:text-gray-600">Critical Threats</span>
                                    <span className="text-red-400">{intrusions.filter((i) => i.severity === "critical").length}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400 dark:text-gray-600">Blocked Attempts</span>
                                    <span className="text-green-400">{intrusions.filter((i) => i.status === "blocked").length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
