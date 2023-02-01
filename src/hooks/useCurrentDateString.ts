export default function useCurrentDateString() {
  const date = new Date();

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${date.getDate().toString().padStart(2, "0")}`;
}
