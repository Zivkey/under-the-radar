'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceInvertedProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurfaceInverted({ className, ...props }: DottedSurfaceInvertedProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		animationId: number;
	} | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const SEPARATION = 100;
		const AMOUNTX = 60;
		const AMOUNTY = 60;

		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			1,
			10000,
		);
		// Flipped — camera looks UP from below, closer for more curve
		camera.position.set(0, -300, 900);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000, 0);

		containerRef.current.appendChild(renderer.domElement);

		const positions: number[] = [];
		const geometry = new THREE.BufferGeometry();

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				const y = 0;
				const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
				positions.push(x, y, z);
			}
		}

		geometry.setAttribute(
			'position',
			new THREE.Float32BufferAttribute(positions, 3),
		);

		const material = new THREE.PointsMaterial({
			size: 6,
			color: 0x888888,
			transparent: true,
			opacity: 0.6,
			sizeAttenuation: true,
		});

		const points = new THREE.Points(geometry, material);
		points.rotation.x = -0.25;
		scene.add(points);

		let count = 0;
		let animationId: number = 0;
		let isVisible = true;
		let lastFrameTime = 0;
		const FRAME_INTERVAL = 1000 / 30;

		const animate = (time: number) => {
			animationId = requestAnimationFrame(animate);
			if (!isVisible) return;
			if (time - lastFrameTime < FRAME_INTERVAL) return;
			lastFrameTime = time;

			const positionAttribute = geometry.attributes.position;
			const posArray = positionAttribute.array as Float32Array;

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					const index = i * 3;
					posArray[index + 1] =
						Math.sin((ix + count) * 0.3) * 100 +
						Math.sin((iy + count) * 0.5) * 100;
					i++;
				}
			}

			positionAttribute.needsUpdate = true;
			renderer.render(scene, camera);
			count += 0.02;
		};

		const visObserver = new IntersectionObserver(([entry]) => {
			isVisible = entry.isIntersecting;
		}, { threshold: 0 });
		if (containerRef.current) visObserver.observe(containerRef.current);

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);
		animate(0);

		sceneRef.current = { scene, camera, renderer, animationId };

		return () => {
			visObserver.disconnect();
			window.removeEventListener('resize', handleResize);
			if (sceneRef.current) {
				cancelAnimationFrame(sceneRef.current.animationId);
				sceneRef.current.scene.traverse((object) => {
					if (object instanceof THREE.Points) {
						object.geometry.dispose();
						if (Array.isArray(object.material)) {
							object.material.forEach((m) => m.dispose());
						} else {
							object.material.dispose();
						}
					}
				});
				sceneRef.current.renderer.dispose();
				if (containerRef.current && sceneRef.current.renderer.domElement) {
					containerRef.current.removeChild(sceneRef.current.renderer.domElement);
				}
			}
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none absolute inset-0', className)}
			{...props}
		/>
	);
}
