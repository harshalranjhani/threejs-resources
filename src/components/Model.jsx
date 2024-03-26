import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Model = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    camera.position.z = 5;

    const onDocumentMouseMove = (event) => {
      event.preventDefault();
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      cube.rotation.x = mouseY * Math.PI;
      cube.rotation.y = mouseX * Math.PI;
      renderer.render(scene, camera);
    };

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    renderer.render(scene, camera); // Initial render

    // Cleanup on component unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      document.removeEventListener('mousemove', onDocumentMouseMove, false);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default Model;
