export function formatDistance(distance: number): string {
  if (distance < 100) {
    return `${distance.toFixed(1)} cm`;
  } else {
    return `${(distance / 100).toFixed(2)} m`;
  }
}

