import { HStack, VStack } from "@hope-ui/solid"
import {
  createMemo,
  createSignal,
  Switch,
  Match,
  Show,
  Suspense,
} from "solid-js"
import { Dynamic } from "solid-js/web"
import { FullLoading, SelectWrapper } from "~/components"
import { objStore } from "~/store"
import { UserMethods } from "~/types"
import { me } from "~/store"
import { Download } from "../previews/download"
import { UnsupportedFileFormat } from "../previews/unsupported_file_format"
import { OpenWith } from "./open-with"
import { getPreviews } from "../previews"
import { useT } from "~/hooks"

const File = () => {
  const t = useT()
  const previews = createMemo(() => {
    return getPreviews({ ...objStore.obj, provider: objStore.provider })
  })
  const [cur, setCur] = createSignal(previews()[0])
  return (
    // <Show when={previews().length > 1} fallback={<Download openWith />} >
    <Switch fallback={<UnsupportedFileFormat />}>
      <Match when={previews().length > 1}>
        <VStack w="$full" spacing="$2">
          <HStack w="$full" spacing="$2">
            <SelectWrapper
              alwaysShowBorder
              value={cur().name}
              onChange={(name) => {
                setCur(previews().find((p) => p.name === name)!)
              }}
              options={previews().map((item) => ({ value: item.name }))}
            />
            <OpenWith />
          </HStack>
        </VStack>
        <Suspense fallback={<FullLoading />}>
          <Dynamic component={cur().component} />
        </Suspense>
      </Match>
      <Match when={previews().length == 1}>
        <Show when={!UserMethods.is_admin(me())} fallback={<Download />}>
          <Suspense fallback={<FullLoading />}>
            <Dynamic component={cur().component} />
          </Suspense>
        </Show>
      </Match>
    </Switch>
  )
}

export default File
