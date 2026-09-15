import { feature } from "topojson-client";
import {
  geoGraticule10,
  geoInterpolate,
  geoNaturalEarth1,
  geoPath,
  type GeoPermissibleObjects,
} from "d3-geo";
import world from "world-atlas/countries-110m.json";
import type { FeatureCollection, Geometry } from "geojson";

export const MAP_W = 1000;
export const MAP_H = 486;

type WorldProps = { name?: string };
type WorldFC = FeatureCollection<Geometry, WorldProps>;

/* Convert TopoJSON → GeoJSON FeatureCollection (110m world countries). */
const topology = world as unknown as Parameters<typeof feature>[0];
const collection = feature(
  topology,
  topology.objects.countries
) as unknown as WorldFC;

const projection = geoNaturalEarth1();
projection.fitExtent(
  [
    [4, 10],
    [MAP_W - 4, MAP_H - 6],
  ],
  collection as unknown as Parameters<typeof projection.fitExtent>[1]
);

const pathGen = geoPath(projection);

export type CountryShape = { id: string; name: string; d: string };

export const countries: CountryShape[] = collection.features
  .map((f) => ({
    id: String(f.id ?? ""),
    name: (f.properties?.name as string) ?? "",
    d: pathGen(f as unknown as GeoPermissibleObjects) ?? "",
  }))
  .filter((c) => c.d.length > 0);

export const graticule =
  pathGen(geoGraticule10() as unknown as GeoPermissibleObjects) ?? "";

export const outline =
  pathGen({ type: "Sphere" } as unknown as GeoPermissibleObjects) ?? "";

export function project(lon: number, lat: number): [number, number] {
  const p = projection([lon, lat]);
  return (p ?? [0, 0]) as [number, number];
}

/** Great-circle-ish arc between two lon/lat points, lifted for depth. */
export function arcPath(
  from: [number, number],
  to: [number, number],
  lift = 0.16
): string {
  const interp = geoInterpolate(from, to);
  const a = project(from[0], from[1]);
  const b = project(to[0], to[1]);
  const dist = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const samples = 30;
  const pts: [number, number][] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const g = interp(t);
    const [x, y] = project(g[0], g[1]);
    pts.push([x, y - Math.sin(Math.PI * t) * dist * lift]);
  }
  return pts
    .map(
      (p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`
    )
    .join(" ");
}
