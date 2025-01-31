import { useTexture } from "@react-three/drei";
import { extend, Object3DNode, useFrame, useThree } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
  RigidBodyAutoCollider,
  RigidBodyTypeString,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { useEffect, useRef, useState } from "react";
import { CatmullRomCurve3, Mesh, Quaternion, Vector2, Vector3 } from "three";
import { TV10 } from "./Tv10";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
  }
}

export function CableTV() {
  const segmentProps = {
    type: "dynamic" as RigidBodyTypeString,
    canSleep: true,
    colliders: false as RigidBodyAutoCollider,
    angularDamping: 2,
    linearDamping: 2,
  };

  const { width, height } = useThree((state) => state.size);

  // main cable
  const mainCable = useRef<any>(null);
  const mainCableFixedPoint = useRef<RapierRigidBody>(null);
  const mainCableJ1 = useRef<RapierRigidBody>(null);
  const mainCableJ2 = useRef<RapierRigidBody>(null);
  const mainCableJ3 = useRef<RapierRigidBody>(null);
  const tv = useRef<RapierRigidBody>(null);

  const texture2 = useTexture("textures/cableMat.png");
  const texture3 = useTexture("textures/wires.png");
  const textureAlpha = useTexture("textures/alpha4.png");
  const textureAlpha2 = useTexture("textures/alpha3.png");

  const [curveMainCable] = useState(
    () =>
      new CatmullRomCurve3([
        new Vector3(),
        new Vector3(),
        new Vector3(),
        new Vector3(),
      ])
  );
  // main cable joint configuration
  useSphericalJoint(mainCableFixedPoint, mainCableJ1, [[0, 0, 0], [0, 0, 0]]) // prettier-ignore
  useSphericalJoint(mainCableJ1, mainCableJ2, [[0, 0, 0], [0, 0, 0]]) // prettier-ignore
  useSphericalJoint(mainCableJ2, mainCableJ3, [[0, 0, 0], [0, 0, 0]]) // prettier-ignore
  useSphericalJoint(mainCableJ3, tv, [[0, 0, 0], [0, 0.8, 0]]) // prettier-ignore
  curveMainCable.curveType = "chordal";

  // second cable
  const secondCable = useRef<any>(null);
  const secondCableFixedPoint = useRef<RapierRigidBody>(null);
  const secondCableJ1 = useRef<RapierRigidBody>(null);
  const secondCableJ2 = useRef<RapierRigidBody>(null);
  const secondCableJ3 = useRef<RapierRigidBody>(null);
  const secondCableJ4 = useRef<RapierRigidBody>(null);
  const [curveSecondCable] = useState(
    () =>
      new CatmullRomCurve3([
        new Vector3(),
        new Vector3(),
        new Vector3(),
        new Vector3(),
        new Vector3(),
      ])
  );
  // second cable joint configuration
  useRopeJoint(secondCableFixedPoint, secondCableJ1, [[0, 0, 0], [0, 0, 0], 1.5]) // prettier-ignore
  useRopeJoint(secondCableJ1, secondCableJ2, [[0, 0, 0], [0, 0, 0], 1.5]) // prettier-ignore
  useRopeJoint(secondCableJ2, secondCableJ3, [[0, 0, 0], [0, 0, 0], 1.5]) // prettier-ignore
  useRopeJoint(secondCableJ3, secondCableJ4, [[0, 0, 0], [0, 0, 0], 1.5]) // prettier-ignore
  useSphericalJoint(secondCableJ4, tv, [[0, 0, 0], [0.4, 0.5, -2]]) // prettier-ignore
  curveSecondCable.curveType = "chordal";

  // third cable
  const thirdCable = useRef<Mesh>(null);
  const thirdCableFixedPoint = useRef<RapierRigidBody>(null);
  const thirdCableJ1 = useRef<RapierRigidBody>(null);
  const thirdCableJ2 = useRef<RapierRigidBody>(null);
  const thirdCableJ3 = useRef<RapierRigidBody>(null);
  const [curveThirdCable] = useState(
    () =>
      new CatmullRomCurve3([
        new Vector3(),
        new Vector3(),
        new Vector3(),
        new Vector3(),
      ])
  );
  // third cable joint configuration
  useRopeJoint(thirdCableFixedPoint, thirdCableJ1, [[0, 0, 0], [0, 0, 0], 1.2]) // prettier-ignore
  useRopeJoint(thirdCableJ1, thirdCableJ2, [[0, 0, 0], [0, 0, 0], 1.2]) // prettier-ignore
  useRopeJoint(thirdCableJ2, thirdCableJ3, [[0, 0, 0], [0, 0, 0], 1.2]) // prettier-ignore
  useRopeJoint(thirdCableJ3, tv, [[0, 0, 0], [-0.5, 1, -2],1]) // prettier-ignore
  curveThirdCable.curveType = "chordal";

  // fourth cable
  const fourthCable = useRef<Mesh>(null);
  const fourthCableFixedPoint = useRef<RapierRigidBody>(null);
  const fourthCableJ1 = useRef<RapierRigidBody>(null);
  const fourthCableJ2 = useRef<RapierRigidBody>(null);

  const [curveFourthCable] = useState(
    () =>
      new CatmullRomCurve3([
        new Vector3(),
        new Vector3(),
        new Vector3(),
        new Vector3(),
      ])
  );
  // fourth cable joint configuration
  useRopeJoint(fourthCableFixedPoint, fourthCableJ1, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(fourthCableJ1, fourthCableJ2, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(fourthCableJ2, tv, [[0, 0, 0], [0.5, 1, -1],1]) // prettier-ignore

  // fifth cable
  const fifthCable = useRef<Mesh>(null);
  const fifthCableFixedPoint = useRef<RapierRigidBody>(null);
  const fifthCableJ1 = useRef<RapierRigidBody>(null);
  const fifthCableJ2 = useRef<RapierRigidBody>(null);
  const fifthCableJ3 = useRef<RapierRigidBody>(null);
  const [curveFifthCable] = useState(
    () =>
      new CatmullRomCurve3([
        new Vector3(),
        new Vector3(),
        new Vector3(),
        new Vector3(),
      ])
  );
  // fifth cable joint configuration
  useSphericalJoint(tv, fifthCableFixedPoint, [[-0.1, -2.6, -2], [0, 0, 0]]) // prettier-ignore
  useRopeJoint(fifthCableFixedPoint, fifthCableJ1, [[0.5, -2, 1], [0, 0, 0], 2]) // prettier-ignore
  useRopeJoint(fifthCableJ1, fifthCableJ2, [[0, 0, 0], [0, 0, 0], 1.5]) // prettier-ignore
  useRopeJoint(fifthCableJ2, fifthCableJ3, [[0, 0, 0], [0, 0, 0],2]) // prettier-ignore
  useSphericalJoint(fifthCableJ3,tv, [[0, 0, 0], [-1.5, 0, -3]]) // prettier-ignore

  const vec = new Vector3();
  const ang = new Vector3();
  const rot = new Vector3();
  const dir = new Vector3();

  const [dragged, drag] = useState<
    { x: number; y: number; z: number } | false
  >();
  const [hovered, hover] = useState<boolean>(false);
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [tv, mainCableJ1, mainCableJ2, mainCableJ3, mainCableFixedPoint].forEach(
        (ref) => ref.current?.wakeUp()
      );
      tv.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: tv.current.translation().z,
      });
    }
    if (mainCableFixedPoint.current) {
      // Calculate catmul curve of main cable

      curveMainCable.points[0].copy(mainCableJ3.current!.translation());
      curveMainCable.points[1].copy(mainCableJ2.current!.translation());
      curveMainCable.points[2].copy(mainCableJ1.current!.translation());
      curveMainCable.points[3].copy(mainCableFixedPoint.current.translation());

      const geometry = mainCable.current!.geometry as MeshLineGeometry;

      geometry.setPoints(curveMainCable.getPoints(30));

      // Tilt the tv back towards the screen
      ang.copy(tv.current!.angvel());
      rot.copy(tv.current!.rotation());
      const pointerVec = new Vector3();
      pointerVec
        .subVectors(vec, {
          x: state.pointer.x,
          y: state.pointer.y,
          z: 0.5,
        })
        .normalize();

      const quaternion = new Quaternion(); // create one and reuse it

      // max rotation. 1 equals full 360 degrees. 2 equals 180 degrees.
      const maxHorizontalRotation = 4;
      const maxVerticalRotation = 2;
      quaternion.setFromUnitVectors(new Vector3(0, 0, 1), pointerVec);
      const addingX =
        ang.x - (quaternion.x + rot.x * maxVerticalRotation) * 0.2;
      const addingY =
        ang.y - (quaternion.y + rot.y * maxHorizontalRotation) * 0.05;
      tv.current!.setAngvel(
        {
          x: addingX,
          y: addingY,
          z: ang.z,
        },
        true
      );
    }

    if (secondCableFixedPoint.current) {
      // Calculate catmul curve of second cable
      curveSecondCable.points[0].copy(secondCableJ4.current!.translation());
      curveSecondCable.points[1].copy(secondCableJ3.current!.translation());
      curveSecondCable.points[2].copy(secondCableJ2.current!.translation());
      curveSecondCable.points[3].copy(secondCableJ1.current!.translation());
      curveSecondCable.points[4].copy(
        secondCableFixedPoint.current.translation()
      );

      const geometry = secondCable.current!.geometry as MeshLineGeometry;

      geometry.setPoints(curveSecondCable.getPoints(30));
    }

    if (thirdCableFixedPoint.current) {
      // Calculate catmul curve of third cable
      curveThirdCable.points[0].copy(thirdCableJ3.current!.translation());
      curveThirdCable.points[1].copy(thirdCableJ2.current!.translation());
      curveThirdCable.points[2].copy(thirdCableJ1.current!.translation());
      curveThirdCable.points[3].copy(
        thirdCableFixedPoint.current.translation()
      );

      const geometry = thirdCable.current!.geometry as MeshLineGeometry;

      geometry.setPoints(curveThirdCable.getPoints(30));
    }

    if (fourthCableFixedPoint.current) {
      // Calculate catmul curve of fourth cable
      curveFourthCable.points[0].copy(tv.current!.translation());
      curveFourthCable.points[1].copy(fourthCableJ2.current!.translation());
      curveFourthCable.points[2].copy(fourthCableJ1.current!.translation());
      curveFourthCable.points[3].copy(
        fourthCableFixedPoint.current.translation()
      );

      const geometry = fourthCable.current!.geometry as MeshLineGeometry;

      geometry.setPoints(curveFourthCable.getPoints(30));
    }

    if (tv.current) {
      curveFifthCable.points[0].copy(
        fifthCableFixedPoint.current!.translation()
      );
      curveFifthCable.points[1].copy(fifthCableJ1.current!.translation());
      curveFifthCable.points[2].copy(fifthCableJ2.current!.translation());
      curveFifthCable.points[3].copy(fifthCableJ3.current!.translation());

      const geometry = fifthCable.current!.geometry as MeshLineGeometry;
      geometry.setPoints(curveFifthCable.getPoints(30));
    }
  });

  return (
    <>
      <group position={[-1, 4, 0]}>
        <group name="mainCable">
          <RigidBody
            ref={mainCableFixedPoint}
            {...segmentProps}
            type="fixed"
            position={[0, 0, 0]}
          />
          <RigidBody position={[0, 0, 0]} ref={mainCableJ1} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[0.5, 0, 0]} ref={mainCableJ2} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[0, 0, 0]} ref={mainCableJ3} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
        </group>
        <group name="secondCable">
          <RigidBody
            ref={secondCableFixedPoint}
            {...segmentProps}
            type="fixed"
            position={[4, 0, -4]}
          />
          <RigidBody
            position={[0.5, 0, 0]}
            ref={secondCableJ1}
            {...segmentProps}
          >
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[1, 0, 0]} ref={secondCableJ2} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody
            position={[1.5, 0, 0]}
            ref={secondCableJ3}
            {...segmentProps}
          >
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[2, 0, 0]} ref={secondCableJ4} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
        </group>
        <group name="thirdCable">
          <RigidBody
            ref={thirdCableFixedPoint}
            {...segmentProps}
            type="fixed"
            position={[-3, 0, -3]}
          />
          <RigidBody
            position={[-1, 0, -1]}
            ref={thirdCableJ1}
            {...segmentProps}
          >
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody
            position={[-1, 0, -1]}
            ref={thirdCableJ2}
            {...segmentProps}
          >
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody
            position={[-1, 0, -1]}
            ref={thirdCableJ3}
            {...segmentProps}
            angularDamping={100}
          >
            <BallCollider args={[0.1]} />
          </RigidBody>
        </group>
        <group name="fourthCable">
          <RigidBody
            ref={fourthCableFixedPoint}
            {...segmentProps}
            type="fixed"
            position={[0.5, 0, -2]}
          />
          <RigidBody
            position={[1, 0, -1]}
            ref={fourthCableJ1}
            {...segmentProps}
          >
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody
            position={[1, 0, -1]}
            ref={fourthCableJ2}
            {...segmentProps}
          >
            <BallCollider args={[0.1]} />
          </RigidBody>
        </group>
        <group name="fifthCable">
          <RigidBody
            ref={fifthCableFixedPoint}
            {...segmentProps}
            position={[1, 0, -1]}
          >
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[1, 0, -1]} ref={fifthCableJ1} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[1, 0, -1]} ref={fifthCableJ2} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[0, 0, 0]} ref={fifthCableJ3} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
        </group>
        <RigidBody
          position={[0.5, 3, 0]}
          ref={tv}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
          restitution={0.1}
          density={0.3}
        >
          <CuboidCollider args={[1.3, 1.125, 1]} />

          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target!.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target!.setPointerCapture(e.pointerId);
              drag(
                new Vector3()
                  .copy(e.point)
                  .sub(vec.copy(tv.current!.translation()))
              );
            }}
          >
            <TV10 />
          </group>
        </RigidBody>
      </group>
      <mesh ref={mainCable}>
        <meshLineGeometry />
        <meshLineMaterial
          depthTest={true}
          resolution={new Vector2(width, height)}
          useMap={1}
          map={texture3}
          repeat={new Vector2(0.5, 1)}
          lineWidth={2}
          alphaMap={textureAlpha}
          useAlphaMap={1}
          transparent
        />
      </mesh>
      <mesh ref={secondCable}>
        <meshLineGeometry />
        <meshLineMaterial
          depthTest={true}
          resolution={new Vector2(width, height)}
          useMap={1}
          map={texture2}
          repeat={new Vector2(1, 1)}
          lineWidth={1}
          alphaMap={textureAlpha2}
          useAlphaMap={1}
          transparent
        />
      </mesh>
      <mesh ref={thirdCable}>
        <meshLineGeometry />
        <meshLineMaterial
          depthTest={true}
          resolution={new Vector2(width, height)}
          useMap={1}
          map={texture2}
          repeat={new Vector2(1, 1)}
          lineWidth={1}
          alphaMap={textureAlpha2}
          useAlphaMap={1}
          transparent
        />
      </mesh>
      <mesh ref={fourthCable}>
        <meshLineGeometry />
        <meshLineMaterial
          depthTest={true}
          resolution={new Vector2(width, height)}
          useMap={1}
          map={texture2}
          repeat={new Vector2(1, 1)}
          lineWidth={1}
          alphaMap={textureAlpha2}
          useAlphaMap={1}
          transparent
        />
      </mesh>
      <mesh ref={fifthCable}>
        <meshLineGeometry />
        <meshLineMaterial
          depthTest={true}
          resolution={new Vector2(width, height)}
          useMap={1}
          map={texture2}
          repeat={new Vector2(1, 1)}
          lineWidth={1}
          alphaMap={textureAlpha2}
          useAlphaMap={1}
          transparent
        />
      </mesh>
    </>
  );
}
