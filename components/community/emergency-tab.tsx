"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Clock, AlertTriangle, Hospital, Ambulance } from "lucide-react"

const emergencyContacts = [
  {
    name: "Emergency Helpline",
    number: "108",
    description: "24/7 Emergency medical services",
    type: "emergency",
    available: "24/7",
  },
  {
    name: "District Hospital",
    number: "+91-XXXXX-XXXXX",
    description: "Main district hospital emergency ward",
    type: "hospital",
    available: "24/7",
  },
  {
    name: "Primary Health Center",
    number: "+91-XXXXX-XXXXX",
    description: "Local PHC for immediate care",
    type: "clinic",
    available: "8 AM - 8 PM",
  },
  {
    name: "Community Health Worker",
    number: "+91-XXXXX-XXXXX",
    description: "Local health worker - Rajesh Kumar",
    type: "worker",
    available: "9 AM - 6 PM",
  },
  {
    name: "Ambulance Service",
    number: "102",
    description: "Free ambulance service",
    type: "ambulance",
    available: "24/7",
  },
  {
    name: "Poison Control",
    number: "1066",
    description: "National poison information center",
    type: "emergency",
    available: "24/7",
  },
]

const nearbyFacilities = [
  {
    name: "District General Hospital",
    distance: "12 km",
    type: "Hospital",
    specialties: ["Emergency", "Surgery", "ICU"],
    contact: "+91-XXXXX-XXXXX",
  },
  {
    name: "Community Health Center",
    distance: "3 km",
    type: "CHC",
    specialties: ["General Medicine", "Maternity", "Lab"],
    contact: "+91-XXXXX-XXXXX",
  },
  {
    name: "Primary Health Center",
    distance: "1.5 km",
    type: "PHC",
    specialties: ["Basic Care", "Vaccination", "First Aid"],
    contact: "+91-XXXXX-XXXXX",
  },
]

export function EmergencyTab() {
  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, "_self")
  }

  return (
    <div className="space-y-6">
      {/* Emergency Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-medium text-red-800">In case of medical emergency</h3>
              <p className="text-sm text-red-700">Call 108 immediately for ambulance service</p>
            </div>
            <Button className="ml-auto bg-red-600 hover:bg-red-700" onClick={() => handleEmergencyCall("108")}>
              Call 108
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Emergency Contacts
          </CardTitle>
          <CardDescription>Important phone numbers for health emergencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          contact.type === "emergency"
                            ? "bg-red-100"
                            : contact.type === "hospital"
                              ? "bg-blue-100"
                              : contact.type === "ambulance"
                                ? "bg-orange-100"
                                : "bg-green-100"
                        }`}
                      >
                        {contact.type === "emergency" && <AlertTriangle className="w-5 h-5 text-red-600" />}
                        {contact.type === "hospital" && <Hospital className="w-5 h-5 text-blue-600" />}
                        {contact.type === "ambulance" && <Ambulance className="w-5 h-5 text-orange-600" />}
                        {(contact.type === "clinic" || contact.type === "worker") && (
                          <Phone className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm text-muted-foreground">{contact.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="gap-1">
                        <Clock className="w-3 h-3" />
                        {contact.available}
                      </Badge>
                    </div>
                    <Button size="sm" onClick={() => handleEmergencyCall(contact.number)} className="gap-1">
                      <Phone className="w-3 h-3" />
                      {contact.number}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nearby Health Facilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Nearby Health Facilities
          </CardTitle>
          <CardDescription>Healthcare facilities in your area with distances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nearbyFacilities.map((facility, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Hospital className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{facility.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{facility.type}</p>
                    <div className="flex flex-wrap gap-1">
                      {facility.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    {facility.distance}
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleEmergencyCall(facility.contact)}>
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* First Aid Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Basic First Aid Tips</CardTitle>
          <CardDescription>Essential first aid knowledge for common emergencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Fever</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>&bull; Give plenty of fluids</li>
                <li>&bull; Use cool compress on forehead</li>
                <li>&bull; Seek medical help if fever &gt; 102°F</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">Cuts &amp; Wounds</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>&bull; Clean hands before treating</li>
                <li>&bull; Apply pressure to stop bleeding</li>
                <li>&bull; Clean wound with clean water</li>
              </ul>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-800 mb-2">Diarrhea</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>&bull; Give ORS solution frequently</li>
                <li>&bull; Continue breastfeeding for infants</li>
                <li>&bull; Seek help if signs of dehydration</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-2">Breathing Problems</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>&bull; Keep person calm and upright</li>
                <li>&bull; Loosen tight clothing</li>
                <li>&bull; Call emergency services immediately</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
