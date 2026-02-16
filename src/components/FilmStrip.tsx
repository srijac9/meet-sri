import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STRIP_WIDTH = 1.05;
const SEGMENTS = 900;
const SPEED = 0.26;

class FlowingRibbonCurve extends THREE.Curve<THREE.Vector3> {
  public override getPoint(t: number, target = new THREE.Vector3()): THREE.Vector3 {
    const xBase = THREE.MathUtils.lerp(-12.5, 12.5, t) + 1.2 * Math.sin(2 * Math.PI * t - 0.35);
    const yBase = 2.1 * Math.sin(Math.PI * (t + 0.08)) + 0.9 * Math.sin(2 * Math.PI * t + 0.55);
    const zBase = 3.2 * Math.sin(2 * Math.PI * t - 0.85) + 0.7 * Math.sin(4 * Math.PI * t + 0.2);

    // Localized full loop-de-loop with smooth (C-infinity) entry/exit.
    const loopCenter = 0.57;
    const loopWidth = 0.11;
    const u = (t - loopCenter) / loopWidth;
    const envelope = Math.exp(-4.5 * u * u);
    const theta = Math.PI * u; // Roughly one full 2*pi cycle over the active window.
    const loopRadius = 3.2;

    const loopX = 1.15 * envelope * Math.sin(2 * theta);
    const loopY = loopRadius * envelope * Math.sin(theta);
    const loopZ = loopRadius * envelope * (Math.cos(theta) - 1);

    target.set(xBase + loopX, yBase + loopY, zBase + loopZ);
    return target;
  }
}

function createSplinePath(): THREE.Curve<THREE.Vector3> {
  return new FlowingRibbonCurve();
}

export default function FilmStrip() {
  const meshRef = useRef<THREE.Mesh>(null);
  const offsetRef = useRef(0);
  const curve = useMemo(() => createSplinePath(), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array((SEGMENTS + 1) * 2 * 3);
    const uvs = new Float32Array((SEGMENTS + 1) * 2 * 2);
    const indices: number[] = [];

    for (let i = 0; i <= SEGMENTS; i++) {
      const idx = i * 2;
      uvs[idx * 2] = i / SEGMENTS;
      uvs[idx * 2 + 1] = 0;
      uvs[(idx + 1) * 2] = i / SEGMENTS;
      uvs[(idx + 1) * 2 + 1] = 1;

      if (i < SEGMENTS) {
        const a = idx;
        const b = idx + 1;
        const c = idx + 2;
        const d = idx + 3;
        indices.push(a, c, b, b, c, d);
      }
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    geo.setIndex(indices);

    return geo;
  }, []);

  const filmMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uOffset: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vWorldPos;

          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uOffset;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vWorldPos;

          void main() {
            vec3 baseColor = vec3(0.08, 0.08, 0.08);

            float edgeDist = min(vUv.y, 1.0 - vUv.y);
            float stripU = vUv.x * 80.0 + uOffset * 10.0;
            float holePattern = step(0.3, fract(stripU)) * step(fract(stripU), 0.7);
            float holeMask = step(edgeDist, 0.12) * holePattern * step(0.03, edgeDist);

            float frameLine = smoothstep(0.002, 0.0, abs(fract(stripU * 0.25) - 0.5) - 0.498);
            float grain = fract(sin(dot(vWorldPos.xz * 50.0, vec2(12.9898, 78.233))) * 43758.5453);

            vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
            float diffuse = max(dot(vNormal, lightDir), 0.0) * 0.6 + 0.4;

            vec3 viewDir = normalize(cameraPosition - vWorldPos);
            vec3 halfDir = normalize(lightDir + viewDir);
            float spec = pow(max(dot(vNormal, halfDir), 0.0), 60.0) * 0.4;

            vec3 frameColor = vec3(0.72, 0.72, 0.72);
            float frameArea = step(0.15, edgeDist);
            vec3 color = mix(baseColor, frameColor, frameArea * 0.5);

            color = mix(vec3(0.0), color, 1.0 - holeMask * 0.9);
            color += vec3(0.03) * frameLine;
            color *= diffuse;
            color += vec3(0.95, 0.95, 0.95) * spec;
            color += vec3(grain - 0.5) * 0.015;

            float edgeFade = smoothstep(0.0, 0.05, edgeDist);
            color *= edgeFade;

            gl_FragColor = vec4(color, 1.0);
          }
        `,
        side: THREE.DoubleSide,
      }),
    [],
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    offsetRef.current += delta * SPEED;
    filmMaterial.uniforms.uOffset.value = offsetRef.current;

    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const worldUp = new THREE.Vector3(0, 1, 0);
    const worldRight = new THREE.Vector3(1, 0, 0);
    const visibleSpan = 0.72;
    const maxStart = 1 - visibleSpan;
    const wave = (Math.sin(offsetRef.current * 0.75) + 1) * 0.5;
    const windowStart = wave * maxStart;
    const lastSide = new THREE.Vector3(1, 0, 0);
    const prevTangent = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    const point = new THREE.Vector3();
    const side = new THREE.Vector3();
    const axis = new THREE.Vector3();
    const temp = new THREE.Vector3();
    const twistedSide = new THREE.Vector3();

    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;
      const scrollT = windowStart + t * visibleSpan;

      curve.getPointAt(scrollT, point);
      curve.getTangentAt(scrollT, tangent);

      if (i === 0) {
        const refAxis = Math.abs(tangent.dot(worldUp)) > 0.9 ? worldRight : worldUp;
        side.crossVectors(refAxis, tangent);
        if (side.lengthSq() < 1e-7) {
          side.copy(lastSide);
        } else {
          side.normalize();
        }
      } else {
        // Parallel transport previous side vector to the new tangent to avoid sudden flips.
        axis.crossVectors(prevTangent, tangent);
        const axisLen = axis.length();
        if (axisLen > 1e-6) {
          axis.multiplyScalar(1 / axisLen);
          const angle = Math.acos(THREE.MathUtils.clamp(prevTangent.dot(tangent), -1, 1));
          side.applyAxisAngle(axis, angle);
        }
      }
      // Keep side orthogonal to tangent and orientation-continuous.
      temp.copy(tangent).multiplyScalar(side.dot(tangent));
      side.sub(temp).normalize();
      if (side.dot(lastSide) < 0) {
        side.multiplyScalar(-1);
      }
      lastSide.copy(side);
      prevTangent.copy(tangent);

      const twistAngle = scrollT * Math.PI * 0.12 + offsetRef.current * 0.05;
      twistedSide.copy(side).applyAxisAngle(tangent, twistAngle);

      const halfWidth = STRIP_WIDTH * 0.5;
      const idx = i * 2;

      posAttr.setXYZ(
        idx,
        point.x - twistedSide.x * halfWidth,
        point.y - twistedSide.y * halfWidth,
        point.z - twistedSide.z * halfWidth,
      );
      posAttr.setXYZ(
        idx + 1,
        point.x + twistedSide.x * halfWidth,
        point.y + twistedSide.y * halfWidth,
        point.z + twistedSide.z * halfWidth,
      );
    }

    posAttr.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return <mesh ref={meshRef} geometry={geometry} material={filmMaterial} />;
}
