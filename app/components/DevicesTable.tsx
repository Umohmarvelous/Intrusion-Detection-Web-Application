"use client"

import type { NetworkDevice } from "../types/network"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Shield, ShieldAlert, ShieldX, Monitor, Server, Router, HelpCircle } from "lucide-react"

interface DevicesTableProps {
    devices: NetworkDevice[]
    onBlockDevice: (deviceId: string) => void
    onUnblockDevice: (deviceId: string) => void
}

export function DevicesTable({ devices, onBlockDevice, onUnblockDevice }: DevicesTableProps) {
    const getStatusColor = (status: NetworkDevice["status"]) => {
        switch (status) {
            case "trusted":
                return "bg-green-500"
            case "suspicious":
                return "bg-yellow-500"
            case "blocked":
                return "bg-red-500"
            default:
                return "bg-gray-500"
        }
    }

    const getStatusIcon = (status: NetworkDevice["status"]) => {
        switch (status) {
            case "trusted":
                return <Shield className="w-4 h-4" />
            case "suspicious":
                return <ShieldAlert className="w-4 h-4" />
            case "blocked":
                return <ShieldX className="w-4 h-4" />
            default:
                return <HelpCircle className="w-4 h-4" />
        }
    }

    const getDeviceIcon = (deviceType: NetworkDevice["deviceType"]) => {
        switch (deviceType) {
            case "server":
                return <Server className="w-4 h-4" />
            case "workstation":
                return <Monitor className="w-4 h-4" />
            case "router":
                return <Router className="w-4 h-4" />
            default:
                return <HelpCircle className="w-4 h-4" />
        }
    }

    return (
        <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
                <CardTitle className="text-white">Network Devices</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {devices.map((device) => (
                        <div
                            key={device.id}
                            className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-slate-400">{getDeviceIcon(device.deviceType)}</div>
                                <div>
                                    <div className="text-white font-medium">{device.hostname}</div>
                                    <div className="text-sm text-slate-400">
                                        {device.ip} | {device.mac}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-sm text-slate-400">Rep: {device.reputation}%</div>
                                <Badge className={getStatusColor(device.status)}>
                                    <span className="flex items-center gap-1">
                                        {getStatusIcon(device.status)}
                                        {device.status}
                                    </span>
                                </Badge>
                                {device.status === "blocked" ? (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => onUnblockDevice(device.id)}
                                        className="text-green-400 border-green-400 hover:bg-green-400 hover:text-white"
                                    >
                                        Unblock
                                    </Button>
                                ) : device.status === "suspicious" ? (
                                    <Button size="sm" variant="destructive" onClick={() => onBlockDevice(device.id)}>
                                        Block
                                    </Button>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
