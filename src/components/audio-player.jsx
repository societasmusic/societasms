"use client"

import { Download, Pause, Play, Square, Volume2, VolumeX } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js"

const waveformOptions = (ref) => ({
    container: ref,
    progressColor: '#2b7fff',
    waveColor: '#6a728260',
    barWidth: 1,
    barGap: 2,
    normalize: true,
    backend: "webaudio",
    height: "auto",
})

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function AudioPlayer({ audioFile }) {
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [audioFileName, setAudioFileName] = useState("")
    const [muted, setMuted] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const wavesurfer = useRef(null)
    const waveformRef = useRef(null)

    useEffect(() => {
        const options = waveformOptions(waveformRef.current)
        wavesurfer.current = WaveSurfer.create(options)
        wavesurfer.current.load(audioFile)
        wavesurfer.current.on("ready", () => {
            setVolume(wavesurfer.current.getVolume())
            setDuration(wavesurfer.current.getDuration())
            setAudioFileName(audioFile.split("/").pop())
        })
        wavesurfer.current.on("audioprocess", () => {
            setCurrentTime(wavesurfer.current.getCurrentTime())
        })
        return () => {
            wavesurfer.current.un("audioprocess")
            wavesurfer.current.un("ready")
            wavesurfer.current.destroy()
        }
    }, [audioFile])
    function handlePlayPause() {
        setPlaying(!playing)
        wavesurfer.current.playPause()
    }
    function handleStop() {
        setPlaying(false)
        setCurrentTime(0)
        wavesurfer.current.stop()
    }
    function handleVolumeChange(newVolume) {
        setVolume(newVolume)
        wavesurfer.current.setVolume(newVolume)
        setMuted(newVolume === 0)
    }
    function handleMute() {
        setMuted(!muted)
        wavesurfer.current.setVolume(muted ? volume : 0)
    }
    return (
        <div className="h-16 border-b flex items-center">
            <div className="flex items-center">
                <a href={audioFile} download>
                    <Button variant="ghost" className="w-16 h-[63px] border-r">
                        <Download className="text-gray-500"/>
                    </Button>
                </a>
                <div>
                    <Button variant="ghost" className="w-16 h-[63px] border-r" onClick={handleMute}>
                        {muted ? (<VolumeX className="text-gray-500"/>): (<Volume2 className="text-gray-500"/>)}
                    </Button>
                </div>
                <div>
                    <Button variant="ghost" className="w-16 h-[63px] border-r" onClick={handlePlayPause}>
                        {playing ? (<Pause className="text-gray-500"/>): (<Play className="text-gray-500"/>)}
                    </Button>
                </div>
                <div>
                    <Button variant="ghost" className="w-16 h-[63px] border-r" onClick={handleStop}>
                        <Square className="text-gray-500"/>
                    </Button>
                </div>
                <div>
                    <div className="h-16 w-36 justify-center border-r flex items-center font-mono px-6 text-xs text-gray-500">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>
            </div>
            {/* <audio src="/adennwav-velour.mp3" ref={audioPlayer}/> */}
            <div id="waveform" ref={waveformRef} className="w-full h-[63px]"></div>
        </div>
    )
}