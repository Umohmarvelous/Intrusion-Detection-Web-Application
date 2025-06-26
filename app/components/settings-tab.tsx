"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"
import { useTheme } from "../../hooks/use-theme"
import { Moon, Sun, Shield, Bell, Database } from "lucide-react"

export function SettingsTab() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="space-y-6">
            {/* Theme Settings */}
            <Card className="bg-gray-900 dark:bg-white border-gray-700 dark:border-gray-300">
                <CardHeader>
                    <CardTitle className="text-gray-100 dark:text-gray-900 flex items-center gap-2">
                        {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        Theme Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-gray-100 dark:text-gray-900">Dark Mode</Label>
                            <p className="text-sm text-gray-400 dark:text-gray-600">Toggle between dark and light theme</p>
                        </div>
                        <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
                    </div>
                </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-gray-900 dark:bg-white border-gray-700 dark:border-gray-300">
                <CardHeader>
                    <CardTitle className="text-gray-100 dark:text-gray-900 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Security Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-gray-100 dark:text-gray-900">Auto-Block Threats</Label>
                            <p className="text-sm text-gray-400 dark:text-gray-600">Automatically block detected threats</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-gray-100 dark:text-gray-900">Real-time Monitoring</Label>
                            <p className="text-sm text-gray-400 dark:text-gray-600">Enable continuous threat monitoring</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-gray-100 dark:text-gray-900">Advanced Detection</Label>
                            <p className="text-sm text-gray-400 dark:text-gray-600">Use AI-powered threat detection</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-gray-900 dark:bg-white border-gray-700 dark:border-gray-300">
                <CardHeader>
                    <CardTitle className="text-gray-100 dark:text-gray-900 flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notification Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-gray-100 dark:text-gray-900">Critical Alerts</Label>
                            <p className="text-sm text-gray-400 dark:text-gray-600">Notify on critical security events</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-gray-100 dark:text-gray-900">Email Notifications</Label>
                            <p className="text-sm text-gray-400 dark:text-gray-600">Send alerts via email</p>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-gray-100 dark:text-gray-900">Sound Alerts</Label>
                            <p className="text-sm text-gray-400 dark:text-gray-600">Play sound for new threats</p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>

            {/* System Settings */}
            <Card className="bg-gray-900 dark:bg-white border-gray-700 dark:border-gray-300">
                <CardHeader>
                    <CardTitle className="text-gray-100 dark:text-gray-900 flex items-center gap-2">
                        <Database className="w-5 h-5" />
                        System Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-gray-100 dark:text-gray-900">Data Retention</Label>
                            <p className="text-sm text-gray-400 dark:text-gray-600">Keep logs for 30 days</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 dark:border-gray-400 text-gray-100 dark:text-gray-900"
                        >
                            Configure
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-gray-100 dark:text-gray-900">Export Data</Label>
                            <p className="text-sm text-gray-400 dark:text-gray-600">Download security reports</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 dark:border-gray-400 text-gray-100 dark:text-gray-900"
                        >
                            Export
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-gray-100 dark:text-gray-900">Reset System</Label>
                            <p className="text-sm text-gray-400 dark:text-gray-600">Clear all data and settings</p>
                        </div>
                        <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
                            Reset
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
