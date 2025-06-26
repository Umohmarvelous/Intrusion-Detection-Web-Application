"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import type { NetworkDevice } from "../types/network"
import { Monitor, Server, Router, AlertTriangle } from "lucide-react"

interface NetworkTopologyProps {
  devices: NetworkDevice[]
}

export function NetworkTopology({ devices }: NetworkTopologyProps) {
  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "server":
        return <Server className="w-4 h-4 lg:w-6 lg:h-6" />
      case "workstation":
        return <Monitor className="w-4 h-4 lg:w-6 lg:h-6" />
      case "router":
        return <Router className="w-4 h-4 lg:w-6 lg:h-6" />
      default:
        return <AlertTriangle className="w-4 h-4 lg:w-6 lg:h-6" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "trusted":
        return "border-green-500 bg-green-500/10"
      case "suspicious":
        return "border-yellow-500 bg-yellow-500/10"
      case "blocked":
        return "border-red-500 bg-red-500/10"
      default:
        return "border-gray-500 bg-gray-500/10"
    }
  }

  return (
    <Card className="bg-gray-900 dark:bg-white border-gray-700 dark:border-gray-300">
      <CardHeader>
        <CardTitle className="text-sm text-gray-400 dark:text-gray-600 uppercase">
          <span className="hidden sm:inline">Network Topology</span>
          <span className="sm:hidden">Network</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-48 lg:h-80 bg-black dark:bg-gray-100 rounded-lg p-2 lg:p-4">
          {/* Router at center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full border-2 border-green-500 bg-green-500/10 flex items-center justify-center">
              <Router className="w-5 h-5 lg:w-8 lg:h-8 text-green-400" />
            </div>
            <div className="text-xs text-center mt-1 text-gray-300 dark:text-gray-700 hidden lg:block">Router</div>
          </div>

          {/* Connected devices in a circle */}
          {devices.map((device, index) => {
            if (device.deviceType === "router") return null

            const angle = (index * 360) / (devices.length - 1)
            const radius = 60 // Smaller radius for mobile
            const lgRadius = 100 // Larger radius for desktop
            const x = Math.cos((angle * Math.PI) / 180) * radius
            const y = Math.sin((angle * Math.PI) / 180) * radius
            const lgX = Math.cos((angle * Math.PI) / 180) * lgRadius
            const lgY = Math.sin((angle * Math.PI) / 180) * lgRadius

            return (
              <div
                key={device.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                {/* Connection line */}
                <svg
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    width: Math.abs(x) + 30,
                    height: Math.abs(y) + 30,
                    left: x < 0 ? x - 15 : -15,
                    top: y < 0 ? y - 15 : -15,
                  }}
                >
                  <line
                    x1={x < 0 ? Math.abs(x) + 15 : 15}
                    y1={y < 0 ? Math.abs(y) + 15 : 15}
                    x2={x < 0 ? 15 : Math.abs(x) + 15}
                    y2={y < 0 ? 15 : Math.abs(y) + 15}
                    stroke={device.status === "suspicious" ? "#f59e0b" : "#10b981"}
                    strokeWidth="2"
                    strokeDasharray={device.status === "suspicious" ? "5,5" : "none"}
                  />
                </svg>

                <div
                  className={`w-8 h-8 lg:w-12 lg:h-12 rounded-full border-2 ${getStatusColor(device.status)} flex items-center justify-center`}
                >
                  {getDeviceIcon(device.deviceType)}
                </div>
                <div className="text-xs text-center mt-1 text-gray-300 dark:text-gray-700 w-16 lg:w-20 hidden lg:block">
                  <div className="truncate">{device.hostname}</div>
                  <div className="text-gray-500 dark:text-gray-500 text-xs">{device.ip}</div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
