import { Anchor, HStack, VStack } from "@hope-ui/solid"
import { Link } from "@solidjs/router"
import { AnchorWithBase } from "~/components"
import { useT } from "~/hooks"
import { me } from "~/store"
import { UserMethods } from "~/types"

export const Footer = () => {
  const t = useT()
  return (
    <VStack class="footer" w="$full" py="$4" color="#1890ff">
      <HStack spacing="$1">
        <Anchor href="https://github.com/HaTaXu/MyAList-Web" external>
          {t("home.footer.powered_by")}
        </Anchor>
        <span>|</span>
        <AnchorWithBase
          as={Link}
          href={UserMethods.is_guest(me()) ? "/@login" : "/@manage"}
        >
          {t(UserMethods.is_guest(me()) ? "login.login" : "home.footer.manage")}
        </AnchorWithBase>
      </HStack>
      <Anchor href="https://beian.miit.gov.cn/" target="_blank">
        陕ICP备2024027119号
      </Anchor>
    </VStack>
  )
}
