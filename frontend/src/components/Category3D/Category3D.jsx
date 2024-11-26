/* eslint-disable react/prop-types */
import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, ScrollControls, useScroll, Text } from "@react-three/drei";
import { easing } from "maath";
import { useNavigate } from "react-router-dom";
import "../../utils/util.js";

export const Category3D = () => (
    <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <ScrollControls pages={4} infinite style={{ scrollbarWidth: "none" }}>
            <Rig rotation={[0, 0, 0]}>
                <Carousel />
            </Rig>
        </ScrollControls>
    </Canvas>
);

function Rig(props) {
    const ref = useRef();
    const scroll = useScroll();
    useFrame((state, delta) => {
        ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
        state.events.update(); // Raycasts every frame rather than on pointer-move
        easing.damp3(
            state.camera.position,
            [-state.pointer.x * 2, 0, 10],
            0.3,
            delta
        ); // Move camera
        state.camera.lookAt(0, 0, 0); // Look at center
    });
    return <group ref={ref} {...props} />;
}

const titles = ["SOFAS", "BEDS", "DESKS", "CHAIRS", "TABLES"];
function Carousel({ radius = 1.4, count = 5 }) {
    return Array.from({ length: count }, (_, i) => (
        <Card
            key={i}
            url={`/images/categories/pic${Math.floor(i % 5) + 1}.webp`}
            title={`${titles[i]} `}
            position={[
                Math.sin((i / count) * Math.PI * 2) * radius,
                0,
                Math.cos((i / count) * Math.PI * 2) * radius,
            ]}
            rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
        />
    ));
}

function Card({ url, title, ...props }) {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const navigate = useNavigate();

    const pointerOver = (e) => (e.stopPropagation(), hover(true));
    const pointerOut = () => hover(false);

    const handleClick = () => {
        if (ref.current.material.renderOrder === 0) {
            navigate(`/category/${title}`);
            window.scrollTo(0, 0);
        }
    };

    useFrame((state, delta) => {
        ref.current.updateWorldMatrix(true, true);
        const worldPosition = new THREE.Vector3();
        ref.current.getWorldPosition(worldPosition);
        const renderOrder = worldPosition.z > 0 ? 0 : 1;
        ref.current.material.renderOrder = renderOrder;

        easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
        easing.damp(
            ref.current.material,
            "radius",
            hovered ? 0.25 : 0.1,
            0.2,
            delta
        );
        easing.damp(
            ref.current.material,
            "zoom",
            hovered ? 1.5 : 1,
            0.2,
            delta
        );
    });

    return (
        <group {...props}>
            <Image
                ref={ref}
                url={url}
                alt="category"
                transparent
                side={THREE.DoubleSide}
                onClick={handleClick}
                onPointerOver={pointerOver}
                onPointerOut={pointerOut}
            >
                <bentPlaneGeometry args={[0.1, 1, 1.1, 20, 20]} />
            </Image>

            <Text
                fontSize={0.15}
                fontWeight={700}
                anchorY="top"
                anchorX="left"
                lineHeight={0.5}
                rotation={[0, Math.PI, 0]}
                side={THREE.DoubleSide}
                position={[0.23, 0.35, -0.15]}
                material-toneMapped={false}
            >
                {title}
            </Text>
        </group>
    );
}
