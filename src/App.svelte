<script>
	import "normalize.css";
	import "@picocss/pico/css/pico.slate.min.css";
	import "@picocss/pico/css/pico.colors.min.css";

	import { EarthContextProvider } from "./features/earth/index";
	import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<EarthContextProvider />
