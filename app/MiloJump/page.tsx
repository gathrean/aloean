// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import './style.css';

// const MiloJump = () => {
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     const [isJumping, setIsJumping] = useState(false);
//     const scoreRef = useRef(0); // Track score without re-renders
//     let jumpCount = 0; // Track jumps

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         const gravity = 0.5;
//         let velocityY = 0;
//         let miloY = 150;
//         let isGameOver = false;
//         let obstacles: { x: number; width: number; height: number }[] = [];

//         const milo = { x: 50, y: miloY, width: 40, height: 40 };

//         const jump = () => {
//             if (jumpCount < 2) {
//                 velocityY = -10;
//                 jumpCount++;
//                 setIsJumping(true);
//             }
//         };

//         const handleKeyDown = (e: KeyboardEvent) => {
//             if (e.code === 'Space') jump();
//         };

//         document.addEventListener('keydown', handleKeyDown);

//         const spawnObstacle = () => {
//             if (isGameOver) return;
//             const width = Math.random() * 20 + 20;
//             const height = Math.random() * 30 + 20;
//             obstacles.push({ x: canvas.width, width, height });
//             setTimeout(spawnObstacle, Math.random() * 2000 + 1500);
//         };
//         spawnObstacle();

//         const update = () => {
//             if (isGameOver) return;
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             velocityY += gravity;
//             milo.y += velocityY;

//             if (milo.y >= 150) {
//                 milo.y = 150;
//                 setIsJumping(false);
//                 jumpCount = 0; // Reset jump count when landing
//             }

//             ctx.fillStyle = 'green';
//             ctx.fillRect(milo.x, milo.y, milo.width, milo.height);

//             ctx.fillStyle = 'brown';
//             obstacles.forEach((obstacle, index) => {
//                 obstacle.x -= 5;
//                 ctx.fillRect(obstacle.x, 160 - obstacle.height, obstacle.width, obstacle.height);

//                 // Check for collision
//                 if (
//                     milo.x < obstacle.x + obstacle.width &&
//                     milo.x + milo.width > obstacle.x &&
//                     milo.y + milo.height > 160 - obstacle.height
//                 ) {
//                     isGameOver = true;
//                     alert('Game Over!');
//                     document.location.reload();
//                 }

//                 // Increase score if obstacle passes by without collision
//                 if (obstacle.x + obstacle.width < 0) {
//                     obstacles.splice(index, 1);
//                     scoreRef.current += 1; // Increment score directly
//                 }
//             });

//             // Display score without re-rendering
//             ctx.fillStyle = 'black';
//             ctx.font = '20px Arial';
//             ctx.fillText(`Score: ${scoreRef.current}`, 10, 30);

//             requestAnimationFrame(update);
//         };
//         update();

//         return () => {
//             document.removeEventListener('keydown', handleKeyDown);
//         };
//     }, []); // Only run on mount

//     return (
//         <div className="milo-jump-container">
//             <h1 className="milo-jump-title">MILO JUMP</h1>
//             <canvas ref={canvasRef} width={600} height={200} className="milo-jump-canvas" />
//             <p className="milo-jump-instructions">Press Space to Jump!</p>
//         </div>
//     );
// };

// export default MiloJump;