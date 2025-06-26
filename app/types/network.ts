export interface NetworkDevice {
    id: string
    ip: string
    mac: string
    hostname: string
    deviceType: "server" | "workstation" | "router" | "unknown"
    status: "trusted" | "suspicious" | "blocked"
    lastSeen: Date
    reputation: number
}

export interface NetworkEvent {
    id: string
    timestamp: Date
    sourceIp: string
    targetIp: string
    port: number
    protocol: "TCP" | "UDP" | "ICMP"
    eventType: "connection" | "scan" | "attack" | "anomaly"
    severity: "low" | "medium" | "high" | "critical"
    description: string
    blocked: boolean
}

export interface IntrusionAttempt {
    id: string
    timestamp: Date
    sourceIp: string
    targetIp: string
    attackType: "port_scan" | "brute_force" | "dos" | "malware" | "sql_injection" | "xss"
    severity: "low" | "medium" | "high" | "critical"
    status: "detected" | "blocked" | "investigating"
    details: string
}

export interface SecurityMetrics {
    totalEvents: number
    criticalAlerts: number
    blockedAttempts: number
    suspiciousDevices: number
    activeThreats: number
}
