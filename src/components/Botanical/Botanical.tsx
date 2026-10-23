import type { CSSProperties, JSX } from 'react';
import styles from './Botanical.module.css';

/**
 * Линейная ботаника в стиле печатного приглашения: тонкий золотой контур,
 * молочные лепестки. Чисто декоративный элемент — скрыт от экранных дикторов.
 */

export type BotanicalVariant = 'sprig' | 'bloom' | 'branch';

type Point = [number, number];

function leaf([x, y]: Point, angle: number, length: number, width: number) {
  const r = (angle * Math.PI) / 180;
  const tip: Point = [x + Math.cos(r) * length, y + Math.sin(r) * length];
  const mid: Point = [(x + tip[0]) / 2, (y + tip[1]) / 2];
  const off: Point = [-Math.sin(r) * width, Math.cos(r) * width];
  const f = (n: number) => n.toFixed(1);
  return {
    outline: `M${f(x)} ${f(y)}Q${f(mid[0] + off[0])} ${f(mid[1] + off[1])} ${f(tip[0])} ${f(tip[1])}Q${f(mid[0] - off[0])} ${f(mid[1] - off[1])} ${f(x)} ${f(y)}Z`,
    vein: `M${f(x)} ${f(y)}L${f(x + (tip[0] - x) * 0.75)} ${f(y + (tip[1] - y) * 0.75)}`,
  };
}

function Leaf(props: { at: Point; angle: number; length: number; width: number }) {
  const { outline, vein } = leaf(props.at, props.angle, props.length, props.width);
  return (
    <>
      <path className={styles.leaf} d={outline} />
      <path className={styles.line} d={vein} />
    </>
  );
}

function Flower({ at: [cx, cy], r, rotate = 0 }: { at: Point; r: number; rotate?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          className={styles.petal}
          cx={0}
          cy={-r * 0.55}
          rx={r * 0.36}
          ry={r * 0.55}
          transform={`rotate(${a})`}
        />
      ))}
      <circle className={styles.heart} r={r * 0.16} />
    </g>
  );
}

function Bud({ at: [x, y], angle }: { at: Point; angle: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path className={styles.petal} d="M0 0C-4 -6 -4 -13 0 -18C4 -13 4 -6 0 0Z" />
    </g>
  );
}

function Sprig() {
  return (
    <svg viewBox="0 0 120 200">
      <path className={styles.line} d="M62 198C58 160 66 120 58 82C52 54 60 30 72 14" />
      <path className={styles.line} d="M59 96C70 86 82 82 92 70" />
      <Leaf at={[61, 170]} angle={200} length={30} width={8} />
      <Leaf at={[61, 150]} angle={-20} length={28} width={7} />
      <Leaf at={[60, 124]} angle={205} length={26} width={7} />
      <Leaf at={[57, 70]} angle={195} length={22} width={6} />
      <Leaf at={[78, 82]} angle={-60} length={18} width={5} />
      <Flower at={[74, 16]} r={14} rotate={12} />
      <Bud at={[92, 70]} angle={40} />
    </svg>
  );
}

function Bloom() {
  return (
    <svg viewBox="0 0 140 140">
      <path className={styles.line} d="M70 138C70 112 66 92 52 72" />
      <path className={styles.line} d="M70 120C78 100 92 88 104 82" />
      <path className={styles.line} d="M68 104C70 84 76 62 74 42" />
      <Leaf at={[70, 128]} angle={190} length={26} width={7} />
      <Leaf at={[71, 112]} angle={-15} length={24} width={6} />
      <Flower at={[52, 66]} r={16} rotate={-8} />
      <Flower at={[106, 78]} r={12} rotate={20} />
      <Flower at={[74, 34]} r={11} rotate={35} />
      <Bud at={[40, 98]} angle={-50} />
    </svg>
  );
}

function Branch() {
  const leaves: [Point, number][] = [
    [[24, 176], -110],
    [[30, 156], 20],
    [[36, 138], -120],
    [[44, 118], 10],
    [[52, 100], -125],
    [[62, 82], 0],
    [[72, 64], -130],
    [[84, 48], -10],
  ];
  return (
    <svg viewBox="0 0 120 200">
      <path className={styles.line} d="M18 198C30 150 52 100 98 30" />
      {leaves.map(([at, angle]) => (
        <Leaf key={at.join()} at={at} angle={angle} length={20} width={5} />
      ))}
      <Bud at={[98, 30]} angle={30} />
    </svg>
  );
}

const SHAPES: Record<BotanicalVariant, () => JSX.Element> = {
  sprig: Sprig,
  bloom: Bloom,
  branch: Branch,
};

interface BotanicalProps {
  variant: BotanicalVariant;
  className?: string;
  style?: CSSProperties;
}

export function Botanical({ variant, className, style }: BotanicalProps) {
  const Shape = SHAPES[variant];
  return (
    <span
      className={[styles.botanical, className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden="true"
    >
      <Shape />
    </span>
  );
}
