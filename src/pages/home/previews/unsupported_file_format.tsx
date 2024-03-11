import { Button, VStack, HStack } from "@hope-ui/solid"
import { useRouter, useT } from "~/hooks"
import { FileInfo } from "./info"

export const UnsupportedFileFormat = () => {
  const t = useT()
  const { back } = useRouter()
  return (
    <FileInfo>
      <VStack spacing="$6">
        <HStack spacing="$2">{t("暂不支持的文件格式，无法在线预览")}</HStack>
        <HStack spacing="$2">
          <Button colorScheme="accent" onClick={() => back()}>
            {t("home.toolbar.go_back")}
          </Button>
        </HStack>
      </VStack>
    </FileInfo>
  )
}

export default UnsupportedFileFormat
