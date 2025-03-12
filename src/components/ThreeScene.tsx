
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    
    // Camera setup with responsive settings
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.z = 20;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isMobile ? 1000 : 2500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    // Fill positions with random values
    for (let i = 0; i < particlesCount * 3; i++) {
      // Create a spread that's wider horizontally than vertically
      if (i % 3 === 0) {
        // x position (wider spread)
        posArray[i] = (Math.random() - 0.5) * 60;
      } else if (i % 3 === 1) {
        // y position (less spread)
        posArray[i] = (Math.random() - 0.5) * 40;
      } else {
        // z position (depth)
        posArray[i] = (Math.random() - 0.5) * 30;
      }
      
      // Set point size
      if (i % 3 === 0) {
        scaleArray[i/3] = Math.random() * 0.5 + 0.2;
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create gradient texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(120, 150, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(100, 120, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(80, 100, 200, 0.5)');
      gradient.addColorStop(1, 'rgba(50, 50, 150, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    const particleTexture = new THREE.CanvasTexture(canvas);
    
    // Material setup with custom shaders
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      sizeAttenuation: true,
      transparent: true,
      alphaMap: particleTexture,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
    
    // Create color array for each particle
    const colors = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      // Blue to purple gradient
      const r = Math.random() * 0.3 + 0.1; // 0.1 - 0.4
      const g = Math.random() * 0.2 + 0.1; // 0.1 - 0.3
      const b = Math.random() * 0.5 + 0.5; // 0.5 - 1.0
      
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }
    
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create the particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    
    function onMouseMove(event: MouseEvent) {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    
    window.addEventListener('mousemove', onMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      // Rotate the entire particle system slowly
      particleSystem.rotation.x += 0.0002;
      particleSystem.rotation.y += 0.0003;
      
      // Subtle mouse interaction
      if (mouse.x && mouse.y) {
        particleSystem.rotation.x += mouse.y * 0.0005;
        particleSystem.rotation.y += mouse.x * 0.0005;
      }
      
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      scene.remove(particleSystem);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [isMobile]);
  
  return <div ref={containerRef} className="canvas-container" />;
};

export default ThreeScene;
