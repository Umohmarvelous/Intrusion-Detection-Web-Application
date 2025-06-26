import type { NetworkDevice, NetworkEvent, IntrusionAttempt } from "../app/types/network"

export class NetworkSimulator {
    private devices: NetworkDevice[] = []
    private events: NetworkEvent[] = []
    private intrusions: IntrusionAttempt[] = []

    constructor() {
        this.initializeNetwork()
    }

    private initializeNetwork() {
        // Initialize trusted devices
        const trustedDevices: NetworkDevice[] = [
            {
                id: "1",
                ip: "192.168.1.10",
                mac: "00:1B:44:11:3A:B7",
                hostname: "server-01",
                deviceType: "server",
                status: "trusted",
                lastSeen: new Date(),
                reputation: 100,
            },
            {
                id: "2",
                ip: "192.168.1.20",
                mac: "00:1B:44:11:3A:B8",
                hostname: "workstation-01",
                deviceType: "workstation",
                status: "trusted",
                lastSeen: new Date(),
                reputation: 95,
            },
            {
                id: "3",
                ip: "192.168.1.1",
                mac: "00:1B:44:11:3A:B9",
                hostname: "router-01",
                deviceType: "router",
                status: "trusted",
                lastSeen: new Date(),
                reputation: 100,
            },
        ]

        this.devices = trustedDevices
    }

    generateRandomIp(): string {
        return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
    }

    generateSuspiciousDevice(): NetworkDevice {
        const suspiciousIps = [
            "10.0.0.1",
            "172.16.0.1",
            "203.0.113.1",
            "198.51.100.1",
            "192.0.2.1",
            "203.0.113.5",
            "198.51.100.10",
        ]

        return {
            id: Date.now().toString(),
            ip: suspiciousIps[Math.floor(Math.random() * suspiciousIps.length)],
            mac: `00:${Math.floor(Math.random() * 255)
                .toString(16)
                .padStart(2, "0")}:${Math.floor(Math.random() * 255)
                    .toString(16)
                    .padStart(2, "0")}:${Math.floor(Math.random() * 255)
                        .toString(16)
                        .padStart(2, "0")}:${Math.floor(Math.random() * 255)
                            .toString(16)
                            .padStart(2, "0")}:${Math.floor(Math.random() * 255)
                                .toString(16)
                                .padStart(2, "0")}`,
            hostname: `unknown-${Math.floor(Math.random() * 1000)}`,
            deviceType: "unknown",
            status: "suspicious",
            lastSeen: new Date(),
            reputation: Math.floor(Math.random() * 30),
        }
    }

    simulatePortScan(): IntrusionAttempt {
        const attackerIp = this.generateRandomIp()
        const targetIp = this.devices[Math.floor(Math.random() * this.devices.length)].ip

        return {
            id: Date.now().toString(),
            timestamp: new Date(),
            sourceIp: attackerIp,
            targetIp,
            attackType: "port_scan",
            severity: "medium",
            status: "detected",
            details: `Port scan detected from ${attackerIp} targeting ${targetIp}. Scanned ports: 22, 80, 443, 3389`,
        }
    }

    simulateBruteForce(): IntrusionAttempt {
        const attackerIp = this.generateRandomIp()
        const targetIp = this.devices.find((d) => d.deviceType === "server")?.ip || "192.168.1.10"

        return {
            id: Date.now().toString(),
            timestamp: new Date(),
            sourceIp: attackerIp,
            targetIp,
            attackType: "brute_force",
            severity: "high",
            status: "blocked",
            details: `Brute force attack detected from ${attackerIp} targeting SSH service on ${targetIp}. 50+ failed login attempts.`,
        }
    }

    simulateDDoS(): IntrusionAttempt {
        const attackerIp = this.generateRandomIp()
        const targetIp = this.devices[0].ip

        return {
            id: Date.now().toString(),
            timestamp: new Date(),
            sourceIp: attackerIp,
            targetIp,
            attackType: "dos",
            severity: "critical",
            status: "investigating",
            details: `DDoS attack detected from ${attackerIp}. High volume of requests targeting ${targetIp}. Traffic rate: 10,000 req/sec`,
        }
    }

    simulateMalware(): IntrusionAttempt {
        const attackerIp = this.generateRandomIp()
        const targetIp = this.devices[Math.floor(Math.random() * this.devices.length)].ip

        return {
            id: Date.now().toString(),
            timestamp: new Date(),
            sourceIp: attackerIp,
            targetIp,
            attackType: "malware",
            severity: "critical",
            status: "blocked",
            details: `Malware communication detected. ${targetIp} attempting to connect to C&C server ${attackerIp}`,
        }
    }

    generateRandomIntrusion(): IntrusionAttempt {
        const attackTypes = [
            () => this.simulatePortScan(),
            () => this.simulateBruteForce(),
            () => this.simulateDDoS(),
            () => this.simulateMalware(),
        ]

        const randomAttack = attackTypes[Math.floor(Math.random() * attackTypes.length)]
        return randomAttack()
    }

    addIntrusion(intrusion: IntrusionAttempt) {
        this.intrusions.unshift(intrusion)
        if (this.intrusions.length > 100) {
            this.intrusions = this.intrusions.slice(0, 100)
        }
    }

    addSuspiciousDevice() {
        const device = this.generateSuspiciousDevice()
        this.devices.push(device)
    }

    getDevices(): NetworkDevice[] {
        return this.devices
    }

    getIntrusions(): IntrusionAttempt[] {
        return this.intrusions
    }

    getMetrics(): any {
        const now = new Date()
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

        const recentIntrusions = this.intrusions.filter((i) => i.timestamp > oneHourAgo)

        return {
            totalEvents: this.intrusions.length,
            criticalAlerts: this.intrusions.filter((i) => i.severity === "critical").length,
            blockedAttempts: this.intrusions.filter((i) => i.status === "blocked").length,
            suspiciousDevices: this.devices.filter((d) => d.status === "suspicious").length,
            activeThreats: recentIntrusions.length,
        }
    }
}
