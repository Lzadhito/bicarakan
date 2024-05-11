import { For, Suspense, createResource } from "solid-js";
import sanitize from "sanitize-html";
import shuffle from "./utils/shuffle";
import { useParams } from "@solidjs/router";

const App = () => {
  const params = useParams();
  const [data] = createResource(params.id, () => {
    if (params.id) {
      const url = `./data/${params.id}.json`;
      /* @vite-ignore */
      return import(url);
    }
  });

  if (!params.id)
    return (
      <div class="h-screen flex items-center justify-center">
        <div>Selamat Datang!</div>
      </div>
    );

  return (
    <Suspense fallback={Loading}>
      <Container data={data()} />
    </Suspense>
  );
};

const Container = (props) => {
  return (
    <swiper-container class="h-screen" navigation="true" scrollbar="true">
      <For each={props.data?.howtoplay}>{(text) => <Content>{text}</Content>}</For>
      <Content>PERMAINAN DIMULAI</Content>
      <For each={shuffle(props.data?.data)}>{(text) => <Content>{text}</Content>}</For>
    </swiper-container>
  );
};

const Content = (props) => (
  <swiper-slide
    value={props.children}
    class="flex flex-col items-center justify-center gap-2 text-center px-10 font-medium tracking-wide"
  >
    <p innerHTML={sanitize(props.children)} />
  </swiper-slide>
);

const Loading = () => (
  <div class="h-screen flex items-center justify-center">
    <div>Loading...</div>
  </div>
);

export default App;
