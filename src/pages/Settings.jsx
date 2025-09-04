"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // ✅ Lucide icons
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import MyButton from "@/components/ui/MyButton";
import { useToast } from "@/hooks/use-toast"; // ✅ correct import

// ---------- Dark Mode Hook ----------
const useDarkMode = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return [isDarkMode, toggleDarkMode];
};

// ---------- Main Settings Page ----------
export default function AdminSettingsPage() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const { toast } = useToast();

  const defaultSettings = {
    defaultLanguage: "en-US",
    productSorting: "newest_first",
    enableReviews: true,
    promoCodeStatus: true,
    lowStockThreshold: 10,
    twoFactorAuth: false,
    emailNotifications: true,
  };

  const [settings, setSettings] = useState(defaultSettings);

  // Load saved settings
  useEffect(() => {
    const saved = localStorage.getItem("admin-settings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  // Save settings
  const handleSave = () => {
    localStorage.setItem("admin-settings", JSON.stringify(settings));
    toast({
      title: "✅ Settings saved",
      description: "Your changes have been successfully updated.",
    });
  };

  // Reset settings
  const handleReset = () => {
    setSettings(defaultSettings);
    localStorage.setItem("admin-settings", JSON.stringify(defaultSettings));
    toast({
      title: "🔄 Settings reset",
      description: "All settings have been reset to defaults.",
    });
  };

  return (
    <div className="bg-background min-h-screen p-8 transition-colors">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            SUGAR Admin Settings
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6 text-yellow-400" />
            ) : (
              <Moon className="h-6 w-6 text-gray-500" />
            )}
          </button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="product">Product</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* General */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Admin Panel Language</Label>
                  <Select
                    value={settings.defaultLanguage}
                    onValueChange={(value) =>
                      setSettings((p) => ({ ...p, defaultLanguage: value }))
                    }
                  >
                    <SelectTrigger className="mt-2 w-[250px]">
                      <SelectValue placeholder="Choose language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English</SelectItem>
                      <SelectItem value="es-ES">Spanish</SelectItem>
                      <SelectItem value="fr-FR">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Product */}
          <TabsContent value="product">
            <Card>
              <CardHeader>
                <CardTitle>Product & Catalog</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Default Product Sorting</Label>
                  <Select
                    value={settings.productSorting}
                    onValueChange={(value) =>
                      setSettings((p) => ({ ...p, productSorting: value }))
                    }
                  >
                    <SelectTrigger className="mt-2 w-[250px]">
                      <SelectValue placeholder="Choose sorting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest_first">Newest First</SelectItem>
                      <SelectItem value="price_low_to_high">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price_high_to_low">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="best_sellers">Best Sellers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Enable Product Reviews</Label>
                  <Switch
                    checked={settings.enableReviews}
                    onCheckedChange={(v) =>
                      setSettings((p) => ({ ...p, enableReviews: v }))
                    }
                  />
                </div>

                <div>
                  <Label>Low Stock Threshold</Label>
                  <Input
                    type="number"
                    min={1}
                    className="mt-2 w-[150px]"
                    value={settings.lowStockThreshold}
                    onChange={(e) =>
                      setSettings((p) => ({
                        ...p,
                        lowStockThreshold: Math.max(1, Number(e.target.value)),
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketing */}
          <TabsContent value="marketing">
            <Card>
              <CardHeader>
                <CardTitle>Marketing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label>Enable Promo Codes</Label>
                  <Switch
                    checked={settings.promoCodeStatus}
                    onCheckedChange={(v) =>
                      setSettings((p) => ({ ...p, promoCodeStatus: v }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>New Order Email Notifications</Label>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(v) =>
                      setSettings((p) => ({ ...p, emailNotifications: v }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label>Require Admin 2FA</Label>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(v) =>
                      setSettings((p) => ({ ...p, twoFactorAuth: v }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <MyButton onClick={handleSave} className="flex-1">
            Save Changes
          </MyButton>
          <MyButton
            onClick={handleReset}
            className="flex-1 bg-gray-400 hover:bg-gray-500"
          >
            Reset Defaults
          </MyButton>
        </div>
      </div>
    </div>
  );
}
