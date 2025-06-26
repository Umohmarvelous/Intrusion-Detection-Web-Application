import type { SecurityEvent } from "../types/network"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { AlertTriangle, Shield, X, Info } from "lucide-react"

interface EventsTableProps {
    events: SecurityEvent[]
}

export function EventsTable({ events }: EventsTableProps) {
    const getSeverityColor = (severity: SecurityEvent["severity"]) => {
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

    const getSeverityIcon = (severity: SecurityEvent["severity"]) => {
        switch (severity) {
            case "critical":
                return <X className="w-4 h-4" />
            case "high":
                return <AlertTriangle className="w-4 h-4" />
            case "medium":
                return <Shield className="w-4 h-4" />
            case "low":
                return <Info className="w-4 h-4" />
            default:
                return <Info className="w-4 h-4" />
        }
    }

    return (
        <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
                <CardTitle className="text-white">Security Events</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {events.length === 0 ? (
                        <p className="text-slate-400 text-center py-4">No security events detected</p>
                    ) : (
                        events.map((event) => (
                            <div
                                key={event.id}
                                className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${getSeverityColor(event.severity)}`}>
                                        {getSeverityIcon(event.severity)}
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{event.description}</div>
                                        <div className="text-sm text-slate-400">
                                            {event.sourceIp} → {event.targetIp} | {event.timestamp.toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={event.blocked ? "destructive" : "secondary"}>
                                        {event.blocked ? "Blocked" : "Allowed"}
                                    </Badge>
                                    <Badge className={getSeverityColor(event.severity)}>{event.severity.toUpperCase()}</Badge>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
