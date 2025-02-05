'use client';

import "../../globals.css";
import "./style.css";

import { useEffect, useRef, useState } from 'react';

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = new Audio('/music.mp3'); // 🎵 Change to your music file
        audio.loop = true; // Ensure it loops
        audioRef.current = audio;

        // Auto-play when component mounts
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

        return () => {
            audio.pause();
            audio.src = ''; // Clean up memory
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="audio-player text-white">
            <button onClick={togglePlay} className="font-bold">
                {isPlaying ? '⏸ Pause' : '▶️ Play'}
            </button>
        </div>
    );
}