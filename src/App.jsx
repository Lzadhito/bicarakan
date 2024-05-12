import { For, Show, createResource } from "solid-js";
import sanitize from "sanitize-html";
import { useParams } from "@solidjs/router";

import shuffle from "./utils/shuffle";

const datas = import.meta.glob(`./data/*.json`);

const App = () => {
  const params = useParams();
  const [data] = createResource(params.id, () => {
    if (params.id) return datas[`./data/${params.id}.json`]?.() || 404;
  });

  if (!params.id)
    return (
      <div class="h-screen flex items-center justify-center">
        <div>Selamat Datang!</div>
      </div>
    );

  if (data() === 404)
    return (
      <div class="h-screen flex items-center justify-center">
        <div>Permainan tidak ditemukan.</div>
      </div>
    );

  return (
    <Show when={data.state !== "pending"} fallback={Loading}>
      <Container data={data()} />
    </Show>
  );
};

const Container = (props) => {
  return (
    <swiper-container class="h-screen" navigation="true" scrollbar="true">
      <Content>CARA BERMAIN</Content>
      <For each={props.data?.howtoplay}>{(text) => <Content>{text}</Content>}</For>
      <Content>PERMAINAN DIMULAI</Content>
      <For each={shuffle(props.data?.data)}>{(text) => <Content>{text}</Content>}</For>
      <Show when={props.data?.final?.length}>
        <Content>FINAL</Content>
        <For each={props.data?.final}>{(text) => <Content>{text}</Content>}</For>
      </Show>
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
