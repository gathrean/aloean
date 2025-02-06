'use client';

import "../../globals.css";
import "./style.css";

import { useEffect, useRef, useState } from 'react';

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = new Audio('/will-i-see-you-again.mp3'); // 🎵 Change to your music file
        audio.loop = true; // Ensure it loops
        audioRef.current = audio;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            audio.pause();
            audio.src = ''; // Clean up memory
            document.removeEventListener('keydown', handleKeyDown);
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
            <button onClick={togglePlay} className="play-pause-button">
                {isPlaying ? '⏸' : '▶️'}
            </button>
        </div>
    );
}