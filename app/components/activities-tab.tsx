"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { ScrollArea } from "../components/ui/scroll-area"
import { Trash2, Monitor, Server, Router, AlertTriangle, Clock } from "lucide-react"
import type { NetworkDevice, IntrusionAttempt } from "../types/network"

interface ActivitiesTabProps {
    devices: NetworkDevice[]
    intrusions: IntrusionAttempt[]
    onDeleteDevice: (deviceId: string) => void
    onDeleteIntrusion: (intrusionId: string) => void
}

export function ActivitiesTab({ devices, intrusions, onDeleteDevice, onDeleteIntrusion }: ActivitiesTabProps) {
    const getDeviceIcon = (deviceType: string) => {
        switch (deviceType) {
            case "server":
                return <Server className="w-4 h-4" />
            case "workstation":
                return <Monitor className="w-4 h-4" />
            case "router":
                return <Router className="w-4 h-4" />
            default:
                return <AlertTriangle className="w-4 h-4" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "trusted":
                return "bg-green-600"
            case "suspicious":
                return "bg-yellow-600"
            case "blocked":
                return "bg-red-600"
            default:
                return "bg-gray-600"
        }
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "critical":
                return "bg-red-600"
            case "high":
                return "bg-orange-600"
            case "medium":
                return "bg-yellow-600"
            case "low":
                return "bg-blue-600"
            default:
                return "bg-gray-600"
        }
    }

    const suspiciousDevices = devices.filter((device) => device.status === "suspicious")

    return (
        <div className="space-y-6">
            {/* Detected Devices */}
            <Card className="bg-gray-900 dark:bg-gray-900 border-gray-700 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="text-gray-100 dark:text-gray-100 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Detected Suspicious Devices ({suspiciousDevices.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-64">
                        <div className="space-y-3">
                            {suspiciousDevices.map((device) => (
                                <div
                                    key={device.id}
                                    className="bg-black dark:bg-black rounded-lg p-4 border border-gray-700 dark:border-gray-700"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {getDeviceIcon(device.deviceType)}
                                            <div>
                                                <div className="font-medium text-gray-100 dark:text-gray-100">{device.hostname}</div>
                                                <div className="text-sm text-gray-400 dark:text-gray-400">
                                                    {device.ip} • {device.mac}
                                                </div>
                                            </div>
                                            <Badge className={`${getStatusColor(device.status)} text-white`}>
                                                {device.status.toUpperCase()}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400 dark:text-gray-400">Reputation: {device.reputation}%</span>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => onDeleteDevice(device.id)}
                                                className="bg-red-600 hover:bg-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {suspiciousDevices.length === 0 && (
                                <div className="text-center py-8 text-gray-400 dark:text-gray-400">
                                    <Monitor className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>No suspicious devices detected</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Recent Intrusion Attempts */}
            <Card className="bg-gray-900 dark:bg-gray-900 border-gray-700 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="text-gray-100 dark:text-gray-100 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Recent Intrusion Attempts ({intrusions.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-96">
                        <div className="space-y-3">
                            {intrusions.map((intrusion) => (
                                <div
                                    key={intrusion.id}
                                    className="bg-black dark:bg-black rounded-lg p-4 border border-gray-700 dark:border-gray-700"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-100 dark:text-gray-100">
                                                {intrusion.attackType.replace("_", " ").toUpperCase()}
                                            </span>
                                            <Badge className={`${getSeverityColor(intrusion.severity)} text-white`}>
                                                {intrusion.severity.toUpperCase()}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400 dark:text-gray-400">
                                                {intrusion.timestamp.toLocaleString()}
                                            </span>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => onDeleteIntrusion(intrusion.id)}
                                                className="bg-red-600 hover:bg-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-300 dark:text-gray-300 mb-2">
                                        <span className="text-red-400">{intrusion.sourceIp}</span>
                                        {" → "}
                                        <span className="text-blue-400">{intrusion.targetIp}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 dark:text-gray-400">{intrusion.details}</p>
                                    <Badge
                                        variant="outline"
                                        className={`mt-2 text-xs ${intrusion.status === "blocked"
                                                ? "border-green-500 text-green-400"
                                                : intrusion.status === "detected"
                                                    ? "border-yellow-500 text-yellow-400"
                                                    : "border-blue-500 text-blue-400"
                                            }`}
                                    >
                                        {intrusion.status.toUpperCase()}
                                    </Badge>
                                </div>
                            ))}
                            {intrusions.length === 0 && (
                                <div className="text-center py-8 text-gray-400 dark:text-gray-400">
                                    <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>No intrusion attempts recorded</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}
