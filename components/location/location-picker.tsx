"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Search, Crosshair } from "lucide-react"

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void
  currentLocation?: { lat: number; lng: number; address: string }
}

export function LocationPicker({ onLocationSelect, currentLocation }: LocationPickerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLocating, setIsLocating] = useState(false)

  const handleGetCurrentLocation = () => {
    setIsLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
          }
          onLocationSelect(location)
          setIsLocating(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)
          // Fallback to Guwahati coordinates
          onLocationSelect({
            lat: 26.1445,
            lng: 91.7362,
            address: "Guwahati, Assam (Approximate)",
          })
        },
      )
    } else {
      setIsLocating(false)
      alert("Geolocation is not supported by this browser.")
    }
  }

  const popularLocations = [
    { name: "Guwahati", lat: 26.1445, lng: 91.7362, address: "Guwahati, Kamrup, Assam" },
    { name: "Jorhat", lat: 26.7509, lng: 94.2037, address: "Jorhat, Jorhat, Assam" },
    { name: "Silchar", lat: 24.8333, lng: 92.7789, address: "Silchar, Cachar, Assam" },
    { name: "Dibrugarh", lat: 27.4728, lng: 94.912, address: "Dibrugarh, Dibrugarh, Assam" },
    { name: "Tezpur", lat: 26.6335, lng: 92.7983, address: "Tezpur, Sonitpur, Assam" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Select Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Location */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for a location..."
              className="w-full pl-10 pr-3 py-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Current Location */}
        <Button
          onClick={handleGetCurrentLocation}
          disabled={isLocating}
          className="w-full gap-2 bg-transparent"
          variant="outline"
        >
          <Crosshair className="w-4 h-4" />
          {isLocating ? "Getting Location..." : "Use Current Location"}
        </Button>

        {/* Popular Locations */}
        <div>
          <h4 className="font-medium mb-2">Popular Locations</h4>
          <div className="grid grid-cols-1 gap-2">
            {popularLocations.map((location) => (
              <Button
                key={location.name}
                variant="ghost"
                className="justify-start gap-2 h-auto p-3"
                onClick={() => onLocationSelect(location)}
              >
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium">{location.name}</p>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Current Selection */}
        {currentLocation && (
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-medium mb-1">Selected Location</h4>
            <p className="text-sm text-muted-foreground">{currentLocation.address}</p>
            <p className="text-xs text-muted-foreground">
              {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
