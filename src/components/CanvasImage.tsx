import { useRef } from "react";
import Skeleton from "react-loading-skeleton";
import useSWRImmutable from "swr/immutable";
import { useGuesses } from "../hooks/useGuesses";
import 'react-loading-skeleton/dist/skeleton.css'
import { gray } from "tailwindcss/colors";

interface Props {
  url: string;
  className?: string;
}

const pixelValues = new Map<number, number>([
  [5, 5],
  [4, 10],
  [3, 15],
  [2, 20],
  [1, 25]
]);

export default function CanvasImage({ url, className }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const remaining = useGuesses(state => state.remaining);
  const hasWon = useGuesses(state => state.hasWon);
  const hasLost = useGuesses(state => state.hasLost);

  const img = new Image();
  const { data, isLoading, error } = useSWRImmutable<{ base64_img: string }>(url, async () => {
    return fetch(url).then((res) => res.json());
  });

  if (!isLoading && data) {
    img.src = `data:image/png;base64,${data.base64_img}`;
  }

  function pixelate() {
    canvas.current!.width = img.width;
    canvas.current!.height = img.height;

    const size = hasLost || hasWon ? 1 : (pixelValues.get(remaining) || 100) * 0.01;
    const w = canvas.current!.width * size;
    const h = canvas.current!.height * size;
    
    const ctx = canvas.current!.getContext("2d");
    ctx!.drawImage(img, 0, 0, w, h);
    ctx!.imageSmoothingEnabled = false;
    ctx!.drawImage(canvas.current!, 0, 0, w, h, 0, 0, canvas.current!.width, canvas.current!.height);
  }

  img.addEventListener("load", () => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      canvas.current.width = img.width / 4;
      canvas.current.height = img.height / 4;
      ctx!.drawImage(img, 0, 0, canvas.current.width, canvas.current.height);
      pixelate();
    }
  });

  return (
    <>
      { isLoading ? (
        <div className={`min-h-[373px] w-[205px] m-4 shadow-lg`}>
          <Skeleton 
            className="leading-none"
            height={370} 
            enableAnimation={true}
            baseColor={gray[800]}
            highlightColor={gray[700]}
            borderRadius={0}
          />
        </div>
      ) : error ? (
        <div className={`min-h-[373px] flex justify-center items-center m-4 shadow-lg`}>
          Alguma coisa deu errado :(
        </div>
      ) : (
        <canvas className={`min-h-[373px] m-4 shadow-lg`} ref={canvas}></canvas>
      )}
    </>
  );
}
