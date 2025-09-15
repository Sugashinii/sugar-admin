"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

// -------------------- DARK MODE HOOK --------------------
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return [isDark, setIsDark];
};

// -------------------- MAIN COMPONENT --------------------
export default function AdminSettingsPage() {
  const [isDarkMode, setDarkMode] = useDarkMode();
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

  useEffect(() => {
    const saved = localStorage.getItem("admin-settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("admin-settings", JSON.stringify(settings));
    toast({
      title: "✅ Settings saved",
      description: "Your changes have been successfully updated.",
    });
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    localStorage.setItem("admin-settings", JSON.stringify(defaultSettings));
    toast({
      title: "🔄 Settings reset",
      description: "All settings have been reset to their default values.",
    });
  };

  return (
    <div className="min-h-screen p-8  transition-colors">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-gray-100">
            SUGAR Admin Settings
          </h1>
          <button
            onClick={() => setDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700  dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6 text-yellow-400" />
            ) : (
              <Moon className="h-6 w-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* TABS */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="product">Product</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* GENERAL TAB */}
          <TabsContent value="general">
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="language-select">Admin Panel Language</Label>
                  <Select
                    value={settings.defaultLanguage}
                    onValueChange={(value) =>
                      setSettings((p) => ({ ...p, defaultLanguage: value }))
                    }
                  >
                    <SelectTrigger
                      id="language-select"
                      className="mt-2 w-[250px]"
                    >
                      <SelectValue placeholder="Choose language" />
                    </SelectTrigger>
                    <SelectContent className="bg-white ">
                      <SelectItem value="en-US">English</SelectItem>
                      <SelectItem value="es-ES">Spanish</SelectItem>
                      <SelectItem value="fr-FR">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PRODUCT TAB */}
          <TabsContent value="product">
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle>Product & Catalog</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="sorting-select">Default Product Sorting</Label>
                  <Select
                    value={settings.productSorting}
                    onValueChange={(value) =>
                      setSettings((p) => ({ ...p, productSorting: value }))
                    }
                  >
                    <SelectTrigger
                      id="sorting-select"
                      className="mt-2 w-[250px]"
                    >
                      <SelectValue placeholder="Choose sorting" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:text-gray-100">
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
                  <Label htmlFor="reviews-switch">Enable Product Reviews</Label>
                  <Switch
                    id="reviews-switch"
                    checked={settings.enableReviews}
                    onCheckedChange={(v) =>
                      setSettings((p) => ({ ...p, enableReviews: v }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="stock-threshold">Low Stock Threshold</Label>
                  <Input
                    id="stock-threshold"
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

          {/* MARKETING TAB */}
          <TabsContent value="marketing">
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle>Marketing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="promo-switch">Enable Promo Codes</Label>
                  <Switch
                    id="promo-switch"
                    checked={settings.promoCodeStatus}
                    onCheckedChange={(v) =>
                      setSettings((p) => ({ ...p, promoCodeStatus: v }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="email-switch">
                    New Order Email Notifications
                  </Label>
                  <Switch
                    id="email-switch"
                    checked={settings.emailNotifications}
                    onCheckedChange={(v) =>
                      setSettings((p) => ({ ...p, emailNotifications: v }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECURITY TAB */}
          <TabsContent value="security">
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="2fa-switch">Require Admin 2FA</Label>
                  <Switch
                    id="2fa-switch"
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

        {/* BUTTONS */}
        <div className="mt-8 flex gap-4">
          <MyButton onClick={handleSave} className="flex-1">
            Save Changes
          </MyButton>
          <MyButton
            onClick={handleReset}
            className="flex-1 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            Reset Defaults
          </MyButton>
        </div>
      </div>
    </div>
  );
}
