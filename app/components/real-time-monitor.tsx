"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ScrollArea } from "../components/ui/scroll-area"
import type { IntrusionAttempt } from "../types/network"
import { AlertTriangle, Shield, Clock, Ban } from "lucide-react"

interface RealTimeMonitorProps {
    intrusions: IntrusionAttempt[]
}

export function RealTimeMonitor({ intrusions }: RealTimeMonitorProps) {
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "critical":
                return "bg-red-500"
            case "high":
                return "bg-orange-500"
            case "medium":
                return "bg-yellow-500"
            case "low":
                return "bg-blue-500"
            default:
                return "bg-gray-500"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "blocked":
                return <Ban className="w-4 h-4" />
            case "detected":
                return <AlertTriangle className="w-4 h-4" />
            case "investigating":
                return <Clock className="w-4 h-4" />
            default:
                return <Shield className="w-4 h-4" />
        }
    }

    const getAttackTypeLabel = (type: string) => {
        switch (type) {
            case "port_scan":
                return "Port Scan"
            case "brute_force":
                return "Brute Force"
            case "dos":
                return "DDoS Attack"
            case "malware":
                return "Malware"
            case "sql_injection":
                return "SQL Injection"
            case "xss":
                return "XSS Attack"
            default:
                return type
        }
    }

    return (
        <Card className="bg-gray-900 dark:bg-white border-gray-700 dark:border-gray-300">
            <CardHeader>
                <CardTitle className="text-sm text-gray-400 dark:text-gray-600 uppercase flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="hidden sm:inline">Real-Time Intrusion Detection</span>
                    <span className="sm:hidden">Live Threats</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-64 lg:h-96">
                    <div className="space-y-3">
                        {intrusions.slice(0, 20).map((intrusion) => (
                            <div
                                key={intrusion.id}
                                className="bg-black dark:bg-gray-100 rounded-lg p-3 lg:p-4 border border-gray-700 dark:border-gray-300"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        {getStatusIcon(intrusion.status)}
                                        <span className="font-medium text-gray-100 dark:text-gray-900 text-sm lg:text-base truncate">
                                            {getAttackTypeLabel(intrusion.attackType)}
                                        </span>
                                        <Badge className={`${getSeverityColor(intrusion.severity)} text-white text-xs`}>
                                            {intrusion.severity.toUpperCase()}
                                        </Badge>
                                    </div>
                                    <span className="text-xs text-gray-400 dark:text-gray-600 whitespace-nowrap ml-2">
                                        {intrusion.timestamp.toLocaleTimeString()}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-300 dark:text-gray-700 mb-2">
                                    <span className="text-red-400">{intrusion.sourceIp}</span>
                                    {" → "}
                                    <span className="text-blue-400">{intrusion.targetIp}</span>
                                </div>
                                <p className="text-xs text-gray-400 dark:text-gray-600 line-clamp-2">{intrusion.details}</p>
                                <div className="mt-2">
                                    <Badge
                                        variant="outline"
                                        className={`text-xs ${intrusion.status === "blocked"
                                            ? "border-green-500 text-green-400"
                                            : intrusion.status === "detected"
                                                ? "border-yellow-500 text-yellow-400"
                                                : "border-blue-500 text-blue-400"
                                            }`}
                                    >
                                        {intrusion.status.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                        {intrusions.length === 0 && (
                            <div className="text-center py-8 text-gray-400 dark:text-gray-600">
                                <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>No intrusion attempts detected</p>
                                <p className="text-xs mt-1">Start simulation to see live threats</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
