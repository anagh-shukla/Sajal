"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Volume2, Download, Eye, FileText, Pause } from "lucide-react"
import { useState, useRef } from "react"

const healthPosters = [
  {
    title: "Hand Hygiene Best Practices",
    description: "Learn proper handwashing techniques to prevent diseases",
    type: "pdf",
    language: "English/Hindi",
    views: 234,
    pdfUrl: "/hand-hygiene-poster-with-step-by-step-handwashing-.jpg",
  },
  {
    title: "Water Purification Methods",
    description: "Safe ways to purify water at home",
    type: "pdf",
    language: "English/Hindi",
    views: 189,
    pdfUrl: "/water-purification-methods-poster-with-boiling-and.jpg",
  },
  {
    title: "Dengue Prevention Guide",
    description: "How to prevent dengue fever in your community",
    type: "pdf",
    language: "English/Hindi/Tribal",
    views: 156,
    pdfUrl: "/dengue-prevention-guide-poster-with-mosquito-contr.jpg",
  },
]

const healthVideos = [
  {
    title: "Community Health Awareness",
    description: "Understanding common health issues in rural areas",
    duration: "5:30",
    language: "Hindi",
    views: 1234,
    videoUrl: "/community-health-awareness-video-thumbnail.jpg",
    isPlaceholder: true,
  },
  {
    title: "Safe Drinking Water Practices",
    description: "Ensuring water safety for your family",
    duration: "3:45",
    language: "English",
    views: 987,
    videoUrl: "/safe-drinking-water-practices-video-thumbnail.jpg",
    isPlaceholder: true,
  },
  {
    title: "First Aid Basics",
    description: "Essential first aid techniques everyone should know",
    duration: "7:20",
    language: "Hindi",
    views: 756,
    videoUrl: "/first-aid-training-video-thumbnail-with-cpr-and-wo.jpg",
    isPlaceholder: true,
  },
]

const voiceNotes = [
  {
    title: "Seasonal Health Tips",
    description: "Important health advice for monsoon season",
    duration: "2:15",
    language: "Hindi",
    plays: 456,
    audioUrl:
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  },
  {
    title: "Water Safety Guidelines",
    description: "How to ensure safe drinking water at home",
    duration: "1:45",
    language: "Hindi",
    plays: 678,
    audioUrl:
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  },
  {
    title: "Emergency Response Steps",
    description: "What to do in medical emergencies",
    duration: "4:10",
    language: "English/Hindi",
    plays: 345,
    audioUrl:
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  },
  {
    title: "Hygiene Practices for Families",
    description: "Daily hygiene routines for better health",
    duration: "2:50",
    language: "Tribal",
    plays: 289,
    audioUrl:
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  },
]

export function AwarenessTab() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const [playingAudio, setPlayingAudio] = useState<number | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([])

  const handleVideoPlay = async (index: number) => {
    if (healthVideos[index].isPlaceholder) {
      setPlayingVideo(playingVideo === index ? null : index)
      return
    }

    const video = videoRefs.current[index]
    if (!video) return

    try {
      if (playingVideo === index) {
        await video.pause()
        setPlayingVideo(null)
      } else {
        await Promise.all(
          videoRefs.current.map(async (v, i) => {
            if (v && i !== index && !v.paused) {
              try {
                await v.pause()
              } catch (error) {
                console.log("[v0] Video pause error (expected):", error)
              }
            }
          }),
        )

        await new Promise((resolve) => setTimeout(resolve, 100))

        await video.play()
        setPlayingVideo(index)
      }
    } catch (error) {
      console.log("[v0] Video operation error:", error)
      setPlayingVideo(null)
    }
  }

  const handleAudioPlay = async (index: number) => {
    const audio = audioRefs.current[index]
    if (!audio) return

    try {
      if (playingAudio === index) {
        audio.pause()
        setPlayingAudio(null)
      } else {
        audioRefs.current.forEach((a, i) => {
          if (a && i !== index && !a.paused) {
            a.pause()
          }
        })

        audio.currentTime = 0
        audio.play()
        setPlayingAudio(index)
      }
    } catch (error) {
      console.log("[v0] Audio operation error:", error)
      setPlayingAudio(null)
    }
  }

  const handlePdfView = (title: string, pdfUrl: string) => {
    window.open(pdfUrl, "_blank")
  }

  return (
    <div className="space-y-6">
      {/* Health Posters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Health Awareness Posters (PDF)
          </CardTitle>
          <CardDescription>
            Educational PDF posters about health and hygiene - downloadable and printable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthPosters.map((poster, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] bg-gradient-to-br from-red-100 to-red-200 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={poster.pdfUrl || "/placeholder.svg"}
                      alt={poster.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h4 className="font-medium mb-2">{poster.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{poster.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{poster.language}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="w-3 h-3" />
                      {poster.views}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-1 bg-transparent"
                      onClick={() => handlePdfView(poster.title, poster.pdfUrl)}
                    >
                      <Eye className="w-3 h-3" />
                      View PDF
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Videos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Educational Videos
          </CardTitle>
          <CardDescription>Interactive video content about health awareness and prevention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthVideos.map((video, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={video.videoUrl || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      {playingVideo === index ? (
                        <Pause className="w-12 h-12 text-white cursor-pointer" onClick={() => handleVideoPlay(index)} />
                      ) : (
                        <Play className="w-12 h-12 text-white cursor-pointer" onClick={() => handleVideoPlay(index)} />
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    {playingVideo === index && (
                      <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        DEMO MODE
                      </div>
                    )}
                  </div>
                  <h4 className="font-medium mb-2">{video.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{video.language}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="w-3 h-3" />
                      {video.views}
                    </div>
                  </div>
                  <Button size="sm" className="w-full gap-1" onClick={() => handleVideoPlay(index)}>
                    {playingVideo === index ? (
                      <>
                        <Pause className="w-3 h-3" />
                        Pause Video
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" />
                        Watch Video
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Voice Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Voice Notes & Audio Content
          </CardTitle>
          <CardDescription>Interactive audio messages and health tips in local languages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {voiceNotes.map((note, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center relative">
                  <Volume2 className="w-6 h-6 text-orange-600" />
                  {playingAudio === index && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{note.title}</h4>
                  <p className="text-sm text-muted-foreground">{note.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">{note.language}</Badge>
                    <span className="text-sm text-muted-foreground">{note.duration}</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Play className="w-3 h-3" />
                      {note.plays} plays
                    </div>
                    {playingAudio === index && (
                      <Badge variant="destructive" className="text-xs">
                        PLAYING
                      </Badge>
                    )}
                  </div>
                  <audio
                    ref={(el) => (audioRefs.current[index] = el)}
                    onEnded={() => setPlayingAudio(null)}
                    onPause={() => setPlayingAudio(null)}
                    onPlay={() => setPlayingAudio(index)}
                    className="hidden"
                  >
                    <source src={note.audioUrl} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 bg-transparent"
                  onClick={() => handleAudioPlay(index)}
                >
                  {playingAudio === index ? (
                    <>
                      <Pause className="w-3 h-3" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" />
                      Play
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Precautions */}
      <Card>
        <CardHeader>
          <CardTitle>Health Precautions & Tips</CardTitle>
          <CardDescription>Important health guidelines for your community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Water Safety</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Boil water for at least 1 minute before drinking</li>
                <li>• Store water in clean, covered containers</li>
                <li>• Use water purification tablets if available</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">Personal Hygiene</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Wash hands frequently with soap</li>
                <li>• Keep fingernails short and clean</li>
                <li>• Cover mouth when coughing or sneezing</li>
              </ul>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-800 mb-2">Food Safety</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Cook food thoroughly and eat while hot</li>
                <li>• Avoid raw or undercooked foods</li>
                <li>• Keep food covered and protected from flies</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-2">Disease Prevention</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Remove stagnant water around homes</li>
                <li>• Use mosquito nets while sleeping</li>
                <li>• Get vaccinated as per schedule</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
