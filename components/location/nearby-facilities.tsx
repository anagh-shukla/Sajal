"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Navigation, Star } from "lucide-react"

const nearbyFacilities = [
  {
    id: "F001",
    name: "Guwahati Medical College Hospital",
    type: "Hospital",
    distance: "2.3 km",
    rating: 4.2,
    phone: "+91-361-2528008",
    address: "Bhangagarh, Guwahati, Assam 781032",
    services: ["Emergency", "ICU", "Surgery", "Pediatrics"],
    availability: "24/7",
    coordinates: { lat: 26.1445, lng: 91.7362 },
  },
  {
    id: "F002",
    name: "Apollo Hospitals Guwahati",
    type: "Private Hospital",
    distance: "3.1 km",
    rating: 4.5,
    phone: "+91-361-2701000",
    address: "GS Road, Christian Basti, Guwahati, Assam 781005",
    services: ["Cardiology", "Oncology", "Neurology", "Emergency"],
    availability: "24/7",
    coordinates: { lat: 26.1445, lng: 91.7362 },
  },
  {
    id: "F003",
    name: "Nemcare Hospital",
    type: "Multi-specialty",
    distance: "1.8 km",
    rating: 4.0,
    phone: "+91-361-2738000",
    address: "Bhangagarh, Guwahati, Assam 781005",
    services: ["General Medicine", "Surgery", "Gynecology"],
    availability: "6 AM - 10 PM",
    coordinates: { lat: 26.1445, lng: 91.7362 },
  },
  {
    id: "F004",
    name: "City Health Center",
    type: "Primary Health Center",
    distance: "0.9 km",
    rating: 3.8,
    phone: "+91-361-2540123",
    address: "Fancy Bazar, Guwahati, Assam 781001",
    services: ["General Consultation", "Vaccination", "Basic Treatment"],
    availability: "8 AM - 6 PM",
    coordinates: { lat: 26.1445, lng: 91.7362 },
  },
]

interface NearbyFacilitiesProps {
  userLocation?: { lat: number; lng: number }
}

export function NearbyFacilities({ userLocation }: NearbyFacilitiesProps) {
  const handleGetDirections = (facility: (typeof nearbyFacilities)[0]) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${facility.coordinates.lat},${facility.coordinates.lng}`
      window.open(url, "_blank")
    } else {
      alert("Please enable location access to get directions")
    }
  }

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Nearby Healthcare Facilities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nearbyFacilities.map((facility) => (
            <Card key={facility.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{facility.name}</h4>
                      <Badge variant="outline">{facility.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {facility.distance}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {facility.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {facility.availability}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{facility.address}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {facility.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1 bg-transparent"
                    onClick={() => handleCall(facility.phone)}
                  >
                    <Phone className="w-3 h-3" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1 bg-transparent"
                    onClick={() => handleGetDirections(facility)}
                  >
                    <Navigation className="w-3 h-3" />
                    Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
