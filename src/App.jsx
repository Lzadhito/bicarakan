import { For } from "solid-js";
import suamiIstri from "./data/suami-istri.json";

const App = () => {
  return (
    <swiper-container class="h-screen">
      <For each={suamiIstri.data}>
        {(text) => (
          <swiper-slide
            value={text}
            class="flex flex-col items-center justify-center gap-2 text-center px-10 font-medium tracking-wide"
          >
            <p>{text}</p>
          </swiper-slide>
        )}
      </For>
    </swiper-container>
  );
};

export default App;
