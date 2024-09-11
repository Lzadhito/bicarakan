import { For, Match, Show, Switch, createResource } from "solid-js";
import sanitize from "sanitize-html";
import { useParams, useNavigate } from "@solidjs/router";
import { register } from "swiper/element/bundle";

import shuffle from "./utils/shuffle";

register();

const datas = import.meta.glob(`./data/*.json`);
const App = () => {
  const params = useParams();
  const [data] = createResource(params.id, () => {
    if (params.id) return datas[`./data/${params.id}.json`]?.() || 404;
  });

  return (
    <div>
      <Drawer titles={Object.keys(datas)} />
      <PageContent data={data} />
    </div>
  );
};

const PageContent = (props) => {
  const params = useParams();
  return (
    <Switch fallback={Loading}>
      <Match when={!params.id}>
        <div class="h-[80vh] flex items-center justify-center">
          <div>Selamat Datang!</div>
        </div>
      </Match>
      <Match when={props.data() === 404}>
        <div class="h-[80vh] flex items-center justify-center">
          <div>Permainan tidak ditemukan.</div>
        </div>
      </Match>
      <Match when={props.data.state !== "pending"}>
        <Container data={props.data()} />
      </Match>
    </Switch>
  );
};

function convertToTitleCase(item) {
  // Remove "./data/" and ".json", replace "-" with " ", and convert to title case
  let newItem = item.replace("./data/", "").replace(".json", "").replace(/-/g, " ");
  return newItem
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getPath(str) {
  // Remove "./data/" and ".json"
  let newStr = str.replace("./data/", "").replace(".json", "");
  return newStr;
}

const Drawer = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div class="drawer z-10">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <div class="navbar bg-base-300 w-full">
          <div class="flex-none lg:hidden">
            <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block h-6 w-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div class="mx-2 flex-1 px-2">{params.id ? convertToTitleCase(params.id) : "Mari Bicarakan"}</div>
        </div>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-base-200 min-h-full w-80 p-4">
          <For each={props.titles}>
            {(title) => (
              <li class="relative">
                <label
                  onClick={() => navigate(`/${getPath(title)}`)}
                  for="my-drawer-3"
                  aria-label="close sidebar"
                  class="drawer-toggle h-full w-full z-10 cursor-pointer"
                ></label>
                <a>{convertToTitleCase(title)}</a>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};

const Container = (props) => {
  return (
    <swiper-container class="h-[80vh]" navigation="true" scrollbar="true">
      <Question>CARA BERMAIN</Question>
      <For each={props.data?.howtoplay}>{(text) => <Question>{text}</Question>}</For>
      <Question>PERMAINAN DIMULAI</Question>
      <For each={shuffle(props.data?.data)}>{(text) => <Question>{text}</Question>}</For>
      <Show when={props.data?.final?.length}>
        <Question>FINAL</Question>
        <For each={props.data?.final}>{(text) => <Question>{text}</Question>}</For>
      </Show>
    </swiper-container>
  );
};

const Question = (props) => (
  <swiper-slide
    value={props.children}
    class="flex flex-col items-center justify-center gap-2 text-center px-10 font-medium tracking-wide"
  >
    <p innerHTML={sanitize(props.children)} />
  </swiper-slide>
);

const Loading = () => (
  <div class="h-[80vh] flex items-center justify-center">
    <div>Loading...</div>
  </div>
);

export default App;
