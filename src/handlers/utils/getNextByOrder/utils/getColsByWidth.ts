export default function getColsByWidth (
  breakpoints: Record<number, number>,
  screenWidth: number
) {
  return Object.entries(breakpoints).reduce((acc, [breakpoint, columns]) => (
    screenWidth >= parseInt(breakpoint, 10) ? columns : acc
  ), 0)
}
